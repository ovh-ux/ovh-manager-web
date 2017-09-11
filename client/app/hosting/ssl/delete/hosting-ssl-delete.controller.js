angular.module("App").controller("HostingDeleteSslCtrl", ($scope, $stateParams, Hosting, Alerter) => {
    "use strict";

    $scope.ssl = $scope.currentActionData;
    $scope.deleteSsl = () => {
        $scope.resetAction();

        Hosting.deleteSsl($stateParams.productId).then(
            () => {
                $scope.loadSsl();
                Alerter.success($scope.tr("hosting_dashboard_service_delete_ssl_success"), $scope.alerts.dashboard);
            },
            (err) => {
                Alerter.alertFromSWS($scope.tr("hosting_dashboard_service_delete_ssl_error"), err, $scope.alerts.dashboard);
            }
        );
    };
});
