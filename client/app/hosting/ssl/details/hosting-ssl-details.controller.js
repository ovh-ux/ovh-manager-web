angular
    .module("App")
    .controller("hostingSSLDetailsController", class HostingSSLDetailsController {
        constructor (constants, Hosting, $scope, translator) {
            this.constants = constants;
            this.Hosting = Hosting;
            this.$scope = $scope;
            this.translator = translator;
        }

        $onInit () {
            this.hosting = this.$scope.currentActionData;
            this.comodoSupportLink = this.constants.urls.comodoSupport;

            return this.retrievingSSLValidationReport();
        }

        retrievingSSLValidationReport () {
            this.isLoading = true;

            return this.Hosting
                .retrievingSSLValidationReport(this.hosting.serviceName)
                .then((sslReport) => {
                    this.orderNumber = sslReport.providerOrderId;

                    this.sslReport = _(sslReport)
                        .pairs()
                        .map((sslReportEntry) => ({ name: sslReportEntry[0], value: sslReportEntry[1] }))
                        .filter((sslReportEntry) => sslReportEntry.value !== "non-required" && sslReportEntry.value !== "not-applicable" && sslReportEntry.name !== "providerOrderId")
                        .value();
                })
                .catch((err) => {
                    this.translator.tr("hosting_dashboard_ssl_details_error", err);
                })
                .finally(() => {
                    this.isLoading = false;
                });
        }
    });
