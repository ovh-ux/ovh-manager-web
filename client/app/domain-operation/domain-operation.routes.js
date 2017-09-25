angular.module("App").config(($stateProvider) => {
    "use strict";

    $stateProvider.state("web.domain.operation", {
        url: "/configuration/domains_operations",
        templateUrl: "domain-operation/domain-operation.html",
        controller: "DomainOperationCtrl",
        controllerAs: "ctrlOperations",
        piwikActionName: "Domains operations",
        resolve: {
            navigationInformations: [
                "Navigator",
                "$rootScope",
                (Navigator, $rootScope) => {
                    $rootScope.currentSectionInformation = "domainsOperations";
                    return Navigator.setNavigationInformation({
                        leftMenuVisible: true,
                        configurationSelected: true
                    });
                }
            ],
            translator: ["translator", (translator) => translator.load(["domain", "domainsOperations"]).then(() => translator)]
        }
    });

    $stateProvider.state("web.domain.operation-progress", {
        url: "/configuration/domain_operation/progress/:operationId",
        templateUrl: "domain-operation/progress/domain-operation-progress.html",
        controller: "DomainOperationProgressCtrl",
        controllerAs: "ctrlDomainOperationProgress",
        piwikActionName: "Domain transfert Progression",
        resolve: {
            navigationInformations: [
                "Navigator",
                "$rootScope",
                (Navigator, $rootScope) => {
                    $rootScope.currentSectionInformation = "domainsOperations";
                    return Navigator.setNavigationInformation({
                        leftMenuVisible: true,
                        configurationSelected: true
                    });
                }
            ],
            translator: ["translator", (translator) => translator.load(["domain", "domainsOperations"]).then(() => translator)]
        }
    });
});
