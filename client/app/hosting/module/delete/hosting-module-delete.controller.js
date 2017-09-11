angular.module("App").controller("HostingModuleDeleteCtrl", ($scope, $stateParams, HostingModule, Alerter) => {
    "use strict";

    $scope.moduleToDelete = $scope.currentActionData;

    $scope.deleteModule = function () {
        $scope.resetAction();
        HostingModule.deleteModule($stateParams.productId, $scope.moduleToDelete.id).then(
            () => {
                Alerter.success($scope.tr("hosting_configuration_tab_modules_delete_success"), $scope.alerts.dashboard);
            },
            (err) => {
                Alerter.alertFromSWS($scope.tr("hosting_configuration_tab_modules_delete_fail", [$scope.entryToDelete]), err, $scope.alerts.dashboard);
            }
        );
    };
});
