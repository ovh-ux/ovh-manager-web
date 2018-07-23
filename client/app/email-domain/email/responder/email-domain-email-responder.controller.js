angular.module('App').controller(
  'EmailDomainEmailResponderCtrl',
  class EmailDomainEmailResponderCtrl {
    /**
     * Constructor
     * @param $scope
     * @param $stateParams
     * @param Alerter
     * @param Emails
     */
    constructor($q, $scope, $stateParams, $timeout, Alerter, Emails) {
      this.$q = $q;
      this.$scope = $scope;
      this.$stateParams = $stateParams;
      this.$timeout = $timeout;
      this.Alerter = Alerter;
      this.Emails = Emails;
    }

    $onInit() {
      this.loading = {
        responders: false,
        pager: false,
      };

      this.productId = this.$stateParams.productId;

      this.$scope.$on('hosting.tabs.emails.responders.refresh', () =>
        this.refreshTableResponders());

      this.$scope.$on('$destroy', () => this.Emails.killPollResponderTasks());

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
      this.responders = null;

      return this.Emails.getResponders(this.productId)
        .then((data) => {
          this.responders = _.chain(data).sort().map(account => ({ account })).value();
        })
        .catch(err =>
          this.Alerter.alertFromSWS(
            this.$scope.tr('email_tab_table_responders_error'),
            err,
            this.$scope.alerts.main,
          ))
        .finally(() => { this.loading.responders = false; });
    }

    transformItem({ account }) {
      return this.Emails.getResponder(this.productId, account)
        .then(responder =>
          this.$q.all([responder, this.Emails.getResponderTasks(this.productId, account)]))
        .then(([responder, tasks]) => {
          const displayedResponder = _.clone(responder);
          const actionsDisabled = !_.isEmpty(tasks);
          if (actionsDisabled) {
            this.pollResponder(displayedResponder);
          }
          displayedResponder.actionsDisabled = actionsDisabled;
          return displayedResponder;
        });
    }

    pollResponder(responder) {
      return this.Emails.pollResponderTasks(this.productId, responder.account)
        .then(() => {
          const newResponder = _.clone(responder);
          const responderIndex =
              _.findIndex(this.responders, item => item.account === responder.account);
          newResponder.actionsDisabled = false;
          this.responders.splice(responderIndex, 1, newResponder);
          return newResponder;
        });
    }
  },
);
