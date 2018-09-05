angular.module('App').controller(
  'hostingRegenerateSSLCtrl',
  class HostingRegenerateSSLCtrl {
    constructor(
      $rootScope,
      $scope,
      $stateParams,
      hostingSSLCertificate,
      Alerter,
      translator,
    ) {
      this.$rootScope = $rootScope;
      this.$scope = $scope;
      this.$stateParams = $stateParams;

      this.Alerter = Alerter;
      this.hostingSSLCertificate = hostingSSLCertificate;
      this.translator = translator;
    }

    $onInit() {
      this.$scope.regeneratingCertificate = () => this.regeneratingCertificate();
    }

    regeneratingCertificate() {
      return this.hostingSSLCertificate
        .regeneratingCertificate(this.$stateParams.productId)
        .then(() => {
          this.hostingSSLCertificate.reload();
          this.Alerter.success(
            this.translator.tr('hosting_dashboard_service_regenerate_ssl_success'),
            this.$scope.alerts.main,
          );
        })
        .catch((err) => {
          this.Alerter.alertFromSWS(
            this.translator.tr('hosting_dashboard_service_regenerate_ssl_error'),
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
