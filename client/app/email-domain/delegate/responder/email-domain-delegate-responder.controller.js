angular.module('App').controller(
  'EmailDelegateResponderCtrl',
  class EmailDelegateResponderCtrl {
    /**
     * Constructor
     * @param $scope
     * @param $stateParams
     * @param $translate
     * @param Alerter
     * @param WucEmails
     */
    constructor($scope, $stateParams, $translate, Alerter, WucEmails) {
      this.$scope = $scope;
      this.$stateParams = $stateParams;
      this.$translate = $translate;
      this.Alerter = Alerter;
      this.WucEmails = WucEmails;
    }

    $onInit() {
      this.loading = {
        responders: false,
      };

      this.$scope.$on('hosting.tabs.delegate.responders.refresh', () => this.refreshTableResponders());

      this.refreshTableResponders();
    }

    static isExpired(responder) {
      if (!responder.to) {
        return false;
      }
      return moment(new Date(responder.to)).isBefore(new Date());
    }

    refreshTableResponders() {
      this.loading.responders = true;
      this.emailsList = null;
      this.accounts = [];

      return this.WucEmails.getDelegatedEmails(this.$stateParams.productId)
        .then((data) => {
          this.accounts = _.map(data, email => email.split('@')[0]);
          this.emailsList = data.sort();
        })
        .catch(err => this.Alerter.alertFromSWS(
          this.$translate.instant('email_tab_table_accounts_error'),
          err,
          this.$scope.alerts.main,
        ))
        .finally(() => {
          if (_.isEmpty(this.emailsList)) {
            this.loading.responders = false;
          }
        });
    }

    transformItem(item) {
      return this.WucEmails.getDelegatedResponder(item);
    }

    onTransformItemDone() {
      this.loading.responders = false;
    }
  },
);
