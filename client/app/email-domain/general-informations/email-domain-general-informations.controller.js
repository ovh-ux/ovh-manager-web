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
     * @param Emails
     */
    constructor($scope, $q, $stateParams, $translate, Alerter, Emails) {
      this.$scope = $scope;
      this.$q = $q;
      this.$stateParams = $stateParams;
      this.$translate = $translate;
      this.Alerter = Alerter;
      this.Emails = Emails;
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
          domain: this.Emails.getDomain(this.$stateParams.productId),
          dnsFilter: this.Emails.getDnsFilter(this.$stateParams.productId).catch(() => null),
          mxRecords: this.Emails.getMxRecords(this.$stateParams.productId).catch(() => null),
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
          quotas: this.Emails.getQuotas(this.$stateParams.productId),
          summary: this.Emails.getSummary(this.$stateParams.productId),
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
