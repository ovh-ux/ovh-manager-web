angular.module('App').controller(
  'EmailsUpdateRedirectionCtrl',
  class EmailsUpdateRedirectionCtrl {
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
      this.model = angular.copy(this.$scope.currentActionData.redirection);

      this.$scope.updateRedirection = () => this.updateRedirection();
    }

    static redirectionToCheck(input) {
      const value = input.$viewValue;
      input.$setValidity('redirectionTo', validator.isEmail(value));
    }

    updateRedirection() {
      return this.Emails.updateRedirection(this.$stateParams.productId, {
        id: this.model.id,
        data: {
          to: this.model.to,
        },
      })
        .then(() => this.Alerter.success(
          this.$scope.tr('email_tab_modal_update_redirection_success'),
          this.$scope.alerts.main,
        ))
        .catch(err => this.Alerter.alertFromSWS(
          this.$scope.tr('email_tab_modal_update_redirection_error'),
          err,
          this.$scope.alerts.main,
        ))
        .finally(() => this.$scope.resetAction());
    }
  },
);
