angular.module('App').controller(
  'EmailTabGeneralInformationsCtrl',
  class EmailTabGeneralInformationsCtrl {
    /**
     * Constructor
     * @param $scope
     * @param $q
     * @param $stateParams
     * @param $translate
     * @param Alerter
     * @param WucEmails
     */
    constructor($scope, $q, $stateParams, $translate, Alerter, WucEmails) {
      this.$scope = $scope;
      this.$q = $q;
      this.$stateParams = $stateParams;
      this.$translate = $translate;
      this.Alerter = Alerter;
      this.WucEmails = WucEmails;
    }

    $onInit() {
      this.loading = {
        domain: false,
        quotas: false,
      };

      this.$scope.$on('domain.dashboard.refresh', () => this.loadDomain());

      this.loadDomain();
      this.loadQuotas();
    }

    loadDomain() {
      this.loading.domain = true;

      this.$q
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

    loadQuotas() {
      this.loading.quotas = true;
      this.$q
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
  },
);
