angular.module("App").controller("HostingMigrateMyOvhOrgCtrl", ($scope, $stateParams, Alerter, Hosting) => {
    "use strict";

    $scope.model = {
        destination: null
    };

    $scope.hostings = [];

    $scope.loading = {
        hostings: null,
        validation: null
    };

    /*= =============================
     =            STEP 1           =
     ==============================*/
    $scope.hosting = $scope.currentActionData;

    $scope.getHostings = function () {
        $scope.loading.hostings = true;

        Hosting.getHostings($scope.hosting ? $scope.hosting.serviceName : null)
            .then(
                (hostings) => {
                    $scope.hostings = hostings;

                    // We delete the current product
                    const index = $scope.hostings.indexOf($stateParams.productId);
                    $scope.hostings.splice(index, 1);
                },
                () => {
                    $scope.hostings = [];
                }
            )
            .finally(() => {
                $scope.loading.hostings = false;
            });
    };

    $scope.migrateMyOvhOrg = function () {
        $scope.loading.validation = true;
        $scope.resetAction();

        Hosting.migrateMyOvhOrg($stateParams.productId, $scope.model.destination)
            .then(
                () => {
                    Alerter.success($scope.tr("hosting_migrate_my_ovh_org_success"), "hosting.alerts.dashboard");
                },
                (err) => {
                    Alerter.alertFromSWS($scope.tr("hosting_migrate_my_ovh_org_error"), err, "hosting.alerts.dashboard");
                }
            )
            .finally(() => {
                $scope.loading.validation = false;
            });
    };
});
