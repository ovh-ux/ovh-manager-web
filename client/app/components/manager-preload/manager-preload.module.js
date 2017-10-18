angular.module("App").run(($rootScope) => {

    $rootScope.$on("$stateChangeSuccess", () => {
        $rootScope.managerPreloadHide += " manager-preload-hide";
    });

});
