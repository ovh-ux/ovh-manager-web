angular.module("App")
    .controller("HostingTerminateCdnCtrl", class HostingTerminateCdnCtrl {
        constructor ($scope, $stateParams, Hosting, Alerter) {
            this.$scope = $scope;
            this.$stateParams = $stateParams;
            this.Hosting = Hosting;
            this.Alerter = Alerter;
        }

        $onInit () {
            this.$scope.terminateCdn = () => this.terminateCdn();
        }

        terminateCdn () {
            this.Hosting.terminateCdn(this.$stateParams.productId)
                .then(() => {
                    this.Alerter.success(this.$scope.tr("hosting_dashboard_service_terminate_cdn_success"), this.$scope.alerts.main);
                })
                .catch((err) => {
                    this.Alerter.alertFromSWS(this.$scope.tr("hosting_dashboard_service_terminate_cdn_error"), _.get(err, "data", err), this.$scope.alerts.main);
                })
                .finally(() => {
                    this.$scope.resetAction();
                });
        }
    });
