angular.module("App").config(($stateProvider) => {
    "use strict";

    $stateProvider.state("app.website", {
        url: "/website/configuration",
        templateUrl: "website/configuration.html",
        controller: "WebSiteConfigurationCtrl",
        controllerAs: "webSiteConfigurationCtrl",
        reloadOnSearch: false,
        translations: ["domain", "hosting", "website"],
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

    $stateProvider.state("app.website-success", {
        url: "/website/configuration/:domain/:hosting/success/:type",
        templateUrl: "website/success/success.html",
        controller: "WebSiteSuccessCtrl",
        controllerAs: "webSiteSuccessCtrl",
        reloadOnSearch: false,
        translations: ["domain", "hosting", "website"],
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
