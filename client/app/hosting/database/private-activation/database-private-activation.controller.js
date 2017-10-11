angular.module("App").controller("HostingDatabasePrivateActiveCtrl", ($scope, $rootScope, $stateParams, HostingDatabase, Alerter, Hosting) => {
    "use strict";

    $scope.hosting = $scope.currentActionData;

    $scope.datas = {
        versions: []
    };
    $scope.loaders = {
        versions: false
    };
    $scope.choice = {
        ram: $scope.hosting.offerCapabilities.privateDatabases.length === 1 ? $scope.hosting.offerCapabilities.privateDatabases[0] : null,
        version: null
    };

    function init () {
        if (!$scope.loaders.versions) {
            $scope.loaders.versions = true;
            Hosting.getModels()
                .then((models) => {
                    $scope.datas.versions = models.models["hosting.PrivateDatabase.OrderableVersionEnum"].enum;
                    $scope.choice.version = $scope.datas.versions.length === 1 ? $scope.datas.versions[0] : null;
                })
                .catch((err) => {
                    Alerter.alertFromSWS($scope.tr("hosting_dashboard_database_versions_error", [$scope.entryToDelete]), _.get(err, "data", err), $scope.alerts.main);
                })
                .finally(() => {
                    $scope.loaders.versions = false;
                });
        }
    }

    $scope.activeDatabase = function () {
        if (!$scope.loaders.versions) {
            $scope.loaders.versions = true;
            HostingDatabase.activeDatabasePrivate($stateParams.productId, $scope.choice.ram.quota.value, $scope.choice.version)
                .then(() => {
                    $rootScope.$broadcast("hosting.database.sqlPrive");
                    Alerter.success($scope.tr("hosting_dashboard_database_active_success"), $scope.alerts.main);
                })
                .catch((err) => {
                    Alerter.alertFromSWS($scope.tr("hosting_dashboard_database_active_error", [$scope.entryToDelete]), _.get(err, "data", err), $scope.alerts.main);
                })
                .finally(() => {
                    $scope.resetAction();
                });
        }
    };

    init();
});
