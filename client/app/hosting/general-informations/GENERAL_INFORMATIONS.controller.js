angular.module('App').controller(
  'hostingGeneralInformationsCtrl',
  class HostingGeneralInformationsCtrl {
    constructor(
      $q,
      $scope,
      $stateParams,
      $translate,
      atInternet,
      Alerter,
      Hosting,
      HostingLocalSeo,
      HostingRuntimes,
      hostingSSLCertificate,
      OvhApiScreenshot,
    ) {
      this.$q = $q;
      this.$scope = $scope;
      this.$stateParams = $stateParams;
      this.$translate = $translate;

      this.atInternet = atInternet;
      this.Alerter = Alerter;
      this.Hosting = Hosting;
      this.HostingLocalSeo = HostingLocalSeo;
      this.HostingRuntimes = HostingRuntimes;
      this.hostingSSLCertificate = hostingSSLCertificate;
      this.OvhApiScreenshot = OvhApiScreenshot;
    }

    $onInit() {
      this.serviceName = this.$stateParams.productId;
      this.defaultRuntime = null;

      this.loading = {
        defaultRuntime: true,
        localSeo: true,
        screenshot: true,
      };

      this.localSeo = {
        isActive: false,
        quantity: 0,
      };

      this.$scope.$on('hosting.ssl.reload', () => this.retrievingSSLCertificate());
      return this.$q.all([this.getUserLogsToken(), this.getScreenshot()])
        .then(() => this.retrievingSSLCertificate())
        .then(() => this.HostingRuntimes.getDefault(this.serviceName))
        .then((runtime) => {
          this.defaultRuntime = runtime;
        })
        .then(() => this.initializeLocalSeo(this.serviceName))
        .finally(() => {
          this.loading.defaultRuntime = false;
          this.loading.localSeo = false;
          this.loading.screenshot = false;
        });
    }

    getScreenshot() {
      if (!this.$scope.hosting.isExpired) {
        return this.OvhApiScreenshot.Aapi().get({ url: this.serviceName }).$promise
          .then((screenshot) => {
            this.screenshot = screenshot;
          });
      }

      return this.$q.when();
    }

    getUserLogsToken() {
      return this.Hosting.getUserLogsToken(this.serviceName, {
        params: {
          remoteCheck: true,
          ttl: 3600,
        },
      })
        .then((userLogsToken) => {
          this.userLogsToken = userLogsToken;
        });
    }

    initializeLocalSeo(serviceName) {
      if (!this.$scope.localSeoAvailable) {
        return false;
      }

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

    changeOffer() {
      this.atInternet.trackClick({
        name: 'web::hostname::general-informations::change-offer',
        type: 'action',
      });
      this.$scope.setAction('offer/upgrade/hosting-offer-upgrade');
    }

    changeMainDomain() {
      this.atInternet.trackClick({
        name: 'web::hostname::general-informations::change-main-domain',
        type: 'action',
      });
      this.$scope.setAction('change-main-domain/hosting-change-main-domain', this.$scope.hosting);
    }

    isHostingOffer() {
      return !_.includes(['KIMSUFI_2015', '__60_FREE', 'DEMO_1_G', 'START_1_M', 'START_10_M', '_ASPFREE'], this.$scope.hosting.offer);
    }
  },
);
