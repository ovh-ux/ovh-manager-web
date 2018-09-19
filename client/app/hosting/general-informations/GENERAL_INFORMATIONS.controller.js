angular.module('App').controller(
  'hostingGeneralInformationsCtrl',
  class HostingGeneralInformationsCtrl {
    constructor(
      $scope,
      $stateParams,
      $translate,
      Alerter,
      hostingSSLCertificate,
      HostingLocalSeo,
      HostingRuntimes,
    ) {
      this.$scope = $scope;
      this.$stateParams = $stateParams;
      this.$translate = $translate;

      this.Alerter = Alerter;
      this.hostingSSLCertificate = hostingSSLCertificate;
      this.HostingLocalSeo = HostingLocalSeo;
      this.HostingRuntimes = HostingRuntimes;
    }

    $onInit() {
      this.serviceName = this.$stateParams.productId;
      this.defaultRuntime = null;

      this.loading = {
        defaultRuntime: true,
        localSeo: true,
      };

      this.localSeo = {
        isActive: false,
        quantity: 0,
      };

      this.$scope.$on('hosting.ssl.reload', () => this.retrievingSSLCertificate());
      return this.retrievingSSLCertificate()
        .then(() => this.HostingRuntimes.getDefault(this.serviceName))
        .then((runtime) => {
          this.defaultRuntime = runtime;
        })
        .then(() => this.initializeLocalSeo(this.serviceName))
        .finally(() => {
          this.loading.defaultRuntime = false;
          this.loading.localSeo = false;
        });
    }

    initializeLocalSeo(serviceName) {
      return this.HostingLocalSeo.getAccounts(serviceName)
        .then((accountIds) => {
          if (!accountIds || accountIds.length <= 0) {
            throw new Error('No LocalSEO Accounts');
          }
          return this.HostingLocalSeo.getAccount(serviceName, _.first(accountIds));
        })
        .then((account) => {
          this.localSeo.isActive = account.status === 'created';
        })
        .then(() => this.HostingLocalSeo.getLocations(serviceName))
        .then((locationIds) => {
          this.localSeo.quantity = locationIds.length;
        });
    }

    retrievingSSLCertificate() {
      this.isRetrievingSSLCertificate = true;

      return this.hostingSSLCertificate
        .retrievingCertificate(this.serviceName)
        .then((certificate) => {
          this.sslCertificate = certificate;
        })
        .catch((error) => {
          // 404 error means that the user has no SSL certificate
          if (error.status !== 404) {
            this.Alerter.alertFromSWS(
              this.$translate.instant('hosting_dashboard_ssl_details_error'),
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
        return this.$translate.instant('common_no');
      }

      if (
        this.hostingSSLCertificate.constructor.testCanBeHandled(this.sslCertificate)
      ) {
        return this.$translate.instant('common_yes');
      }

      return this.$translate.instant(`hosting_dashboard_service_ssl_${this.sslCertificate.status}`);
    }
  },
);
