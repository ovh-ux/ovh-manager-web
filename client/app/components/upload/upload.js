angular.module("App").config([
    "$routeProvider",
    "PiwikProvider",
    function ($routeProvider) {
        "use strict";

        $routeProvider.when("/upload", {
            templateUrl: "components/upload/upload.html",
            piwikActionName: "Upload",
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
