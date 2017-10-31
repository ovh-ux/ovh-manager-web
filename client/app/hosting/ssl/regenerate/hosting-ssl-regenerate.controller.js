angular
    .module("App")
    .controller("HostingRegenerateSSLCtrl", class HostingRegenerateSSLCtrl {
        constructor ($scope, $stateParams, Hosting, Alerter, translator) {
            this.$scope = $scope;
            this.$scope.regeneratingSSL = () => this.regeneratingSSL();

            this.$stateParams = $stateParams;
            this.Hosting = Hosting;
            this.Alerter = Alerter;
            this.translator = translator;
        }

        $onInit () {
            this.$scope.regeneratingSSL = () => this.regeneratingSSL();
        }

        regeneratingSSL () {
            this.$scope.resetAction();

            return this.Hosting
                .regeneratingSSL(this.$stateParams.productId)
                .then(() => {
                    this.$scope.loadSsl();
                    this.Alerter.success(this.translator.tr("hosting_dashboard_service_regenerate_ssl_success"), this.$scope.alerts.main);
                })
                .catch((err) => {
                    this.Alerter.alertFromSWS(this.translator.tr("hosting_dashboard_service_regenerate_ssl_error"), err, this.$scope.alerts.main);
                }
            );
        }
    });
