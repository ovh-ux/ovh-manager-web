angular.module("directives").directive("cronExpertHelp", () => {
    "use strict";
    return {
        restrict: "E",
        replace: true,
        templateUrl: "components/cron/cronExpertHelp.html"
    };
});
