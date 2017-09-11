angular.module("App").controller("HostingFreedomTabCtrl", function ($rootScope, $scope, $location, $stateParams, HostingFreedom, Alerter) {
    "use strict";

    const self = this;

    self.filter = {
        status: null
    };

    self.loaders = {
        freedoms: false
    };

    const init = () => {
        HostingFreedom.getModels().then((model) => {
            self.statusEnum = model.models["hosting.web.freedom.StatusEnum"].enum;
        }).catch((err) => {
            Alerter.alertFromSWS($scope.tr("hosting_tab_FREEDOM_error"), err, $scope.alerts.dashboard);
        });
    };

    //---------------------------------------------
    // FREEDOMS
    //---------------------------------------------
    self.refreshTableFreedoms = (forceRefresh = false) => {
        self.loaders.freedoms = true;
        self.freedomIds = null;

        let params = {};
        if (self.filter.status) {
            params = { status: self.filter.status };
        }

        HostingFreedom.getFreedoms($stateParams.productId, {
            params,
            forceRefresh
        }).then((ids) => {
            self.freedomIds = ids;
        }).catch((err) => {
            Alerter.alertFromSWS($scope.tr("hosting_tab_FREEDOM_error"), err, $scope.alerts.dashboard);
        }).finally(() => {
            if (_.isEmpty(self.freedomIds)) {
                self.loaders.freedoms = false;
            }
        });
    };

    self.transformItem = (item) => HostingFreedom.getFreedom($stateParams.productId, { domain: item });

    self.onTransformItemDone = () => {
        self.loaders.freedoms = false;
    };

    $scope.$watch(() => self.filter.status, () => {
        self.refreshTableFreedoms();
    });

    self.setSelectedProduct = (domain) => {
        $rootScope.$broadcast("leftNavigation.selectProduct.fromName", {
            name: domain,
            type: "DOMAIN"
        });
    };

    $rootScope.$on("hosting.web.freedom.delete", () => self.refreshTableFreedoms(true));

    init();
});
