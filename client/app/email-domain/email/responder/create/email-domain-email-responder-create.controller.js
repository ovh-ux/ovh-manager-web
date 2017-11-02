angular.module("App").controller(
    "EmailsCreateResponderCtrl",
    class EmailsCreateResponderCtrl {
        /**
         * Constructor
         * @param $scope
         * @param $stateParams
         * @param Alerter
         * @param Emails
         */
        constructor ($scope, $stateParams, Alerter, Emails) {
            this.$scope = $scope;
            this.$stateParams = $stateParams;
            this.Alerter = Alerter;
            this.Emails = Emails;
        }

        $onInit () {
            this.accounts = this.$scope.currentActionData.accounts;
            this.isDelegated = _.get(this.$scope.currentActionData, "delegate", false);
            this.constants = {
                nameMaxLength: 32,
                nameMinLength: 2,
                nameRegexPattern: /^\w+[\w.-]+\w*$/
            };
            this.domain = this.$stateParams.productId;
            this.loading = false;
            this.model = {
                account: null,
                responderCopyTo: null,
                responderDateEnd: "",
                responderDateStart: "",
                responderDuration: "temporary",
                responderKeepCopy: true,
                responderType: "typeAttached"
            };
            this.responders = [];

            this.$scope.createResponder = () => this.createResponder();

            moment.locale(this.$scope.selectedLanguage.value.split("_")[0]);

            if (this.isDelegated) {
                this.accountsNotUsed = this.accounts;
            } else {
                this.initResponders();
            }
        }

        initResponders () {
            this.loading = true;

            return this.Emails
                .getResponders(this.domain)
                .then((data) => {
                    this.responders = data.sort();
                    this.accountsNotUsed = _.filter(this.accounts, (account) => _.indexOf(this.responders, account) === -1);
                })
                .catch((err) => {
                    this.Alerter.alertFromSWS(this.$scope.tr("email_tab_table_responders_error"), err, this.$scope.alerts.main);
                    this.$scope.resetAction();
                })
                .finally(() => (this.loading = false));
        }

        resetResponderDuration () {
            this.model.responderDateStart = "";
            this.model.responderDateEnd = "";
        }

        responderAccountCheck (input) {
            input.$setValidity("email", this.model.account && validator.isEmail(`${this.model.account}@${this.domain}`));
            input.$setValidity("responder", _.indexOf(this.responders, this.model.account) === -1);
            input.$setValidity("account", _.indexOf(this.accounts, this.model.account) === -1);
        }

        responderDurationCheck () {
            return (
                this.model.responderDuration === "permanent" ||
                (!!this.model.responderDateStart && !!this.model.responderDateEnd &&
                    moment(this.model.responderDateEnd).isAfter(this.model.responderDateStart) &&
                    moment(this.model.responderDateEnd).isAfter(new Date())
                )
            );
        }

        responderDateStartCheck () {
            if (!!this.model.responderDateEnd && moment(this.model.responderDateStart).isAfter(this.model.responderDateEnd)) {
                this.model.responderDateStart = this.model.responderDateEnd;
            }
        }

        responderDateEndCheck () {
            if (!!this.model.responderDateStart && moment(this.model.responderDateStart).isAfter(this.model.responderDateEnd)) {
                this.model.responderDateEnd = this.model.responderDateStart;
            }
        }

        createResponder () {
            this.loading = true;

            const data = {
                content: this.model.responderContent,
                copy: !!this.model.responderKeepCopy,
                copyTo: this.model.responderType === "typeFree" && this.model.responderKeepCopy && this.model.responderCopyTo ? this.model.responderCopyTo : "",
                from: (this.model.responderDateStart && moment(this.model.responderDateStart)) || undefined,
                to: (this.model.responderDateEnd && moment(this.model.responderDateEnd)) || undefined
            };

            let promise;
            if (this.isDelegated) {
                promise = this.Emails.createDelegatedResponder(`${this.model.account}@${this.$stateParams.productId}`, data);
            } else {
                data.account = this.model.account;
                promise = this.Emails.createResponder(this.$stateParams.productId, data);
            }

            return promise
                .then(() => this.Alerter.success(this.$scope.tr("email_tab_modal_create_responder_success"), this.$scope.alerts.main))
                .catch((err) => this.Alerter.alertFromSWS(this.$scope.tr("email_tab_modal_create_responder_error"), err, this.$scope.alerts.main))
                .finally(() => {
                    this.loading = false;
                    this.$scope.resetAction();
                });
        }
    }
);
