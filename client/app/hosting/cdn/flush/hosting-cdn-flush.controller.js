angular.module("App").controller("HostingFlushCdnCtrl", ($scope, $stateParams, $rootScope, $q, Hosting, Alerter) => {
    "use strict";

    $scope.loading = false;

    $scope.flushCdn = function () {
        $scope.loading = true;
        Hosting.flushCdn($stateParams.productId)
            .then(
                () => {
                    Alerter.success($scope.tr("hosting_dashboard_cdn_flush_success"), "hosting.alerts.dashboard");
                    $rootScope.$broadcast("hosting.cdn.flush.refresh");
                },
                (data) => {
                    Alerter.alertFromSWS($scope.tr("hosting_dashboard_cdn_flush_error"), data.data, "hosting.alerts.dashboard");
                }
            )
            .finally(() => {
                $scope.resetAction();
            });
    };
});
