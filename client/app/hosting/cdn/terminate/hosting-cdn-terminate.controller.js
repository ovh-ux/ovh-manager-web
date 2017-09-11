angular.module("App").controller("HostingTerminateCdnCtrl", ($scope, $stateParams, Hosting, Alerter) => {
    "use strict";

    $scope.terminateCdn = function () {
        Hosting.terminateCdn($stateParams.productId)
            .then(
                () => {
                    Alerter.success($scope.tr("hosting_dashboard_service_terminate_cdn_success"), $scope.alerts.dashboard);
                },
                (error) => {
                    Alerter.alertFromSWS($scope.tr("hosting_dashboard_service_terminate_cdn_error"), error.data, $scope.alerts.dashboard);
                }
            )
            .finally(() => {
                $scope.resetAction();
            });
    };
});
