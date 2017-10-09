angular.module("App").config(($stateProvider) => {
    "use strict";

    $stateProvider.state("web.email", {
        url: "/configuration/email-",
        "abstract": true,
        template: "<div ui-view></div>"
    });

    $stateProvider.state("web.email.domain", {
        url: "domain/:productId?tab",
        templateUrl: "email-domain/email-domain.html",
        controller: "EmailDomainCtrl",
        controllerAs: "ctrlEmailDomain",
        reloadOnSearch: false,
        resolve: {
            currentSection: () => "email_domain",
            navigationInformations: [
                "Navigator",
                "$rootScope",
                (Navigator, $rootScope) => {
                    $rootScope.currentSectionInformation = "email_domain";
                    return Navigator.setNavigationInformation({
                        leftMenuVisible: true,
                        configurationSelected: true
                    });
                }
            ],
            translator: ["translator", (translator) => translator.load(["email", "mailing_list"]).then(() => translator)]
        }
    });

    $stateProvider.state("web.email.delegate", {
        url: "delegate/:productId?tab",
        templateUrl: "email-domain/delegate/email-domain-delegate.html",
        controller: "EmailDelegateCtrl",
        controllerAs: "ctrlEmailDelegate",
        reloadOnSearch: false,
        resolve: {
            currentSection: () => "email_delegate",
            navigationInformations: [
                "Navigator",
                "$rootScope",
                (Navigator, $rootScope) => {
                    $rootScope.currentSectionInformation = "email_delegate";
                    return Navigator.setNavigationInformation({
                        leftMenuVisible: true,
                        configurationSelected: true
                    });
                }
            ],
            translator: ["translator", (translator) => translator.load(["email"]).then(() => translator)]
        }
    });

    $stateProvider.state("web.mx-plan", {
        url: "/configuration/mx_plan",
        templateUrl: "email-domain/order/email-domain-order.html",
        controller: "MXPlanOrderCtrl",
        controllerAs: "ctrlMXPlanOrder",
        resolve: {
            navigationInformations: [
                "Navigator",
                "$rootScope",
                (Navigator, $rootScope) => {
                    $rootScope.currentSectionInformation = "mxPlan";
                    return Navigator.setNavigationInformation({
                        leftMenuVisible: true,
                        configurationSelected: true
                    });
                }
            ],
            translator: ["translator", (translator) => translator.load(["mxPlan"]).then(() => translator)]
        }
    });
});
