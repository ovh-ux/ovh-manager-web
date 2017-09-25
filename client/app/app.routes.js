angular.module("App").config(($stateProvider) => {
    "use strict";

    $stateProvider.state("web", {
        "abstract": true,
        url: "",
        controller: "AppCtrl",
        controllerAs: "AppCtrl",
        templateUrl: "app.html"
    });

    $stateProvider.state("web.microsoft", {
        "abstract": true,
        template: "<div ui-view></div>"
    });
});
