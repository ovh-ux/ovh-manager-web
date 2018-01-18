angular.module("App").controller("HostingDatabasePrivateActiveCtrl", ($scope, $rootScope, $stateParams, HostingDatabase, Alerter, Hosting) => {
    "use strict";

    $scope.hosting = $scope.currentActionData;

    $scope.data = {
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
                    $scope.data.versions = getAvailableVersions(models);
                    $scope.choice.version = $scope.data.versions.length === 1 ? $scope.data.versions[0] : null;
                })
                .catch((err) => {
                    Alerter.alertFromSWS($scope.tr("hosting_dashboard_database_versions_error", [$scope.entryToDelete]), _.get(err, "data", err), $scope.alerts.main);
                })
                .finally(() => {
                    $scope.loaders.versions = false;
                });
        }
    }

    function getAvailableVersions (models) {
        const types = models.models["hosting.PrivateDatabase.OrderableVersionEnum"].enum;
        return temporarilyFilterTypesUntilTheyAreOfficiallyReleased(types, ["mongodb_3.4"]);
    }

    function temporarilyFilterTypesUntilTheyAreOfficiallyReleased (types, restrictedList) {
        return _.filter(types, (type) => !_.contains(restrictedList, type));
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
