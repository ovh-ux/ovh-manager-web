angular.module("App").config([
    "$routeProvider",
    function ($routeProvider) {
        "use strict";

        $routeProvider.when("/upload", {
            templateUrl: "components/upload/upload.html",
            resolve: {
                navigationInformations: [
                    "Navigator",
                    (Navigator) =>
                        Navigator.setNavigationInformation({
                            leftMenuVisible: true,
                            configurationSelected: true
                        })
                ]
            }
        });
    }
]);
