angular.module("App").controller("HostingDomainAttachOrOrderCtrl", [
    "$scope",
    "$rootScope",
    "$window",

    function ($scope, $rootScope, $window) {
        "use strict";

        $scope.model = {
            actions: {
                ORDER: "ORDER",
                ATTACH: "ATTACH"
            }
        };

        $scope.selected = {
            action: null
        };

        $scope.submit = () => {
            switch ($scope.selected.action) {
            case $scope.model.actions.ORDER:
                $window.open($scope.urlDomainOrder);
                $scope.resetAction();
                break;
            case $scope.model.actions.ATTACH:
                $scope.setAction("multisite/add/hosting-multisite-add", { domains: $scope.domains });
                break;
            default:
                break;
            }
        };
    }
]);
