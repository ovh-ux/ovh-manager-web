angular.module('App').controller(
  'hostingGeneralInformationsCtrl',
  class HostingGeneralInformationsCtrl {
    constructor(
      $scope,
      $stateParams,
      Alerter,
      hostingSSLCertificate,
      translator,
      HostingLocalSeo,
    ) {
      this.$scope = $scope;
      this.$stateParams = $stateParams;

      this.Alerter = Alerter;
      this.hostingSSLCertificate = hostingSSLCertificate;
      this.translator = translator;
      this.HostingLocalSeo = HostingLocalSeo;
    }

    $onInit() {
      this.loaders = {
        localSeo: true,
      };

      this.localSeo = {
        active: false,
        quantity: 0,
      };
      this.initLocalSeo(this.$scope.hosting.serviceName).finally(() => {
        this.loaders.localSeo = false;
      });

      this.$scope.$on('hosting.ssl.reload', () => this.retrievingSSLCertificate());
      return this.retrievingSSLCertificate();
    }

    initLocalSeo(serviceName) {
      return this.HostingLocalSeo.getAccounts(serviceName)
        .then(accountIds => this.HostingLocalSeo.getAccount(serviceName, accountIds[0]))
        .then((account) => {
          this.localSeo.active = account.status === 'created';
        })
        .then(() => this.HostingLocalSeo.getLocations(serviceName))
        .then((locationIds) => {
          this.localSeo.quantity = locationIds.length;
        });
    }

    retrievingSSLCertificate() {
      this.isRetrievingSSLCertificate = true;

      return this.hostingSSLCertificate
        .retrievingCertificate(this.$stateParams.productId)
        .then((certificate) => {
          this.sslCertificate = certificate;
        })
        .catch((error) => {
          // 404 error means that the user has no SSL certificate
          if (error.status !== 404) {
            this.Alerter.alertFromSWS(
              this.translator.tr('hosting_dashboard_ssl_details_error'),
              error,
              this.$scope.alerts.main,
            );
          }
        })
        .finally(() => {
          this.isRetrievingSSLCertificate = false;
        });
    }

    hasSSLCertificate() {
      return _(this.sslCertificate).isObject();
    }

    canOrderSSLCertificate() {
      return !this.hasSSLCertificate();
    }

    canRegenerateSSLCertificate() {
      return (
        this.hasSSLCertificate()
        && this.sslCertificate.regenerable
        && this.hostingSSLCertificate.constructor.testCanBeHandled(this.sslCertificate)
      );
    }

    canDeleteSSLCertificate() {
      return (
        this.hasSSLCertificate()
        && this.hostingSSLCertificate.constructor.testCanBeHandled(this.sslCertificate)
      );
    }

    hasSSLCertificateCreationReport() {
      return this.hasSSLCertificate() && this.sslCertificate.isReportable;
    }

    selectSSLCertificateStatusText() {
      if (!this.hasSSLCertificate()) {
        return this.translator.tr('common_no');
      }

      if (
        this.hostingSSLCertificate.constructor.testCanBeHandled(this.sslCertificate)
      ) {
        return this.translator.tr('common_yes');
      }

      return this.translator.tr(`hosting_dashboard_service_ssl_${this.sslCertificate.status}`);
    }
  },
);
