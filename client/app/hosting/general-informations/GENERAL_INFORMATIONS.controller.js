angular
    .module("App")
    .controller("hostingGeneralInformationsCtrl", class HostingGeneralInformationsCtrl {
        constructor ($scope, $stateParams, Alerter, hostingSSLCertificate, HostingRuntimes, translator) {
            this.$scope = $scope;
            this.$stateParams = $stateParams;

            this.Alerter = Alerter;
            this.hostingSSLCertificate = hostingSSLCertificate;
            this.translator = translator;
            this.HostingRuntimes = HostingRuntimes;
        }

        $onInit () {
            this.$scope.$on("hosting.ssl.reload", () => this.retrievingSSLCertificate());

            this.defaultRuntime = null;
            this.HostingRuntimes.getDefault(this.$stateParams.productId)
                .then((runtime) => {
                    this.defaultRuntime = runtime;
                })
                .catch(() => {
                    this.defaultRuntime = { name: this.translator.tr("common_not_available") };
                });

            return this.retrievingSSLCertificate();
        }

        retrievingSSLCertificate () {
            this.isRetrievingSSLCertificate = true;

            return this.hostingSSLCertificate.retrievingCertificate(this.$stateParams.productId)
                .then((certificate) => {
                    this.sslCertificate = certificate;
                })
                .catch((error) => {
                    // 404 error means that the user has no SSL certificate
                    if (error.status !== 404) {
                        this.Alerter.alertFromSWS(this.translator.tr("hosting_dashboard_ssl_details_error"), error, this.$scope.alerts.main);
                    }
                })
                .finally(() => {
                    this.isRetrievingSSLCertificate = false;
                });
        }

        hasSSLCertificate () {
            return _(this.sslCertificate).isObject();
        }

        canOrderSSLCertificate () {
            return !this.hasSSLCertificate();
        }

        canRegenerateSSLCertificate () {
            return this.hasSSLCertificate() && this.sslCertificate.regenerable && this.hostingSSLCertificate.constructor.testCanBeHandled(this.sslCertificate);
        }

        canDeleteSSLCertificate () {
            return this.hasSSLCertificate() && this.hostingSSLCertificate.constructor.testCanBeHandled(this.sslCertificate);
        }

        hasSSLCertificateCreationReport () {
            return this.hasSSLCertificate() && this.sslCertificate.isReportable;
        }

        selectSSLCertificateStatusText () {
            if (!this.hasSSLCertificate()) {
                return this.translator.tr("common_no");
            }

            if (this.hostingSSLCertificate.constructor.testCanBeHandled(this.sslCertificate)) {
                return this.translator.tr("common_yes");
            }

            return this.translator.tr(`hosting_dashboard_service_ssl_${this.sslCertificate.status}`);
        }
    });
