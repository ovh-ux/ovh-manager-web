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

            this.retrievingDetails();
        }

        retrievingDetails () {
            this.isLoading = true;

            return this.Hosting
                .retrievingDetails(this.hosting.serviceName)
                .then((sslReport) => {
                    const sslReportEntries = Object.entries(sslReport);
                    const rawSSLReport = _(sslReportEntries)
                        .map((sslReportEntry) => ({ key: sslReportEntry[0], value: sslReportEntry[1] }))
                        .value();

                    this.orderNumber = rawSSLReport
                        .filter((sslReportEntry) => sslReportEntry.key === "providerOrderId")[0]
                        .value;

                    this.sslReport = rawSSLReport
                        .filter((sslReportEntry) => sslReportEntry.value !== "non-required" && sslReportEntry.value !== "not-applicable" && sslReportEntry.key !== "providerOrderId");
                })
                .catch((err) => {
                    this.translator.tr("hosting_dashboard_ssl_details_error", err);
                })
                .finally(() => {
                    this.isLoading = false;
                });
        }
    });
