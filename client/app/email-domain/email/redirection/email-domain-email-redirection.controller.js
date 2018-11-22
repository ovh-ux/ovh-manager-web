angular.module('App').controller(
  'EmailDomainEmailRedirectionCtrl',
  class EmailDomainEmailRedirectionCtrl {
    /**
     * Constructor
     * @param $scope
     * @param $stateParams
     * @param $q
     * @param $translate
     * @param Alerter
     * @param WucEmails
     */
    constructor($scope, $stateParams, $q, $translate, Alerter, WucEmails) {
      this.$scope = $scope;
      this.$stateParams = $stateParams;
      this.$q = $q;
      this.$translate = $translate;
      this.Alerter = Alerter;
      this.WucEmails = WucEmails;
    }

    $onInit() {
      this.loading = {
        exportCSV: false,
        redirections: false,
      };
      this.redirectionsDetails = [];

      this.$scope.$on('hosting.tabs.emails.redirections.refresh', () => this.refreshTableRedirections());

      this.refreshTableRedirections();
    }

    getDatasToExport() {
      this.loading.exportCSV = true;

      const dataToExport = [
        [
          this.$translate.instant('emails_common_from'),
          this.$translate.instant('emails_common_to'),
        ],
      ];

      return this.$q
        .all(_.map(
          this.redirections,
          ({ id }) => this.WucEmails.getRedirection(this.$stateParams.productId, id),
        ))
        .then(data => dataToExport.concat(_.map(data, d => [d.from, d.to])))
        .finally(() => {
          this.loading.exportCSV = false;
        });
    }

    refreshTableRedirections() {
      this.loading.redirections = true;
      this.redirections = null;

      return this.WucEmails.getRedirections(this.$stateParams.productId)
        .then((data) => {
          this.redirections = data.map(id => ({ id }));
        })
        .catch(err => this.Alerter.alertFromSWS(
          this.$translate.instant('email_tab_table_redirections_error'),
          err,
          this.$scope.alerts.main,
        ))
        .finally(() => {
          this.loading.redirections = false;
        });
    }

    transformItem({ id }) {
      return this.WucEmails.getRedirection(this.$stateParams.productId, id);
    }
  },
);
