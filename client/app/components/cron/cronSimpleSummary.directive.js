angular.module("directives").directive("cronSimpleSummary", () => {
    "use strict";
    return {
        restrict: "E",
        replace: true,
        scope: {
            crontabObject: "="
        },
        templateUrl: "components/cron/cronSimpleSummary.html",
        controller: "cronSimpleSummaryCtrl"
    };
});
