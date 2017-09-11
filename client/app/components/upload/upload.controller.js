angular.module("App").controller("UploadCtrl", [
    "$scope",

    function ($scope) {
        "use strict";

        $scope.xsrf = $.cookie("XSRF-TOKEN");
        const csidRegExp = new RegExp(/(.+\.html).*(\?|&)csid=([A-Za-z0-9]*).*/);
        const csid = window.location.href.match(csidRegExp) ? window.location.href.replace(csidRegExp, "$3") : null;
        $scope.xcsid = csid;

        $scope.uploadComplete = function (content, completed) {
            if (completed && !!content.length) {
                $scope.serverResponse = content;
            } else {
                $scope.serverResponse = "Rien du tout";
            }
        };
    }
]);
