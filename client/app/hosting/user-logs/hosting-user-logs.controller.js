angular.module("App").controller("HostingTabUserLogsCtrl", ($scope, $stateParams, Hosting, Alerter, $filter, constants, User) => {
    "use strict";

    $scope.loaders = {
        userLogs: false,
        pager: false
    };
    $scope.userLogsToken = null;
    $scope.itemsPerPage = 10;
    $scope.nbPages = 1;

    //---------------------------------------------
    // INIT
    //---------------------------------------------
    $scope.init = () => {
        $scope.userLogs = {
            details: []
        };
        $scope.refreshTableUserLogs();

        Hosting.getUserLogsToken($stateParams.productId, {
            params: {
                remoteCheck: true,
                ttl: 3600
            }
        }).then((token) => {
            $scope.userLogsToken = token;
        });

        User.getUrlOf("guides").then((guides) => {
            if (guides && guides.hostingStatsLogs) {
                $scope.guide = guides.hostingStatsLogs;
            }
        });

        if (parseInt($scope.hostingProxy.cluster.split("cluster")[1], 10) >= 20) {
            // FOR GRAVELINE
            $scope.urlUrchin = URI.expand(constants.urchin_gra, {
                serviceName: $scope.hosting.serviceName,
                cluster: $scope.hostingProxy.cluster
            }).toString();

            $scope.urlLogs = URI.expand(constants.stats_logs_gra, {
                serviceName: $scope.hosting.serviceName,
                cluster: $scope.hostingProxy.cluster
            }).toString();
        } else {
            $scope.urlUrchin = URI.expand(constants.urchin, {
                serviceName: $scope.hosting.serviceName,
                cluster: $scope.hostingProxy.cluster
            }).toString();

            $scope.urlLogs = URI.expand(constants.stats_logs, {
                serviceName: $scope.hosting.serviceName,
                cluster: $scope.hostingProxy.cluster
            }).toString();
        }
    };

    //---------------------------------------------
    // USER LOGS
    //---------------------------------------------
    $scope.refreshTableUserLogs = () => {
        $scope.loaders.userLogs = true;
        $scope.userLogs.ids = null;

        Hosting.getUserLogs($stateParams.productId)
            .then((data) => {
                $scope.userLogs.ids = $filter("orderBy")(data);
            })
            .catch((err) => {
                Alerter.alertFromSWS(err);
            })
            .finally(() => {
                if (_.isEmpty($scope.userLogs.ids)) {
                    $scope.loaders.userLogs = false;
                    $scope.loaders.pager = false;
                }
            });
    };

    $scope.$on("hosting.userLogs.refresh", () => {
        $scope.refreshTableUserLogs();
    });

    /*
     * if you want transform item must return transformated item
     * item is the current item to transform
     */
    $scope.transformItem = (item) => Hosting.getUserLogsEntry($stateParams.productId, item).catch(() => ({ login: item }));

    /*
     * call when all item of current page are transformed
     * tasksDetails contains transformated item
     */
    $scope.onTransformItemDone = () => {
        $scope.loaders.userLogs = false;
        $scope.loaders.pager = false;
    };

    $scope.deleteUser = (user) => {
        $scope.setAction("user-logs/delete/hosting-user-logs-delete", user.login);
    };

    $scope.modifyUser = (user) => {
        $scope.setAction("user-logs/update/hosting-user-logs-update", user);
    };

    $scope.updateUserPassword = (user) => {
        $scope.setAction("user-logs/password-update/hosting-user-logs-update-password", user.login);
    };
});
