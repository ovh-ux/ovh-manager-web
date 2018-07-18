angular.module('App').controller(
  'EmailsDeleteAccountCtrl',
  class EmailsDeleteAccountCtrl {
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
      this.currentAccount = this.$scope.currentActionData || null;
      this.$scope.deleteAccount = () => this.deleteAccount();
    }

    deleteAccount() {
      this.Emails.deleteAccount(
        this.$stateParams.productId,
        this.currentAccount.accountName,
      )
        .then(() => this.Alerter.success(
          this.$scope.tr('email_tab_modal_delete_account_success'),
          this.$scope.alerts.main,
        ))
        .catch(err => this.Alerter.alertFromSWS(
          this.$scope.tr('email_tab_modal_delete_account_error'),
          err,
          this.$scope.alerts.main,
        ))
        .finally(() => this.$scope.resetAction());
    }
  },
);
