angular.module("App").controller("HostingDeleteFreedomCtrl", ($scope, $stateParams, HostingFreedom, Alerter) => {
    "use strict";

    $scope.freedom = angular.copy($scope.currentActionData);

    $scope.deleteFreedom = () => {
        $scope.resetAction();
        HostingFreedom.deleteFreedom($stateParams.productId, $scope.freedom.domain).then(
            () => {
                Alerter.success($scope.tr("hosting_dashboard_service_delete_freedom_success", [$scope.freedom.domain]), $scope.alerts.dashboard);
            },
            (err) => {
                Alerter.alertFromSWS($scope.tr("hosting_tab_FREEDOM_error"), err, $scope.alerts.dashboard);
            }
        );
    };
});
