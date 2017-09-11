angular.module("directives").directive("cronEditor", () => {
    "use strict";
    return {
        restrict: "E",
        replace: true,
        scope: {
            crontabObject: "="
        },
        templateUrl: "components/cron/cronEdit.html",
        controller: "cronEditorCtrl"
    };
});
