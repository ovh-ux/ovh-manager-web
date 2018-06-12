angular.module('App').controller(
  'HostingRestoreDatabaseConfirmCtrl',
  class HostingRestoreDatabaseConfirmCtrl {
    constructor($scope, $stateParams, Alerter, HostingDatabase) {
      this.$scope = $scope;
      this.$stateParams = $stateParams;
      this.alerter = Alerter;
      this.hostingDatabaseService = HostingDatabase;
    }

    $onInit() {
      this.backupType = angular.copy(this.$scope.currentActionData.backupType);
      this.bdd = angular.copy(this.$scope.currentActionData.bdd);

      this.$scope.restoreDatabaseBackup = () => this.restoreDatabaseBackup();
    }

    restoreDatabaseBackup() {
      return this.hostingDatabaseService.restoreBDDBackup(this.$stateParams.productId, this.bdd.name, this.backupType, true)
        .then(() => {
          this.alerter.success(this.$scope.tr('database_tabs_dumps_restore_in_start'), this.$scope.alerts.main);
        })
        .catch((err) => {
          _.set(err, 'type', err.type || 'ERROR');
          this.alerter.alertFromSWS(this.$scope.tr('database_tabs_dumps_restore_fail'), err, this.$scope.alerts.main);
        })
        .finally(() => {
          this.$scope.resetAction();
        });
    }
  },
);
