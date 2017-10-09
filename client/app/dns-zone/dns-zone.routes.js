angular.module("App").config(($stateProvider) => {
    "use strict";

    $stateProvider.state("web.domain.dns-zone", {
        url: "/configuration/zone/:productId?tab",
        templateUrl: "dns-zone/dns-zone.html",
        controller: "DnsZoneCtrl",
        controllerAs: "ctrlDomain",
        reloadOnSearch: false,
        params: {
            tab: null
        },
        resolve: {
            currentSection: () => "zone",
            navigationInformations: [
                "Navigator",
                "$rootScope",
                (Navigator, $rootScope) => {
                    $rootScope.currentSectionInformation = "zone";
                    return Navigator.setNavigationInformation({
                        leftMenuVisible: true,
                        configurationSelected: true
                    });
                }
            ],
            translator: ["translator", (translator) => translator.load(["domain"]).then(() => translator)]
        }
    });

    $stateProvider.state("web.dns-zone-new", {
        url: "/configuration/new_dns_zone",
        templateUrl: "dns-zone/new/dns-zone-new.html",
        controller: "newDnsZoneCtrl",
        controllerAs: "ctrlNewDnsZone",
        resolve: {
            navigationInformations: [
                "Navigator",
                "$rootScope",
                (Navigator, $rootScope) => {
                    $rootScope.currentSectionInformation = "newDnsZone";
                    return Navigator.setNavigationInformation({
                        leftMenuVisible: true,
                        configurationSelected: true
                    });
                }
            ],
            translator: ["translator", (translator) => translator.load(["domains"]).then(() => translator)]
        }
    });
});
