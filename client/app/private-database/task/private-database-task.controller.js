angular.module('App').controller(
  'PrivateDatabaseTasksCtrl',
  class PrivateDatabaseTasksCtrl {
    constructor($scope, $stateParams, Alerter, PrivateDatabase) {
      this.$scope = $scope;
      this.productId = $stateParams.productId;
      this.privateDatabaseService = PrivateDatabase;
      this.alerter = Alerter;
    }

    $onInit() {
      this.getTasks();
    }

    getTasks() {
      this.taskDetails = null;

      return this.privateDatabaseService.getTasks(this.productId)
        .then((ids) => {
          this.taskDetails = ids.sort((a, b) => b - a).map(id => ({ id }));
        }).catch(() => {
          this.alerter.error(this.$scope.tr('privateDatabase_configuration_error'), this.$scope.alerts.main);
        });
    }

    transformItem(item) {
      return this.privateDatabaseService.getTaskDetails(this.productId, item.id).catch(() => {
        this.alerter.error(this.$scope.tr('privateDatabase_configuration_error'), this.$scope.alerts.main);
      });
    }
  },
);
