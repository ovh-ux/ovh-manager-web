angular.module('App').controller(
  'EmailsDeleteResponderCtrl',
  class EmailsDeleteResponderCtrl {
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
      this.responder = this.$scope.currentActionData.responder;
      this.$scope.deleteResponder = () => this.deleteResponder();
    }

    deleteResponder() {
      let promise;
      if (_.get(this.$scope.currentActionData, 'delegate', false)) {
        promise = this.Emails.deleteDelegatedResponder(
          `${this.responder.account}@${this.$stateParams.productId}`,
          this.responder.account,
        );
      } else {
        promise = this.Emails.deleteResponder(
          this.$stateParams.productId,
          this.responder.account,
        );
      }
      return promise
        .then(() => this.Alerter.success(
          this.$translate.instant('email_tab_modal_delete_responder_success'),
          this.$scope.alerts.main,
        ))
        .catch(err => this.Alerter.alertFromSWS(
          this.$translate.instant('email_tab_modal_delete_responder_error'),
          err,
          this.$scope.alerts.main,
        ))
        .finally(() => this.$scope.resetAction());
    }
  },
);
