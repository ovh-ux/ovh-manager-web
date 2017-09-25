angular.module("App").config(($stateProvider) => {
    "use strict";

    $stateProvider.state("web.website", {
        url: "/website/configuration",
        templateUrl: "website/configuration.html",
        controller: "WebSiteConfigurationCtrl",
        controllerAs: "webSiteConfigurationCtrl",
        reloadOnSearch: false,
        resolve: {
            navigationInformations: [
                "Navigator",
                "$rootScope",
                (Navigator, $rootScope) => {
                    $rootScope.currentSectionInformation = "website";
                    return Navigator.setNavigationInformation({
                        leftMenuVisible: true,
                        configurationSelected: true
                    });
                }
            ],
            translator: ["translator", (translator) => translator.load(["domain", "hosting", "website"]).then(() => translator)],
            currentSection: () => "website"
        }
    });

    $stateProvider.state("web.website-success", {
        url: "/website/configuration/:domain/:hosting/success/:type",
        templateUrl: "website/success/success.html",
        controller: "WebSiteSuccessCtrl",
        controllerAs: "webSiteSuccessCtrl",
        reloadOnSearch: false,
        resolve: {
            navigationInformations: [
                "Navigator",
                "$rootScope",
                (Navigator, $rootScope) => {
                    $rootScope.currentSectionInformation = "website";
                    return Navigator.setNavigationInformation({
                        leftMenuVisible: true,
                        configurationSelected: true
                    });
                }
            ],
            translator: ["translator", (translator) => translator.load(["domain", "hosting", "website"]).then(() => translator)],
            currentSection: () => "website"
        }
    });
});
