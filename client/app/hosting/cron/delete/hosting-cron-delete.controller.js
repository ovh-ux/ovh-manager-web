angular.module("App").controller("HostingCronDeleteCtrl", ($scope, $stateParams, HostingCron, Alerter) => {
    "use strict";

    $scope.entryToDelete = $scope.currentActionData;

    $scope.deleteCron = () => {
        $scope.resetAction();
        HostingCron.deleteCron($stateParams.productId, $scope.entryToDelete.id).then(
            () => {
                Alerter.alertFromSWS($scope.tr("hosting_tab_CRON_configuration_delete_success"), { idTask: 42, state: "OK" }, $scope.alerts.dashboard);
            },
            (data) => {
                Alerter.alertFromSWS($scope.tr("hosting_tab_CRON_configuration_delete_fail"), data.data, $scope.alerts.dashboard);
            }
        );
    };
});
