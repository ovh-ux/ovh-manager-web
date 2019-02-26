angular.module('App').controller(
  'EmailTabGeneralInformationsCtrl',
  class EmailTabGeneralInformationsCtrl {
    /* @ngInject */
    constructor($q, $scope, $state, $stateParams, $translate,
      Alerter, constants, OvhApiEmailDomain, User, WucEmails) {
      this.$q = $q;
      this.$scope = $scope;
      this.$state = $state;
      this.$stateParams = $stateParams;
      this.$translate = $translate;
      this.Alerter = Alerter;
      this.constants = constants;
      this.OvhApiEmailDomain = OvhApiEmailDomain;
      this.User = User;
      this.WucEmails = WucEmails;
    }

    $onInit() {
      this.loading = {
        domain: false,
        quotas: false,
        serviceInfos: false,
        urls: false,
      };

      this.urls = {
        delete: '',
        manageContacts: '',
        changeOwner: '',
      };

      this.$scope.$on('domain.dashboard.refresh', () => this.loadDomain());
      return this.$q
        .all(
          this.loadDomain(),
          this.loadQuotas(),
          this.loadServiceInfos(),
          this.loadUrls(),
        );
    }

    gotoMxPlans() {
      this.$state.go('app.mx-plan', { domain: this.$stateParams.productId });
    }

    loadDomain() {
      this.loading.domain = true;

      return this.$q
        .all({
          domain: this.WucEmails.getDomain(this.$stateParams.productId),
          dnsFilter: this.WucEmails.getDnsFilter(this.$stateParams.productId).catch(() => null),
          mxRecords: this.WucEmails.getMxRecords(this.$stateParams.productId).catch(() => null),
        })
        .then(({ domain, dnsFilter, mxRecords }) => {
          this.domain = domain;
          this.dnsFilter = dnsFilter;
          this.mxRecords = mxRecords;
        })
        .catch((err) => {
          this.Alerter.alertFromSWS(
            this.$translate.instant('email_tab_table_accounts_error'),
            err,
            this.$scope.alerts.main,
          );
        })
        .finally(() => {
          this.loading.domain = false;
        });
    }

    loadServiceInfos() {
      this.loading.serviceInfos = true;
      return this.OvhApiEmailDomain.v6()
        .serviceInfos({ serviceName: this.$stateParams.productId }).$promise
        .then((serviceInfos) => {
          this.serviceInfos = serviceInfos;
        })
        .catch((err) => {
          this.Alerter.alertFromSWS(
            this.$translate.instant('email_tab_table_accounts_error'),
            err,
            this.$scope.alerts.main,
          );
        })
        .finally(() => {
          this.loading.serviceInfos = false;
        });
    }

    loadQuotas() {
      this.loading.quotas = true;
      return this.$q
        .all({
          quotas: this.WucEmails.getQuotas(this.$stateParams.productId),
          summary: this.WucEmails.getSummary(this.$stateParams.productId),
        })
        .then(({ quotas, summary }) => {
          this.quotas = quotas;
          this.summary = summary;
        })
        .catch((err) => {
          _.set(err, 'type', err.type || 'ERROR');
          this.Alerter.alertFromSWS(
            this.$translate.instant('email_tab_table_accounts_error'),
            err,
            this.$scope.alerts.main,
          );
        })
        .finally(() => {
          this.loading.quotas = false;
        });
    }

    loadUrls() {
      this.loading.urls = true;
      this.urls.delete = `${this.constants.AUTORENEW_URL}?selectedType=EMAIL_DOMAIN&searchText=${this.$stateParams.productId}`;
      this.urls.manageContacts = `#/useraccount/contacts?tab=SERVICES&serviceName=${this.$stateParams.productId}`;
      return this.User.getUrlOf('changeOwner').then((link) => {
        this.urls.changeOwner = link;
      }).finally(() => {
        this.loading.urls = false;
      });
    }
  },
);
