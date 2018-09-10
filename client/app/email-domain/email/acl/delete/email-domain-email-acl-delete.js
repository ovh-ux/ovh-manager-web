angular.module('App').controller(
  'EmailsDeleteAclCtrl',
  class EmailsDeleteAclCtrl {
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
      this.acl = this.$scope.currentActionData || null;
      this.$scope.deleteAcl = () => this.deleteAcl();
    }

    deleteAcl() {
      this.Emails.deleteAcl(this.$stateParams.productId, this.acl.accountId)
        .then(() => this.Alerter.success(
          this.$scope.tr('email_tab_modal_delete_acl_success'),
          this.$scope.alerts.main,
        ))
        .catch(err => this.Alerter.alertFromSWS(
          this.$scope.tr('email_tab_modal_delete_acl_error'),
          err,
          this.$scope.alerts.main,
        ))
        .finally(() => this.$scope.resetAction());
    }
  },
);
