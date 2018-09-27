angular.module('App').controller(
  'EmailsDeleteAclCtrl',
  class EmailsDeleteAclCtrl {
    /**
     * Constructor
     * @param $scope
     * @param $stateParams
     * @param $translate
     * @param Alerter
     * @param Emails
     */
    constructor($scope, $stateParams, $translate, Alerter, Emails) {
      this.$scope = $scope;
      this.$stateParams = $stateParams;
      this.$translate = $translate;
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
          this.$translate.instant('email_tab_modal_delete_acl_success'),
          this.$scope.alerts.main,
        ))
        .catch(err => this.Alerter.alertFromSWS(
          this.$translate.instant('email_tab_modal_delete_acl_error'),
          err,
          this.$scope.alerts.main,
        ))
        .finally(() => this.$scope.resetAction());
    }
  },
);
