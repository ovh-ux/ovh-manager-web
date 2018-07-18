angular.module('App').controller(
  'hostingDeleteSslCtrl',
  class HostingDeleteSslCtrl {
    constructor(
      $scope,
      $stateParams,
      Alerter,
      hostingSSLCertificate,
      hostingSSLCertificateType,
      translator,
    ) {
      this.$scope = $scope;
      this.$stateParams = $stateParams;

      this.Alerter = Alerter;
      this.hostingSSLCertificate = hostingSSLCertificate;
      this.hostingSSLCertificateType = hostingSSLCertificateType;
      this.translator = translator;
    }

    $onInit() {
      this.wasCertificateFree = this.hostingSSLCertificateType.constructor
        .getCertificateTypeByProvider(this.$scope.currentActionData.provider).isFree;

      this.$scope.deletingCertificate = () => this.deletingCertificate();
    }

    deletingCertificate() {
      return this.hostingSSLCertificate
        .deletingCertificate(this.$stateParams.productId)
        .then(() => {
          this.hostingSSLCertificate.reload();
          this.Alerter.success(
            this.translator.tr('hosting_dashboard_service_delete_ssl_success'),
            this.$scope.alerts.main,
          );
        })
        .catch((err) => {
          this.Alerter.alertFromSWS(
            this.translator.tr('hosting_dashboard_service_delete_ssl_error'),
            err.data,
            this.$scope.alerts.main,
          );
        })
        .finally(() => {
          this.$scope.resetAction();
        });
    }
  },
);
