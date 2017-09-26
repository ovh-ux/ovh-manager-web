angular.module("App").run(($rootScope, $state) => {

    $rootScope.$on("$stateChangeSuccess", () => {
        if (!$state.includes("web")) {
            $rootScope.managerPreloadHide += " manager-preload-hide";
        }
    });

});
