angular.module("App").controller("HostingIndyTabCtrl", function ($scope, $location, $stateParams, HostingIndy, Alerter) {
    "use strict";

    const self = this;

    self.filter = {
        login: ""
    };

    self.loaders = {
        indys: false
    };

    //---------------------------------------------
    // INDYS
    //---------------------------------------------
    self.refreshTableIndys = function (forceRefresh = false) {
        self.loaders.indys = true;
        self.indyIds = null;

        let params = {};
        if (self.filter.login) {
            params = { login: ["%", self.filter.login, "%"].join("") };
        }

        HostingIndy.getIndys($stateParams.productId, {
            params,
            forceRefresh
        }).then((ids) => {
            self.indyIds = ids;
        }).catch((err) => {
            Alerter.alertFromSWS($scope.tr("hosting_tab_INDY_error"), err, $scope.alerts.dashboard);
        }).finally(() => {
            if (_.isEmpty(self.indyIds)) {
                self.loaders.indys = false;
            }
        });
    };

    self.transformItem = function (item) {
        return HostingIndy.getIndy($stateParams.productId, { login: item });
    };

    self.onTransformItemDone = function () {
        self.loaders.indys = false;
    };

    self.selectAttachedDomain = function (domain) {
        $location.search("domain", domain);
        $scope.setSelectedTab("DOMAINS");
    };

    $scope.$watch(() => self.filter.login, () => {
        self.refreshTableIndys();
    });
});
