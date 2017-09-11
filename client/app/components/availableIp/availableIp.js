angular.module("directives").directive("availableIps", () => {
    "use strict";
    return {
        restrict: "A",
        replace: true,
        scope: {
            nbIps: "=",
            maxIps: "="
        },
        template:
            '<div class="availableIp" style="display:inline">' +
            '<i class="availableIp-breadcrumb" data-ng-repeat="fakeIp in fakeIps" data-ng-class="{active: $index+1 <= nbIps, inactive:$index+1 > nbIps}"></i>' +
            '<span class="availableIp-number">{{nbIps}}/{{maxIps}}</span>' +
            "</div>",
        link ($scope) {
            $scope.fakeIps = [];

            $scope.$watch("maxIps", (maxIps) => {
                if (maxIps !== undefined) {
                    let i = maxIps;

                    for (i; i--;) {
                        $scope.fakeIps.push(i);
                    }
                }
            });
        }
    };
});
