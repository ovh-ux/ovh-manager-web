angular.module("App").controller("HostingDatabaseDeleteCtrl", ($scope, $stateParams, HostingDatabase, Alerter) => {
    "use strict";

    $scope.entryToDelete = $scope.currentActionData;

    $scope.deleteDatabase = function () {
        $scope.resetAction();
        HostingDatabase.deleteDatabase($stateParams.productId, $scope.entryToDelete)
            .then(() => {
                Alerter.success($scope.tr("hosting_tab_DATABASES_configuration_delete_success"), $scope.alerts.dashboard);
            })
            .catch((err) => {
                _.set(err, "type", err.type || "ERROR");
                Alerter.alertFromSWS($scope.tr("hosting_tab_DATABASES_configuration_delete_fail", [$scope.entryToDelete]), _.get(err, "data", err), $scope.alerts.dashboard);
            });
    };
});
