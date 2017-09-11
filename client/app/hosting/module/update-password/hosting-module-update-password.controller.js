angular.module("App").controller("HostingModuleChangePasswordCtrl", ($scope, $stateParams, HostingModule, Alerter) => {
    "use strict";

    $scope.moduleToUpdate = $scope.currentActionData;

    $scope.updatePasswordModule = function () {
        $scope.resetAction();
        HostingModule.changePassword($stateParams.productId, $scope.moduleToUpdate.id).then(
            () => {
                Alerter.success($scope.tr("hosting_configuration_tab_modules_update_success"), $scope.alerts.dashboard);
            },
            (data) => {
                Alerter.alertFromSWS($scope.tr("hosting_configuration_tab_modules_update_fail", [$scope.entryToDelete]), data.data, $scope.alerts.dashboard);
                $scope.resetActions();
            }
        );
    };
});
