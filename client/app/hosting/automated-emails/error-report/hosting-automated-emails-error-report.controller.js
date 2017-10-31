angular
    .module("App")
    .controller("HostingAutomatedEmailsErrReportsCtrl", class HostingAutomatedEmailsErrReportsCtrl {
        constructor ($scope, $stateParams, HostingAutomatedEmails, Alerter, translator) {
            this.$scope = $scope;
            this.$stateParams = $stateParams;
            this.HostingAutomatedEmails = HostingAutomatedEmails;
            this.Alerter = Alerter;
            this.translator = translator;

            $scope.submitting = () => this.submitting();
        }

        $onInit () {
            this.automatedEmails = angular.copy(this.$scope.currentActionData.automatedEmails);
            this.isLoading = false;
        }

        submitting () {
            this.isLoading = true;

            return this.HostingAutomatedEmails
                .putEmail(this.$stateParams.productId, this.automatedEmails.email)
                .then(() => {
                    this.Alerter.success(this.translator.tr("hosting_tab_AUTOMATED_EMAILS_request_success"), this.$scope.alerts.main);
                })
                .catch((err) => {
                    this.Alerter.alertFromSWS(this.translator.tr("hosting_tab_AUTOMATED_EMAILS_request_error"), err, this.$scope.alerts.main);
                })
                .finally(() => {
                    this.isLoading = false;
                    this.$scope.resetAction();
                });
        }
    });
