angular.module('App').controller(
  'MailingListsDeleteCtrl',
  class MailingListsDeleteCtrl {
    /**
     * Constructor
     * @param $scope
     * @param $stateParams
     * @param Alerter
     * @param MailingLists
     */
    constructor($scope, $stateParams, Alerter, MailingLists) {
      this.$scope = $scope;
      this.$stateParams = $stateParams;
      this.Alerter = Alerter;
      this.MailingLists = MailingLists;
    }

    $onInit() {
      this.mailingList = this.$scope.currentActionData;
      this.loading = false;
      this.$scope.deleteMailingList = () => this.deleteMailingList();
    }

    deleteMailingList() {
      this.loading = true;
      return this.MailingLists.deleteMailingList(
        this.$stateParams.productId,
        this.mailingList.name,
      )
        .then(() => this.Alerter.success(
          this.$scope.tr('mailing_list_tab_modal_list_delete_success'),
          this.$scope.alerts.main,
        ))
        .catch(err => this.Alerter.alertFromSWS(
          this.$scope.tr('mailing_list_tab_modal_list_delete_error'),
          err,
          this.$scope.alerts.main,
        ))
        .finally(() => {
          this.loading = false;
          this.$scope.resetAction();
        });
    }
  },
);
