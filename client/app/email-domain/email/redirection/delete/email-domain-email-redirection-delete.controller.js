angular.module('App').controller(
  'EmailsDeleteRedirectionCtrl',
  class EmailsDeleteRedirectionCtrl {
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
      this.redirection = this.$scope.currentActionData.redirection;
      this.$scope.deleteRedirection = () => this.deleteRedirection();
    }

    deleteRedirection() {
      return this.Emails.deleteRedirection(
        this.$stateParams.productId,
        this.redirection.id,
      )
        .then(() => this.Alerter.success(
          this.$scope.tr('email_tab_modal_delete_redirection_success'),
          this.$scope.alerts.main,
        ))
        .catch(err => this.Alerter.alertFromSWS(
          this.$scope.tr('email_tab_modal_delete_redirection_error'),
          err,
          this.$scope.alerts.main,
        ))
        .finally(() => this.$scope.resetAction());
    }
  },
);
