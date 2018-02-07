angular.module("App")
    .controller("SessionCtrl", ($scope, $document, translator, SessionService) => {
        "use strict";

        $scope.$watch("i18n.global_app_title", () => {
            translator.setTitle($scope.tr("global_app_title"));
        });

        // FIX for /me/alerts
        $scope.$on("Navigator.navigationInformationsChange", (e, data) => {
            $scope.isLeftMenuVisible = data && data.leftMenuVisible;
        });

        // Scroll to anchor id
        $scope.scrollTo = (id) => {
            // Set focus to target
            if (_.isString(id)) {
                $document[0].getElementById(id).focus();
            }
        };

        // Get structure of the navbar
        SessionService.getNavbar()
            .then((navbar) => {
                $scope.navbar = navbar;
                $scope.managerPreloadHide += " manager-preload-hide";
            });
    });
