angular.module("App").controller("HostingDatabaseCheckQuotaCtrl", ($scope, $stateParams, HostingDatabase, Alerter) => {
    "use strict";

    const completionDeferred = $scope.currentActionData.deferred;
    $scope.entryToCheck = $scope.currentActionData.database;

    $scope.checkQuota = function () {
        $scope.resetAction();
        HostingDatabase.requestDatabaseQuotaCheck($stateParams.productId, $scope.entryToCheck)
            .then((data) => {
                Alerter.success($scope.tr("hosting_tab_DATABASES_configuration_check_quota_success", [$scope.entryToCheck]), $scope.alerts.dashboard);
                completionDeferred.resolve(data);
            })
            .catch((err) => {
                _.set(err, "type", err.type || "ERROR");
                Alerter.alertFromSWS($scope.tr("hosting_tab_DATABASES_configuration_check_quota_fail"), _.get(err, "data", err), $scope.alerts.dashboard);
                completionDeferred.reject(err);
            });
    };
});
