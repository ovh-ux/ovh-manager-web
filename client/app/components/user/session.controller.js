angular.module("App").controller("SessionCtrl", [
    "$scope",
    "translator",
    "User",

    function ($scope, translator, User) {
        "use strict";

        $scope.$watch("i18n.global_app_title", () => {
            translator.setTitle($scope.tr("global_app_title"));
        });

        User.getV3Url().then((url) => {
            $scope.v3url = url;
        });

        // FIX for /me/alerts
        $scope.$on("Navigator.navigationInformationsChange", (e, data) => {
            $scope.isLeftMenuVisible = data && data.leftMenuVisible;
        });

        translator.setTitle($scope.tr("global_app_title"));
    }
]);
