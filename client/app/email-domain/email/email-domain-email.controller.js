angular
    .module("App")
    .controller("EmailDomainEmailCtrl", class EmailDomainEmailCtrl {
        constructor ($scope, $q, $stateParams, $timeout, Alerter, Emails, User, ovhUserPref, $window, constants) {
            this.$scope = $scope;
            this.$q = $q;
            this.$stateParams = $stateParams;
            this.$timeout = $timeout;
            this.Alerter = Alerter;
            this.Emails = Emails;
            this.User = User;
            this.ovhUserPref = ovhUserPref;
            this.$window = $window;
            this.constants = constants;
        }

        $onInit () {
            this.currentView = "accountsView";
            this.currentViewData = null;

            this.delegationsIsAvailable = false;
            this.emailsDetails = [];
            this.emailIsUnavailable = true;
            this.userPreferences = null;
            this.shouldDisplayAccountMigration = false;
            this.loading = {
                accounts: false,
                emails: false,
                pager: false
            };
            this.search = { accounts: null };
            this.works = {};
            this.statusWorksDone = ["closed", "finished"];

            this.User
                .getUrlOf("guides")
                .then((guides) => {
                    if (guides != null) {
                        this.$scope.guide = guides.emailsConfiguration;
                        this.$scope.guides = guides;
                    }
                })
                .catch(() => {
                    this.$scope.guide = null;
                    this.$scope.guides = null;
                });

            this.$scope.$on("hosting.tabs.emails.refresh", () => this.refreshAllInfos(true));

            this.initialLoad();
        }

        initialLoad () {
            this.loading.emails = true;

            this.$q
                .all({
                    webMailUrl: this.User.getUrlOf("domainWebmailUrl"),
                    user: this.User.getUser(),
                    serviceInfos: this.Emails.getServiceInfos(this.$stateParams.productId),
                    allDomains: this.Emails.getDomains(),
                    quotas: this.Emails.getQuotas(this.$stateParams.productId),
                    summary: this.Emails.getSummary(this.$stateParams.productId)
                })
                .then(({ webMailUrl, user, serviceInfos, allDomains, quotas, summary }) => {
                    this.webMailUrl = webMailUrl;
                    this.delegationsIsAvailable = _.includes([serviceInfos.contactTech, serviceInfos.contactAdmin], user.nichandle);
                    this.domains = allDomains;
                    this.quotas = quotas;
                    this.summary = summary;
                })
                .then(() => this.ovhUserPref.getValue("WEB_EMAILS"))
                .then((userPreferences) => {
                    this.userPreferences = userPreferences;
                })
                .finally(() => {
                    if (_(this.domains).includes(this.$stateParams.productId)) {
                        this.refreshTableAccounts();
                        this.emailIsUnavailable = false;
                    } else {
                        this.emailIsUnavailable = true;
                    }

                    this.loading.emails = false;
                });
        }

        refreshAllInfos (force) {
            this.$q
                .all({
                    accounts: this.refreshTableAccounts(force || false),
                    summary: this.Emails.getSummary(this.$stateParams.productId)
                })
                .then(({ summary }) => {
                    this.summary = summary;
                });
        }

        refreshSummary () {
            this.Emails
                .getSummary(this.$stateParams.productId)
                .then((summary) => {
                    this.summary = summary;
                });
        }

        //---------------------------------------------
        // Navigation
        //---------------------------------------------

        selectSubView (view, data) {
            this.currentView = view;
            this.currentViewData = data || null;
        }

        resetInitialView () {
            this.currentView = "accountsView";
            this.currentViewData = null;
            this.refreshSummary();
        }

        openWebMailTab () {
            this.$window.open(this.webMailUrl, "_blank");
        }

        displayAccountMigration (email) {
            this.shouldDisplayAccountMigration = true;
            this.accountMigrationEmail = email;
        }

        displayEmailsList () {
            this.shouldDisplayAccountMigration = false;
            this.accountMigrationEmail = null;
            this.refreshSummary();
        }

        //---------------------------------------------
        // Search
        //---------------------------------------------

        emptySearch () {
            this.search.accounts = "";
            this.loading.search = true;
            this.refreshTableAccounts(true);
        }

        goSearch () {
            this.loading.search = true;
            this.refreshTableAccounts(true);
        }

        //---------------------------------------------
        // Accounts
        //---------------------------------------------

        canAddAccount () {
            return this.emails != null && (!_.includes(this.emails, "postmaster") || this.emails.length < this.quotas.account + 1);
        }

        refreshTableAccounts (forceRefresh) {
            this.loading.accounts = true;
            this.emails = null;

            return this.Emails
                .getEmails(this.$stateParams.productId, {
                    accountName: `%${this.search.accounts || ""}%`,
                    forceRefresh
                })
                .then((data) => {
                    this.emails = data.sort();

                    const userWantsHelpHidden = _(this.userPreferences).get("hideEmailsHelp", false);
                    const userWantsHelpHiddenForCurrentProduct = _(this.userPreferences).get(`${this.$stateParams.productId}.hideEmailsHelp`, false);

                    const shouldShowHelp = !userWantsHelpHidden && !userWantsHelpHiddenForCurrentProduct;
                    const guidesAlreadyRetrieved = _(this.$scope).has("guides.emailsConfiguration") || _(this.$scope).has("guides.emailsCreation");
                    const canCreateAccounts = _(this.quotas).get("account", 0) > 0;
                    const userMustCreateAccount = (this.emails.length === 1 && this.emails[0] === "postmaster") || _.isEmpty(this.emails);

                    if (shouldShowHelp && !guidesAlreadyRetrieved && !this.search.accounts && canCreateAccounts && userMustCreateAccount) {
                        this.$timeout(() => {
                            if (this.quotas != null) {
                                this.$scope.setAction("email-domain/email/help/email-domain-email-help", {
                                    productId: this.$stateParams.productId || null,
                                    quotas: this.quotas,
                                    summary: this.summary,
                                    emails: this.emails
                                });
                            }
                        });
                    }
                })
                .catch((err) => {
                    this.Alerter.alertFromSWS(this.$scope.tr("email_tab_table_accounts_error"), err, this.$scope.alerts.main);
                })
                .finally(() => {
                    if (_.isEmpty(this.emails)) {
                        this.loading.accounts = false;
                    }
                });
        }

        transformItem (item) {
            return this.$q
                .all({
                    account: this.Emails.getEmail(this.$stateParams.productId, item),
                    tasks: this.Emails.getEmailTasks(this.$stateParams.productId, item),
                    usage: this.Emails.getEmailUsage(this.$stateParams.productId, item)
                })
                .then(({ account, tasks, usage }) => {
                    account.taskDoing = !_.isEmpty(tasks.data);
                    account.description = punycode.toUnicode(account.description);
                    account.quota = usage.quota;
                    account.date = usage.date;

                    if (account.size > 0) {
                        account.percentUse = _.round(account.quota * 100 / account.size);
                    } else {
                        account.percentUse = 0;
                    }

                    return account;
                });
        }

        onTransformItemDone () {
            this.loading.accounts = false;
            this.loading.pager = false;
        }
    }
);
