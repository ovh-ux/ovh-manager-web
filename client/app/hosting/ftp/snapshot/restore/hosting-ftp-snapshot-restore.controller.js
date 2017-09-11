angular.module("App").controller("HostingFtpRestoreSnapshotCtrl", ($scope, $stateParams, HostingFtp, Alerter, Hosting, $rootScope) => {
    "use strict";
    $scope.model = {};
    $scope.loaders = {
        loading: false
    };

    //------------------------
    // Step 1
    //------------------------
    $scope.initStep1 = function () {
        $scope.loaders.loading = true;
        HostingFtp.getModels()
            .then(
                (data) => {
                    $scope.instances = data.models["hosting.web.backup.TypeEnum"].enum;
                    $scope.model.snapshotInstance = $scope.instances[0];

                    Hosting.getSelected($stateParams.productId).then((hosting) => {
                        // remove backup snapshots that are not yet available
                        if (moment(hosting.creation).isAfter(moment().subtract(2, "weeks"))) {
                            _.pull($scope.instances, "weekly.2");
                        } else if (moment(hosting.creation).isAfter(moment().subtract(1, "weeks"))) {
                            _.pull($scope.instances, "weekly.1");
                        } else if (moment(hosting.creation).isAfter(moment().subtract(3, "days"))) {
                            _.pull($scope.instances, "daily.3");
                        } else if (moment(hosting.creation).isAfter(moment().subtract(2, "days"))) {
                            _.pull($scope.instances, "daily.2");
                        }
                    });
                },
                (ret) => {
                    Alerter.alertFromSWS($scope.tr("hosting_tab_FTP_configuration_restore_snapshot_error"), ret, $scope.alerts.dashboard);
                }
            )
            .finally(() => {
                $scope.loaders.loading = false;
            });
    };

    $scope.isStep1Valid = function () {
        return $scope.instances && $scope.model.snapshotInstance && $scope.instances.indexOf($scope.model.snapshotInstance) !== -1;
    };

    //------------------------
    // Restore snapshot
    //------------------------
    $scope.restoreSnapshot = function () {
        $scope.loaders.loading = true;

        HostingFtp.restoreSnapshot($stateParams.productId, { backup: $scope.model.snapshotInstance })
            .then(
                () => {
                    Alerter.success($scope.tr("hosting_tab_FTP_configuration_restore_snapshot_success"), $scope.alerts.dashboard);
                    $rootScope.$broadcast("hosting.tabs.tasks.refresh");
                },
                (ret) => {
                    Alerter.alertFromSWS($scope.tr("hosting_tab_FTP_configuration_restore_snapshot_error"), ret.data, $scope.alerts.dashboard);
                }
            )
            .finally(() => {
                $scope.loaders.loading = false;
                $scope.resetAction();
            });
    };
});
