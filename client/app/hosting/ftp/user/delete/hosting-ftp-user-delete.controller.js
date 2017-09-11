angular.module("App").controller("HostingFtpUserDeleteCtrl", ($scope, $stateParams, HostingUser, Alerter) => {
    "use strict";

    $scope.entryToDelete = $scope.currentActionData;

    $scope.deleteUser = function () {
        $scope.resetAction();
        HostingUser.deleteUser($stateParams.productId, $scope.entryToDelete).then(
            () => {
                Alerter.success($scope.tr("hosting_tab_DATABASES_configuration_user_delete_success"), $scope.alerts.dashboard);
            },
            (data) => {
                Alerter.alertFromSWS($scope.tr("hosting_tab_DATABASES_configuration_user_delete_fail", [$scope.entryToDelete]), data.data, $scope.alerts.dashboard);
            }
        );
    };
});
