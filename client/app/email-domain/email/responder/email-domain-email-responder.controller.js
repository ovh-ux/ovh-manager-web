angular.module("App").controller(
    "EmailDomainEmailResponderCtrl",
    class EmailDomainEmailResponderCtrl {
        /**
         * Constructor
         * @param $scope
         * @param $stateParams
         * @param Alerter
         * @param Emails
         */
        constructor ($scope, $stateParams, $timeout, Alerter, Emails) {
            this.$scope = $scope;
            this.$stateParams = $stateParams;
            this.$timeout = $timeout;
            this.Alerter = Alerter;
            this.Emails = Emails;
        }

        $onInit () {
            this.loading = {
                responders: false,
                pager: false
            };
            this.domain = this.$stateParams.productId;

            this.$scope.$on("hosting.tabs.emails.responders.refresh", () => this.refreshTableResponders());

            this.refreshTableResponders();
        }

        static isExpired (responder) {
            if (!responder.to) {
                return false;
            }
            return moment(new Date(responder.to)).isBefore(new Date());
        }

        refreshTableResponders () {
            this.loading.responders = true;
            this.responders = null;

            return this.Emails
                .getResponders(this.domain)
                .then((data) => (this.responders = data.sort()))
                .catch((err) => this.Alerter.alertFromSWS(this.$scope.tr("email_tab_table_responders_error"), err, this.$scope.alerts.main))
                .finally(() => {
                    if (_.isEmpty(this.responders)) {
                        this.loading.responders = false;
                    }
                });
        }

        transformItem (item) {
            return this.Emails.getResponder(this.domain, item)
                .then((responder) => {
                    this.pollResponderTasks(responder);
                    return responder;
                });
        }

        onTransformItemDone () {
            this.loading.responders = false;
            this.loading.pager = false;
        }

        pollResponderTasks (responder) {
            this.Emails
                .getResponderTasks(this.domain, responder.account)
                .then((tasks) => {
                    if (_.isEmpty(tasks)) {
                        responder.actionsDisabled = false;
                    } else {
                        responder.actionsDisabled = true;
                        this.$timeout(() => {
                            this.pollResponderTasks(responder);
                        }, 2000);
                    }
                });
        }
    }
);
