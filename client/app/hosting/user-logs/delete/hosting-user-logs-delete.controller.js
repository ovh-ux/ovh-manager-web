angular.module("App").controller("HostingUserLogsDeleteCtrl", ($scope, $stateParams, Hosting, Alerter) => {
    "use strict";

    $scope.entryToDelete = $scope.currentActionData;

    $scope.deleteUser = function () {
        $scope.resetAction();
        Hosting.deleteUserLogs($stateParams.productId, $scope.entryToDelete).then(
            () => {
                Alerter.success($scope.tr("hosting_tab_USER_LOGS_configuration_user_delete_success"), $scope.alerts.dashboard);
            },
            (data) => {
                Alerter.alertFromSWS($scope.tr("hosting_tab_USER_LOGS_configuration_user_delete_fail", [$scope.entryToDelete]), data.data, $scope.alerts.dashboard);
            }
        );
    };
});
