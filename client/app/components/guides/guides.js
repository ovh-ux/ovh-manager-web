angular.module("directives").directive("guides", [
    "User",
    function (User) {
        "use strict";

        return {
            restrict: "A",
            templateUrl: "components/guides/guides.html",
            scope: {
                guidesTitle: "=",
                guidesList: "=",
                tr: "="
            },
            controller: [
                "$scope",
                function ($scope) {
                    $scope.showGuidesStatus = [];
                    $scope.showGuidesStatus[0] = false;
                    $scope.guidesListDocuments = [];

                    $scope.toggleGuides = function (index) {
                        $scope.showGuidesStatus[index] = !$scope.showGuidesStatus[index];

                        for (let i = 0; i < $scope.showGuidesStatus.length; i++) {
                            if (i !== index) {
                                $scope.showGuidesStatus[i] = false;
                            }
                        }
                    };

                    User.getUrlOf("OVHGuides").then((guides) => {
                        if (guides && guides[$scope.guidesList]) {
                            $scope.guideConfiguration = guides[$scope.guidesList];
                        }
                    });
                }
            ]
        };
    }
]);
