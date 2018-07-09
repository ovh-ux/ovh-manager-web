angular.module('App').controller(
  'EmailsTabTasksCtrl',
  class EmailsTabTasksCtrl {
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
      this.refreshTasks();
    }

    refreshTasks() {
      this.taskIds = [];
      return this.Emails.getAllTaskIds(this.$stateParams.productId)
        .then((ids) => {
          _.forEach(ids, (type) => {
            _.forEach(type.ids, (id) => {
              this.taskIds.push({ action: type.action, id });
            });
          });
        })
        .catch((err) => {
          _.set(err, 'type', err.type || 'ERROR');
          this.Alerter.alertFromSWS(this.$scope.tr('email_tab_TASK_error_message'), _.get(err, 'data', err), this.$scope.alerts.main);
        });
    }

    transformItem(item) {
      return this.Emails.getTask(this.$stateParams.productId, item);
    }
  },
);
