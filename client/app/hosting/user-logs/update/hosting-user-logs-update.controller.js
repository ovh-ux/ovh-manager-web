angular.module("App").controller("HostingUserLogsModifyCtrl", ($scope, $stateParams, Alerter, Hosting) => {
    "use strict";

    $scope.model = {
        user: angular.copy($scope.currentActionData)
    };

    $scope.modifyUser = () => {
        $scope.resetAction();
        Hosting.modifyUserLogs($stateParams.productId, $scope.model.user.login, $scope.model.user.description).then(
            () => {
                Alerter.success($scope.tr("hosting_tab_USER_LOGS_configuration_user_modify_success"), $scope.alerts.dashboard);
            },
            (err) => {
                Alerter.alertFromSWS($scope.tr("hosting_tab_USER_LOGS_configuration_user_modify_fail"), err.data, $scope.alerts.dashboard);
            }
        );
    };
});
