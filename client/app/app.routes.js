angular.module("App").config(($stateProvider) => {
    "use strict";

    $stateProvider.state("app", {
        "abstract": true,
        url: "",
        controller: "AppCtrl",
        controllerAs: "AppCtrl",
        templateUrl: "app.html",
        translations: ["core"]
    });

    $stateProvider.state("app.microsoft", {
        "abstract": true,
        template: "<div ui-view></div>"
    });
});
