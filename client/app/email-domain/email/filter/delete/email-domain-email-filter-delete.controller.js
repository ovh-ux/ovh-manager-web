angular.module('App').controller(
  'EmailsDeleteFilterCtrl',
  class EmailsDeleteFilterCtrl {
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
      this.account = this.$scope.currentActionData.account || null;
      this.filter = this.$scope.currentActionData.filter || null;
      this.$scope.deleteFilter = () => this.deleteFilter();
    }

    deleteFilter() {
      let filterPromise;
      if (_.get(this.$scope.currentActionData, 'delegate', false)) {
        filterPromise = this.Emails.deleteDelegatedFilter(
          this.account.email,
          this.filter.name,
        );
      } else {
        filterPromise = this.Emails.deleteFilter(
          this.$stateParams.productId,
          this.account.accountName,
          this.filter.name,
        );
      }

      return filterPromise
        .then(() => this.Alerter.success(
          this.$scope.tr('email_tab_modal_delete_filter_success'),
          this.$scope.alerts.main,
        ))
        .catch(err => this.Alerter.alertFromSWS(
          this.$scope.tr('email_tab_modal_delete_filter_error'),
          _.get(err, 'data', err),
          this.$scope.alerts.main,
        ))
        .finally(() => this.$scope.resetAction());
    }
  },
);
