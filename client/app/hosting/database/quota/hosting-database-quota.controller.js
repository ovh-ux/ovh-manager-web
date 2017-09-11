angular.module("App").controller("HostingDatabaseCheckQuotaCtrl", ($scope, $stateParams, HostingDatabase, Alerter) => {
    "use strict";

    const completionDeferred = $scope.currentActionData.deferred;
    $scope.entryToCheck = $scope.currentActionData.database;

    $scope.checkQuota = function () {
        $scope.resetAction();
        HostingDatabase.requestDatabaseQuotaCheck($stateParams.productId, $scope.entryToCheck).then(
            (data) => {
                Alerter.alertFromSWS($scope.tr("hosting_tab_DATABASES_configuration_check_quota_success", [$scope.entryToCheck]), data, $scope.alerts.dashboard);
                completionDeferred.resolve(data);
            },
            (err) => {
                Alerter.alertFromSWS($scope.tr("hosting_tab_DATABASES_configuration_check_quota_fail"), err.data, $scope.alerts.dashboard);
                completionDeferred.reject(err);
            }
        );
    };
});
