angular.module('App').controller(
  'EmailDelegateFilterCtrl',
  class EmailDelegateFilterCtrl {
    /**
     * Constructor
     * @param $scope
     * @param $translate
     * @param Alerter
     * @param Emails
     */
    constructor($scope, $translate, Alerter, Emails) {
      this.$scope = $scope;
      this.$translate = $translate;
      this.Alerter = Alerter;
      this.Emails = Emails;
    }

    $onInit() {
      this.accounts = this.$scope.ctrlEmailDelegate.emails || [];
      this.currentAccount = this.$scope.ctrlEmailDelegate.currentViewData || null;

      this.$scope.$on('hosting.tabs.emails.delegatedFilters.refresh', () => this.refreshTableFilters());

      this.refreshTableFilters();
    }

    refreshTableFilters() {
      this.filters = null;

      return this.Emails.getDelegatedFilters(this.currentAccount.email)
        .then((data) => {
          this.filters = data.map(name => ({ name }));
        })
        .catch(err => this.Alerter.alertFromSWS(
          this.$translate.instant('email_tab_table_filters_error'),
          err,
          this.$scope.alerts.main,
        ));
    }

    transformItem({ name }) {
      return this.Emails.getDelegatedFilter(this.currentAccount.email, name);
    }
  },
);
