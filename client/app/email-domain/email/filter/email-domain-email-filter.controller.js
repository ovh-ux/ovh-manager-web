angular.module('App').controller(
  'EmailDomainEmailFilterCtrl',
  class EmailDomainEmailFilterCtrl {
    /**
     * Constructor
     * @param $scope
     * @param $stateParams
     * @param Alerter
     * @param Emails
     */
    constructor($scope, $stateParams, Alerter, Emails) {
      this.$scope = $scope;
      this.$stateParams = $stateParams;
      this.Alerter = Alerter;
      this.Emails = Emails;
    }

    $onInit() {
      this.currentAccount = this.$scope.ctrlEmailDomainEmail.currentViewData || null;

      this.$scope.$on('hosting.tabs.emails.filters.refresh', () => this.refreshTableFilters());

      this.refreshTableFilters();
    }

    refreshTableFilters() {
      this.filters = null;

      return this.Emails.getFilters(
        this.$stateParams.productId,
        this.currentAccount.accountName,
      )
        .then((data) => {
          this.filters = data.map(name => ({ name }));
        })
        .catch(err => this.Alerter.alertFromSWS(
          this.$scope.tr('email_tab_table_filters_error'),
          err,
          this.$scope.alerts.main,
        ));
    }

    transformItem({ name }) {
      return this.Emails.getFilter(
        this.$stateParams.productId,
        this.currentAccount.accountName,
        name,
      );
    }
  },
);
