angular.module("directives").directive("ovhFilereader", [
    "$timeout",
    function ($timeout) {
        "use strict";

        return {
            restrict: "A",
            scope: {
                ovhFilereaderAction: "&",
                ovhFilereaderReplace: "=?",
                ovhDisableReader: "=?",
                ngModel: "="
            },
            link: ($scope, element) => {
                $(element).addClass("ovh-filereader");

                function onLoadEvent (event) {
                    $scope.$apply(() => {
                        const result = event.target.result ? event.target.result.replace(/[,;]/g, " ").trim() : "";

                        if ($scope.ovhDisableReader) {
                            $scope.ngModel = element[0].files[0];
                        } else {
                            $scope.ngModel += ($scope.ngModel.length ? " " : "") + result;
                        }

                        if ($scope.ovhFilereaderAction) {
                            $timeout(() => {
                                $scope.ovhFilereaderAction();
                            }, 0);
                        }
                    });
                }

                element.on("change", (onChangeEvent) => {
                    if ($scope.ovhFilereaderReplace || !$scope.ovhFilereader) {
                        $scope.ovhFilereader = "";
                    }

                    const reader = new FileReader();
                    reader.onload = onLoadEvent;

                    if ((onChangeEvent.srcElement || onChangeEvent.target).files[0]) {
                        reader.readAsText((onChangeEvent.srcElement || onChangeEvent.target).files[0]);
                    } else {
                        $scope.ngModel = "";
                    }
                });

                $scope.$watch("ngModel", () => {
                    if ($scope.ngModel === null) {
                        element.val(null);
                    }
                });
            }
        };
    }
]);
