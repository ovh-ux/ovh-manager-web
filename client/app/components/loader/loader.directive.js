angular.module("directives").directive("loader", () => {
    "use strict";

    return {
        restrict: "C",
        templateUrl: "components/loader/loader.html"
    };
});
