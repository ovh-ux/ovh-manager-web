angular.module("App").config(($stateProvider) => {
    "use strict";

    $stateProvider.state("app.domain.operation", {
        url: "/configuration/domains_operations",
        templateUrl: "domain-operation/domain-operation.html",
        controller: "DomainOperationCtrl",
        controllerAs: "ctrlOperations",
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

    $stateProvider.state("app.domain.operation-progress", {
        url: "/configuration/domain_operation/progress/:operationId",
        templateUrl: "domain-operation/progress/domain-operation-progress.html",
        controller: "DomainOperationProgressCtrl",
        controllerAs: "ctrlDomainOperationProgress",
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
