angular.module("App").config(($stateProvider) => {
    "use strict";

    $stateProvider.state("app.private-database", {
        url: "/configuration/private_database/:productId?tab",
        templateUrl: "private-database/private-database.html",
        controller: "PrivateDatabaseCtrl",
        reloadOnSearch: false,
        translations: ["privateDatabase", "hosting"],
        resolve: {
            navigationInformations: [
                "Navigator",
                "$rootScope",
                (Navigator, $rootScope) => {
                    $rootScope.currentSectionInformation = "private_database";
                    return Navigator.setNavigationInformation({
                        leftMenuVisible: true,
                        configurationSelected: true
                    });
                }
            ],
            translator: ["translator", (translator) => translator.load(["privateDatabase", "hosting"]).then(() => translator)]
        }
    });

    $stateProvider.state("app.private-database-order", {
        url: "/configuration/private_database",
        templateUrl: "private-database/order/private-database-order.html",
        controller: "PrivateDatabaseOrderCtrl",
        translations: ["privateDatabase"],
        resolve: {
            navigationInformations: [
                "Navigator",
                "$rootScope",
                (Navigator, $rootScope) => {
                    $rootScope.currentSectionInformation = "private_database";
                    return Navigator.setNavigationInformation({
                        leftMenuVisible: true,
                        configurationSelected: true
                    });
                }
            ],
            translator: ["translator", (translator) => translator.load(["privateDatabase"]).then(() => translator)]
        }
    });

    $stateProvider.state("app.sql-order", {
        url: "/configuration/sql_order?orderType&currentHosting",
        params: {
            currentHosting: { value: null, squash: true },
            orderType: { value: "private" }
        },
        templateUrl: "private-database/order/sql-database-order.html",
        controller: "SqlDatabaseOrderCtrl",
        translations: ["privateDatabase"],
        resolve: {
            navigationInformations: [
                "Navigator",
                "$rootScope",
                (Navigator, $rootScope) => {
                    $rootScope.currentSectionInformation = "private_database";
                    return Navigator.setNavigationInformation({
                        leftMenuVisible: true,
                        configurationSelected: true
                    });
                }
            ],
            translator: ["translator", (translator) => translator.load(["privateDatabase"]).then(() => translator)]
        }
    });
});
