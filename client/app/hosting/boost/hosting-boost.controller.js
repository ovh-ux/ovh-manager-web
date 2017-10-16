angular.module("App").controller("HostingBoostTabCtrl", ($scope, $stateParams, HostingBoost, Hosting, Alerter) => {
    "use strict";

    $scope.models = {
        product: null,
        boosts: null,
        filters: null,
        disable: null
    };

    $scope.boostHistory = {
        details: []
    };

    $scope.loaders = {
        product: false,
        boostHistory: false
    };

    $scope.itemsPerPage = 10;
    $scope.nbPages = 1;
    $scope.isLoading = false;

    //---------------------------------------------
    // INIT
    //---------------------------------------------
    $scope.init = function () {
        $scope.loaders.product = true;
        Alerter.resetMessage($scope.alerts.main);
        Hosting.getSelected($stateParams.productId, true)
            .then((product) => {
                $scope.models.product = product;
                $scope.refreshTableBoostHistory();

                // Get tasks & start polling if tasks
                HostingBoost.getTasks($stateParams.productId).then((tasks) => {
                    if (_.flatten(tasks).length > 0) {
                        $scope.isLoading = true;
                    }
                    tasks[0].forEach((task) => {
                        HostingBoost.pollBoostRequestState({ serviceName: product.serviceName, task });
                    });
                    tasks[1].forEach((task) => {
                        HostingBoost.pollBoostDisableState({ serviceName: product.serviceName, task });
                    });
                });
            })
            .catch((err) => {
                Alerter.alertFromSWS($scope.tr("hosting_tab_BOOST_error"), err, $scope.alerts.main);
            })
            .finally(() => {
                $scope.loaders.product = false;
            });
    };

    //---------------------------------------------
    // POLLING
    //---------------------------------------------
    $scope.$on("hosting.boost.request.start", () => {
        $scope.isLoading = true;
        Alerter.success($scope.tr("hosting_tab_BOOST_request_activation"), $scope.alerts.main);
    });

    $scope.$on("hosting.boost.request.done", () => {
        $scope.init();
        $scope.isLoading = false;
        Alerter.success($scope.tr("hosting_tab_BOOST_request_success"), $scope.alerts.main);
    });

    $scope.$on("hosting.boost.request.error", (err) => {
        Alerter.alertFromSWS($scope.tr("hosting_tab_BOOST_error"), _.get(err, "data", err), $scope.alerts.main);
    });

    $scope.$on("hosting.boost.disable.start", () => {
        $scope.isLoading = true;
        Alerter.success($scope.tr("hosting_tab_BOOST_disable_started"), $scope.alerts.main);
    });

    $scope.$on("hosting.boost.disable.done", () => {
        $scope.init();
        $scope.isLoading = false;
        Alerter.success($scope.tr("hosting_tab_BOOST_disable_success"), $scope.alerts.main);
    });

    $scope.$on("hosting.boost.disable.error", (err) => {
        Alerter.alertFromSWS($scope.tr("hosting_tab_BOOST_disable_error"), _.get(err, "data", err), $scope.alerts.main);
    });

    $scope.$on("hosting.boost.error", (err) => {
        Alerter.alertFromSWS($scope.tr("hosting_tab_BOOST_error"), _.get(err, "data", err), $scope.alerts.main);
    });

    $scope.$on("$destroy", () => {
        HostingBoost.killAllPolling();
    });

    //---------------------------------------------
    // BOOSTS
    //---------------------------------------------
    $scope.refreshTableBoostHistory = function () {
        $scope.loaders.boostHistory = true;
        $scope.boostHistory.ids = null;

        HostingBoost.getHistory($stateParams.productId)
            .then((data) => {
                $scope.boostHistory.ids = data.sort((d1, d2) => new Date(d2) - new Date(d1));
            })
            .catch((err) => {
                Alerter.alertFromSWS($scope.tr("hosting_tab_BOOST_error"), err, $scope.alerts.main);
            })
            .finally(() => {
                if (_.isEmpty($scope.boostHistory.ids)) {
                    $scope.loaders.boostHistory = false;
                }
            });
    };

    /*
     * if you want transform item must return transformated item
     * item is the current item to transform
     */
    $scope.transformItem = function (item) {
        return HostingBoost.getHistoryEntry($stateParams.productId, item);
    };

    /*
     * call when all item of current page are transformed
     * tasksDetails contains transformated item
     */
    $scope.onTransformItemDone = function () {
        $scope.loaders.boostHistory = false;
    };

    $scope.$on("hosting.tabs.boostHistory.refresh", () => {
        $scope.refreshTableBoostHistory();
    });
});
