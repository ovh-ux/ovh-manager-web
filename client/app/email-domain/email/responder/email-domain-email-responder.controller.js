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
        constructor ($scope, $stateParams, Alerter, Emails) {
            this.$scope = $scope;
            this.$stateParams = $stateParams;
            this.Alerter = Alerter;
            this.Emails = Emails;
        }

        $onInit () {
            this.loading = {
                responders: false,
                pager: false
            };

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
                .getResponders(this.$stateParams.productId)
                .then((data) => (this.responders = data.sort()))
                .catch((err) => this.Alerter.alertFromSWS(this.$scope.tr("email_tab_table_responders_error"), err, this.$scope.alerts.main))
                .finally(() => {
                    if (_.isEmpty(this.responders)) {
                        this.loading.responders = false;
                    }
                });
        }

        transformItem (item) {
            return this.Emails.getResponder(this.$stateParams.productId, item);
        }

        onTransformItemDone () {
            this.loading.responders = false;
            this.loading.pager = false;
        }
    }
);
