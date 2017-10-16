angular.module("App").controller(
    "HostingDeleteSslCtrl",
    class HostingDeleteSslCtrl {
        constructor ($scope, $stateParams, Alerter, Hosting) {
            this.$scope = $scope;
            this.$stateParams = $stateParams;
            this.Alerter = Alerter;
            this.Hosting = Hosting;
        }

        $onInit () {
            this.ssl = this.$scope.currentActionData;

            this.$scope.deleteSsl = () => this.deleteSsl();
        }

        deleteSsl () {
            this.$scope.resetAction();
            return this.Hosting.deleteSsl(this.$stateParams.productId)
                .then(() => {
                    this.$scope.loadSsl();
                    this.Alerter.success(this.$scope.tr("hosting_dashboard_service_delete_ssl_success"), this.$scope.alerts.main);
                })
                .catch((err) => {
                    this.Alerter.alertFromSWS(this.$scope.tr("hosting_dashboard_service_delete_ssl_error"), err, this.$scope.alerts.main);
                });
        }
    }
);
