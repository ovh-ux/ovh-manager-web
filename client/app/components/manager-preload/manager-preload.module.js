angular.module("App").run(($rootScope, $state) => {

    $rootScope.$on("$stateChangeSuccess", () => {
        if (!$state.includes("app")) {
            $rootScope.managerPreloadHide += " manager-preload-hide";
        }
    });

});
