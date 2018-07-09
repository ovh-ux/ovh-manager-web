angular.module('App').controller(
  'EmailDelegateCtrl',
  class EmailDelegateCtrl {
    /**
         * Constructor
         * @param $scope
         * @param $q
         * @param $stateParams
         * @param $timeout
         * @param Alerter
         * @param Emails
         */
    constructor($scope, $q, $stateParams, $timeout, Alerter, Emails) {
      this.$scope = $scope;
      this.$q = $q;
      this.$stateParams = $stateParams;
      this.$timeout = $timeout;
      this.Alerter = Alerter;
      this.Emails = Emails;
    }

    $onInit() {
      this.currentView = 'accountsView';
      this.currentViewData = null;
      this.domain = this.$stateParams.productId || '';
      this.emailsDetails = [];
      this.loading = {
        accounts: false,
        search: false,
        usage: false,
      };
      this.search = { accounts: null };
      this.stepPath = '';

      this.$scope.alerts = {
        page: 'domain_alert_page',
        main: 'domain_alert_main',
      };
      this.$scope.currentAction = null;
      this.$scope.currentActionData = null;
      this.$scope.itemsPerPage = 10;

      // Modal action
      this.$scope.resetAction = () => this.$scope.setAction(false);
      this.$scope.setAction = (action, data) => {
        this.$scope.currentAction = action;
        this.$scope.currentActionData = data || null;

        if (action) {
          this.stepPath = `${this.$scope.currentAction}.html`;
          $('#currentAction').modal({
            keyboard: true,
            backdrop: 'static',
          });
        } else {
          $('#currentAction').modal('hide');
          this.$timeout(() => (this.stepPath = ''), 300);
        }
      };

      this.$scope.$on('hosting.tabs.emails.delegate.refresh', () => this.loadEmails());

      this.loadEmails();
    }

    /* Navigation */
    selectSubView(view, data) {
      this.currentView = view;
      this.currentViewData = data || null;
    }

    resetInitialView() {
      this.currentView = 'accountsView';
      this.currentViewData = null;
      this.loading.accounts = true;
    }

    /* Search */
    emptySearch() {
      this.search.accounts = '';
      this.loading.search = true;
      this.loadEmails();
    }

    goSearch() {
      this.loading.search = true;
      this.loadEmails();
    }

    /* Accounts */
    loadEmails() {
      this.loading.accounts = true;
      this.emails = null;

      this.Emails
        .getDelegatedEmails(this.$stateParams.productId, `%${this.search.accounts || ''}%`)
        .then(data => (this.emails = data.sort()))
        .catch(err => this.Alerter.alertFromSWS(this.$scope.tr('email_tab_table_accounts_error'), err, this.$scope.alerts.main))
        .finally(() => {
          if (_.isEmpty(this.emails)) {
            this.loading.accounts = false;
            this.loading.search = false;
          }
        });
    }

    transformItem(item) {
      return this.$q
        .all({
          email: this.Emails.getDelegatedEmail(item),
          usage: this.Emails.getEmailDelegatedUsage(item),
        })
        .then(({ email, usage }) => {
          email.quota = usage.quota;
          email.emailCount = usage.emailCount;
          email.date = usage.date;

          this.constructor.setAccountPercentUse(email);

          return email;
        });
    }

    onTransformItemDone() {
      this.loading.accounts = false;
      this.loading.search = false;
    }

    /**
         * Update selected Email usage
         * @param {object} account
         */
    updateUsage(account) {
      this.loading.usage = true;
      this.Emails
        .updateDelegatedUsage(account.email)
        .then(() =>
          this.Emails.getEmailDelegatedUsage(account.email).then(() => this.constructor.setAccountPercentUse(account)))
        .catch(err => this.Alerter.alertFromSWS(this.$scope.tr('email_tab_modal_update_usage_error'), err, this.$scope.alerts.main))
        .finally(() => (this.loading.usage = false));
    }

    static setAccountPercentUse(account) {
      if (account.size > 0) {
        account.percentUse = _.round(account.quota * 100 / account.size);
      } else {
        account.percentUse = 0;
      }
    }
  },
);
