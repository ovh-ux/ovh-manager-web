angular.module("App").controller("HostingDatabaseDumpDeleteCtrl", function ($scope, $filter, $stateParams, HostingDatabase, Alerter) {
    "use strict";

    $scope.database = angular.copy($scope.currentActionData.database);
    $scope.dump = angular.copy($scope.currentActionData.dump);

    this.init = function () {
        $scope.fitleredCreationDate = $filter("date")($scope.dump.creationDate, "medium");
    };

    $scope.deleteDatabaseDump = function () {
        $scope.resetAction();
        HostingDatabase.deleteDatabaseDump($stateParams.productId, $scope.database.name, $scope.dump).catch((err) => {
            Alerter.alertFromSWS($scope.tr("database_tabs_dumps_delete_fail"), err, "dataBase.alerts.bdd");
        });
    };

    this.init();
});
