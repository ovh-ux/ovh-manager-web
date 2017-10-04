angular.module("App").controller("HostingBoostOfferDisableCtrl", ($scope, HostingBoost, Alerter) => {
    "use strict";

    $scope.product = $scope.currentActionData.product;
    $scope.acceptCGV = { value: false };

    $scope.loaders = {
        disable: false
    };

    $scope.isStepValid = function () {
        return $scope.acceptCGV.value === true;
    };

    $scope.disableBoost = function () {
        $scope.loaders.disable = true;

        HostingBoost.disableBoost({ serviceName: $scope.product.serviceName })
            .then(() => {
                Alerter.success($scope.tr("hosting_tab_BOOST_disable_started"), $scope.alerts.boosts);
            })
            .catch((err) => {
                Alerter.alertFromSWS($scope.tr("hosting_tab_BOOST_disable_error"), _.get(err, "data", err), $scope.alerts.boosts);
            })
            .finally(() => {
                $scope.loaders.disable = false;
                $scope.resetAction();
            });
    };
});
