angular
    .module("App")
    .controller("hostingDeleteSslCtrl", class HostingDeleteSslCtrl {
        constructor ($scope, $stateParams, Alerter, Hosting, hostingSSL, hostingSSLCertificateType, translator) {
            this.$scope = $scope;
            this.$stateParams = $stateParams;

            this.Alerter = Alerter;
            this.Hosting = Hosting;
            this.hostingSSL = hostingSSL;
            this.hostingSSLCertificateType = hostingSSLCertificateType;
            this.translator = translator;
        }

        $onInit () {
            this.isCertificateFree = this.hostingSSLCertificateType.isFree(this.$scope.currentActionData.provider);

            this.$scope.deletingCertificate = () => this.deletingCertificate();
        }

        deletingCertificate () {
            return this.Hosting.deletingCertificate(this.$stateParams.productId)
                .then(() => {
                    this.$scope.loadSsl();
                    this.Alerter.success(this.translator.tr("hosting_dashboard_service_delete_ssl_success"), this.$scope.alerts.main);
                })
                .catch((err) => {
                    this.Alerter.alertFromSWS(this.translator.tr("hosting_dashboard_service_delete_ssl_error"), err.data, this.$scope.alerts.main);
                })
                .finally(() => {
                    this.$scope.resetAction();
                });
        }
    }
);
