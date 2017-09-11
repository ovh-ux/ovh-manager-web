angular.module("App").controller("UserLangueCtrl", [
    "$scope",
    "translator",

    function ($scope, translator) {
        "use strict";

        // languages choice
        $scope.selectedLanguage = translator.getSelectedAvailableLanguage();
        $scope.availableLanguages = translator.getAvailableLanguages();

        if (moment && moment.locale && $scope.selectedLanguage.value) {
            moment.locale($scope.selectedLanguage.value.replace(/_/, "-"));
        }

        $scope.setSelectedLanguage = (newLanguage) => {
            $scope.selectedLanguage = newLanguage;
            localStorage.setItem("univers-selected-language", newLanguage.value);
            window.location.reload(false);
        };
    }
]);
