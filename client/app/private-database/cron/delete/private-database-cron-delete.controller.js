angular.module("App").controller("PrivateDatabaseDeleteCronCtrl", [
    "$scope",
    "$rootScope",
    "$stateParams",
    "PrivateDatabaseCron",
    "Alerter",
    function ($scope, $rootScope, $stateParams, PrivateDatabaseCron, Alerter) {
        "use strict";

        $scope.entryToDelete = $scope.currentActionData;

        function resetCronTab () {
            $rootScope.$broadcast(PrivateDatabaseCron.events.tabCronRefresh);
        }

        $scope.deleteCron = () => {
            $scope.resetAction();
            PrivateDatabaseCron.deleteCron($stateParams.productId, $scope.entryToDelete.id).then(
                () => {
                    Alerter.alertFromSWS($scope.tr("privateDatabase_tabs_cron_configuration_delete_success"), { idTask: 42, state: "OK" }, $scope.alerts.dashboard);
                    resetCronTab();
                },
                (data) => {
                    Alerter.alertFromSWS($scope.tr("privateDatabase_tabs_cron_configuration_delete_fail"), data.data, $scope.alerts.dashboard);
                }
            );
        };
    }
]);
