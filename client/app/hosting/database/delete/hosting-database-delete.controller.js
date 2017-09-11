angular.module("App").controller("HostingDatabaseDeleteCtrl", ($scope, $stateParams, HostingDatabase, Alerter) => {
    "use strict";

    $scope.entryToDelete = $scope.currentActionData;

    $scope.deleteDatabase = function () {
        $scope.resetAction();
        HostingDatabase.deleteDatabase($stateParams.productId, $scope.entryToDelete).then(
            (data) => {
                Alerter.alertFromSWS($scope.tr("hosting_tab_DATABASES_configuration_delete_success"), data, $scope.alerts.dashboard);
            },
            (data) => {
                Alerter.alertFromSWS($scope.tr("hosting_tab_DATABASES_configuration_delete_fail", [$scope.entryToDelete]), data.data, $scope.alerts.dashboard);
            }
        );
    };
});
