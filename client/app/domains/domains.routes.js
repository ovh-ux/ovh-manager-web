angular.module("App").config(($stateProvider) => {
    "use strict";

    $stateProvider.state("web.domain.all", {
        url: "/configuration/domains",
        templateUrl: "domains/domains.html",
        controller: "DomainsCtrl",
        controllerAs: "ctrlDomains",
        piwikActionName: "Domains configuration",
        resolve: {
            navigationInformations: [
                "Navigator",
                "$rootScope",
                (Navigator, $rootScope) => {
                    $rootScope.currentSectionInformation = "domains";
                    return Navigator.setNavigationInformation({
                        leftMenuVisible: true,
                        configurationSelected: true
                    });
                }
            ],
            translator: ["translator", (translator) => translator.load(["domain", "domains"]).then(() => translator)]
        }
    });
});
