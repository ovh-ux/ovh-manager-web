angular.module("App").controller("HostingTabModulesController", ($scope, $stateParams, Hosting, HostingModule, Alerter, User) => {
    "use strict";

    $scope.modules = {
        details: []
    };

    $scope.loading = {
        table: false
    };

    function init () {
        Hosting.getSelected($stateParams.productId)
            .then((hosting) => {
                $scope.serviceState = hosting.serviceState;
            })
            .catch((err) => {
                Alerter.alertFromSWS($scope.tr("hosting_configuration_tab_modules_create_step1_loading_error"), _.get(err, "data", err), $scope.alerts.dashboard);
            });

        User.getUrlOf("guides").then((guides) => {
            if (guides && guides.hostingModule) {
                $scope.guide = guides.hostingModule;
            }
        });

        $scope.loadTab();
    }

    $scope.loadTab = function (forceRefresh) {
        $scope.loading.table = true;
        $scope.modules.ids = null;

        return HostingModule.getModules($stateParams.productId, { forceRefresh })
            .then((data) => {
                $scope.modules.ids = data;
            })
            .catch((err) => {
                Alerter.alertFromSWS($scope.tr("hosting_configuration_tab_modules_create_step1_loading_error"), err, $scope.alerts.dashboard);
            })
            .finally(() => {
                if (_.isEmpty($scope.modules.ids)) {
                    $scope.loading.table = false;
                }
            });
    };

    $scope.transformItem = function (id) {
        return HostingModule.getModule($stateParams.productId, id).then((module) =>
            HostingModule.getAvailableModule(module.moduleId).then((template) => {
                module.template = template;
                return module;
            })
        );
    };

    $scope.onTransformItemDone = function () {
        $scope.loading.table = false;
    };

    $scope.$on("hosting.tabs.modules.refresh", () => {
        $scope.loadTab(true);
    });

    init();
});
