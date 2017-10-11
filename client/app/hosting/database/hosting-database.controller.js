angular.module("App").controller("HostingTabDatabasesCtrl", function ($scope, $stateParams, Hosting, $timeout, $q, HostingDatabase, Alerter) {
    "use strict";

    $scope.bddTemplate = "hosting/database/DATABASE_LIST.html";

    $scope.USAGE_PERCENT_SHOW_IN_BAR = 55;

    $scope.quotaStatusEnum = {
        OK: "ok",
        WARNING: "warning",
        DANGER: "danger",
        FULL: "full"
    };

    $scope.databases = {
        details: []
    };
    $scope.search = {
        text: null
    };

    $scope.hasResult = false;
    $scope.loading = {
        databases: false,
        init: true
    };

    $scope.canCreateDatabase = $scope.hosting.databaseMax - $scope.hosting.databaseCount > 0;

    $scope.backupType = {
        DAILY: "daily.1",
        WEEKLY: "weekly.1",
        NOW: "now"
    };

    /**
     * @param {Object} quotaUsed
     * @param {Number} quotaUsed.value
     * @param {String} quotaUsed.unit
     * @param {Object} quotaSize
     * @param {Number} quotaSize.value
     * @param {String} quotaSize.unit
     * @returns {String}
     */
    function getQuotaUsageString (quotaUsed, quotaSize) {
        return `${Math.round(quotaUsed.value * 100) / 100} ${$scope.tr(`unit_size_${quotaUsed.unit}`)} / ${quotaSize.value} ${$scope.tr(`unit_size_${quotaSize.unit}`)}`;
    }

    /**
     * @param {Number} quotaPercent quota usage expressed as a percentage
     * @returns {String}
     */
    function getQuotaStatus (quotaPercent) {
        if (quotaPercent < 70) {
            return $scope.quotaStatusEnum.OK;
        }

        if (quotaPercent >= 70 && quotaPercent <= 90) {
            return $scope.quotaStatusEnum.WARNING;
        }

        if (quotaPercent >= 90 && quotaPercent < 100) {
            return $scope.quotaStatusEnum.DANGER;
        }

        return $scope.quotaStatusEnum.FULL;
    }

    function reloadCurrentPage () {
        if (!$scope.loading.databases) {
            $scope.$broadcast("paginationServerSide.reload");
        }
    }

    $scope.loadDatabases = (count, offset) => {
        $scope.loading.databases = true;
        Hosting.getTabDatabases($stateParams.productId, count, offset, $scope.search.text).then((databases) => {
            $scope.loading.databases = false;
            $scope.databases = databases;
            $scope.databases.list.results.forEach((database) => {
                database.quotaUsed.asText = getQuotaUsageString(database.quotaUsed, database.quotaSize);
                database.quotaPercentCappedAsText = `${Math.min(100, Math.round(database.quotaPercent))}%`;
                database.quotaStatus = getQuotaStatus(database.quotaPercent);
            });
        }, this.onError);
    };

    $scope.formatVersion = (version) => version.replace(/_/gi, ".");

    $scope.deleteDatabase = (database) => $scope.setAction("database/delete/hosting-database-delete", database.name);

    $scope.createDump = (database) => $scope.setAction("database/dump/add/hosting-database-dump-add", database.name);

    $scope.importFromFile = (database) => $scope.setAction("database/import/hosting-database-import", database.name);

    $scope.updatePassword = (database) => $scope.setAction("database/update-password/hosting-database-update-password", database.name);

    $scope.restoreDump = (database) => {
        $scope.bdd = database;
        $scope.bddTemplate = "hosting/database/dump/DUMPS.html";
    };

    $scope.restoreDatabaseBackup = (database, backupType, sendEmail) => {
        const deferred = $q.defer();
        $scope.setAction("database/restore/confirm/hosting-database-restore-confirm", {
            deferred,
            bdd: database,
            backupType
        });

        deferred.promise
            .then(() => {
                HostingDatabase.restoreBDDBackup($stateParams.productId, database.name, backupType, sendEmail)
                    .then(() => {
                        Alerter.success($scope.tr("database_tabs_dumps_restore_in_start"), $scope.alerts.main);
                    })
                    .catch((err) => {
                        Alerter.alertFromSWS($scope.tr("database_tabs_dumps_restore_fail"), err, $scope.alerts.main);
                    });
            })
            .then(() => {
                reloadCurrentPage();
            });
    };

    $scope.restoreYesterdayBackup = (database) => $scope.restoreDatabaseBackup(database, $scope.backupType.DAILY, true);

    $scope.restoreLastWeekBackup = (database) => $scope.restoreDatabaseBackup(database, $scope.backupType.WEEKLY, true);

    $scope.checkQuota = (database) => {
        const deferred = $q.defer();
        $scope.setAction("database/quota/hosting-database-quota", {
            database: database.name,
            deferred
        });
        deferred.promise
            .then((task) => {
                database.quotaCalculating = true;
                return Hosting.pollDatabaseQuotaTask($stateParams.productId, task.id);
            })
            .then(() => {
                database.quotaCalculating = false;
                reloadCurrentPage();
            })
            .catch(this.onError);
    };

    $scope.$on(Hosting.events.tabDatabasesRefresh, () => {
        $scope.loading.init = true;
        $scope.hasResult = false;
        $scope.reload();
    });

    $scope.getPhpMyAdminUrl = (element) => {
        let PHPMYADMIN_BASE_URL = "https://phpmyadmin.ovh.net/index.php";
        if ($scope.hostingProxy.datacenter !== "p19") {
            PHPMYADMIN_BASE_URL = ["https://phpmyadmin", $scope.hostingProxy.cluster, "hosting.ovh.net/index.php"].join(".");
        }
        const queryString = `pma_username=${element.user}&pma_servername=${element.name}`;

        return `${PHPMYADMIN_BASE_URL}?${queryString}`;
    };

    function loadDatabases () {
        $scope.loading.databases = true;
        $scope.databases.ids = null;

        HostingDatabase.getDatabaseIds($stateParams.productId, $scope.search.text)
            .then((ids) => {
                $scope.databases.ids = ids;
            })
            .catch((err) => {
                Alerter.alertFromSWS($scope.tr("hosting_tab_databases_get_error"), err, $scope.alerts.main);
            })
            .finally(() => {
                if (_.isEmpty($scope.databases.ids)) {
                    $scope.loading.init = false;
                    $scope.loading.databases = false;
                } else {
                    $scope.hasResult = true;
                }
            });
    }

    $scope.reload = () => {
        loadDatabases();
    };

    $scope.transformItem = (id) => $q.all([HostingDatabase.getDatabase($stateParams.productId, id), HostingDatabase.getDumpIds($stateParams.productId, id)]).then((data) => {
        data[0].quotaUsed.asText = getQuotaUsageString(data[0].quotaUsed, data[0].quotaSize);
        data[0].quotaUsedCappedAsText = `${Math.round(data[0].quotaUsed.value * 100) / 100} ${$scope.tr(`unit_size_${data[0].quotaUsed.unit}`)}`;
        data[0].quotaPercentCappedAsText = `${Math.min(100, Math.round(data[0].quotaPercent))}%`; // Quotapercent ???
        data[0].quotaStatus = getQuotaStatus(data[0].quotaPercent);
        data[0].dumpsCount = data[1].length;
        data[0].dumps = data[1];

        return data[0];
    });

    $scope.onTransformItemDone = () => {
        $scope.loading.init = false;
        $scope.loading.databases = false;
    };

    $scope.$watch(
        "search.text",
        (newValue) => {
            if ($scope.search.text !== null) {
                if ($scope.search.text === "") {
                    loadDatabases();
                } else if ($scope.search.text === newValue) {
                    loadDatabases();
                }
            }
        },
        true
    );

    $scope.goToList = () => {
        $scope.loading.init = true;
        $scope.bdd = null;
        $scope.bddTemplate = "hosting/database/DATABASE_LIST.html";
    };

    loadDatabases();
});
