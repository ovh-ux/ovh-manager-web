angular.module("App").config(($stateProvider) => {
    "use strict";

    $stateProvider.state("web.configuration", {
        url: "/configuration",
        templateUrl: "configuration/configuration.html",
        controller: "ConfigurationCtrl",
        controllerAs: "ConfigurationCtrl",
        piwikActionName: "Configuration",
        resolve: {
            navigationInformations: [
                "Navigator",
                "$rootScope",
                (Navigator, $rootScope) => {
                    $rootScope.currentSectionInformation = "";
                    return Navigator.setNavigationInformation({
                        leftMenuVisible: true,
                        configurationSelected: true
                    });
                }
            ]
        }
    });
});
