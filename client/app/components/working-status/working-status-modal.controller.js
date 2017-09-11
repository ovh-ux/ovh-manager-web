angular.module("App").controller("WorkingStatusModal", [
    "$scope",
    function ($scope) {
        "use strict";

        $scope.works = $scope.currentActionData;
    }
]);
