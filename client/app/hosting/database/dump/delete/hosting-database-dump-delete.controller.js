angular.module('App').controller(
  'HostingDatabaseDumpDeleteCtrl',
  class HostingDatabaseDumpDeleteCtrl {
    constructor($scope, $filter, $stateParams, HostingDatabase, Alerter) {
      this.$scope = $scope;
      this.$filter = $filter;
      this.$stateParams = $stateParams;
      this.HostingDatabase = HostingDatabase;
      this.Alerter = Alerter;
    }

    $onInit() {
      this.database = angular.copy(this.$scope.currentActionData.database);
      this.dump = angular.copy(this.$scope.currentActionData.dump);

      this.fitleredCreationDate = this.$filter('date')(this.dump.creationDate, 'medium');

      this.$scope.deleteDatabaseDump = () => this.deleteDatabaseDump();
    }

    deleteDatabaseDump() {
      return this.HostingDatabase.deleteDatabaseDump(this.$stateParams.productId, this.database.name, this.dump)
        .catch((err) => {
          _.set(err, 'type', err.type || 'ERROR');
          this.Alerter.alertFromSWS(this.$scope.tr('database_tabs_dumps_delete_fail'), err, this.$scope.alerts.main);
        })
        .finally(() => this.$scope.resetAction());
    }
  },
);
