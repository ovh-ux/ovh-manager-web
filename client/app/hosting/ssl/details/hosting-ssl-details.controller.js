angular.module('App').controller(
  'hostingSSLDetailsController',
  class HostingSSLDetailsController {
    constructor($scope, Alerter, constants, hostingSSLCertificate, translator) {
      this.$scope = $scope;

      this.Alerter = Alerter;
      this.constants = constants;
      this.hostingSSLCertificate = hostingSSLCertificate;
      this.translator = translator;
    }

    $onInit() {
      this.hosting = this.$scope.currentActionData;
      this.comodoConstants = this.constants.comodo;

      return this.retrievingCertificateValidationReport();
    }

    retrievingCertificateValidationReport() {
      this.isLoading = true;

      return this.hostingSSLCertificate
        .retrievingCertificateValidationReport(this.hosting.serviceName)
        .then((sslReport) => {
          this.orderNumber = sslReport.providerOrderId;

          this.sslReport = _(sslReport)
            .pairs()
            .map(sslReportEntry => ({
              name: sslReportEntry[0],
              value: sslReportEntry[1],
            }))
            .filter(sslReportEntry => sslReportEntry.value !== 'non-required'
                && sslReportEntry.value !== 'not-applicable'
                && sslReportEntry.name !== 'providerOrderId'
                && !_(sslReportEntry.name).startsWith('$'))
            .value();
        })
        .catch((error) => {
          this.Alerter.error(this.translator.tr(
            'hosting_dashboard_ssl_details_error',
            error.data.message,
            this.$scope.alerts.main,
          ));
        })
        .finally(() => {
          this.isLoading = false;
        });
    }
  },
);
