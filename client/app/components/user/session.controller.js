angular.module("App").controller("SessionCtrl", [
    "$scope",
    "translator",
    "User",

    function ($scope, translator) {
        "use strict";

        $scope.accountInfo = {
            activated: false
        };
        $scope.loader = {
            accountInfo: false
        };

        $scope.selectedLanguage = translator.getSelectedAvailableLanguage();

        // languages choice
        $scope.availableLanguages = translator.getAvailableLanguages();
        $scope.$watch("selectedLanguage", (newLanguage) => {
            $scope.updateSelectedLanguage(newLanguage);
        });

        $scope.$watch("i18n.global_app_title", () => {
            translator.setTitle($scope.tr("global_app_title"));
        });

        $scope.updateSelectedLanguage = function (newLanguage) {
            $scope.selectedLanguage = newLanguage;
            translator.setLanguage(newLanguage.value);
            translator.setTitle($scope.tr("global_app_title"));
        };

        // FIX for /me/alerts
        $scope.$on("Navigator.navigationInformationsChange", (e, data) => {
            $scope.isLeftMenuVisible = data && data.leftMenuVisible;
        });

        translator.setTitle($scope.tr("global_app_title"));
    }
]);
