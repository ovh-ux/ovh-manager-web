angular.module("App").controller("HostingRestoreDatabaseConfirmCtrl", ($scope) => {
    "use strict";

    const completionDeferred = $scope.currentActionData.deferred;
    $scope.backupType = angular.copy($scope.currentActionData.backupType);
    $scope.bdd = angular.copy($scope.currentActionData.bdd);

    $scope.restoreDatabaseBackup = function () {
        $scope.resetAction();
        completionDeferred.resolve();
    };
});
