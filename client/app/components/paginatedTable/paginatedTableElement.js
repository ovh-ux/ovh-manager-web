angular.module("directives").directive("paginatedTableElement", [
    "$compile",
    function ($compile) {
        "use strict";
        return {
            restrict: "A",
            scope: false,
            compile () {
                return {
                    post ($scope, $elem) {
                        $scope.$watch("lineTemplate", () => {
                            if ($scope.lineTemplate) {
                                const elementToAppend = $scope.lineTemplate.find("*[data-paginated-table-cell], *[paginated-table-cell]").clone().get($scope.$index);
                                if (elementToAppend) {
                                    $compile(elementToAppend)($scope, (clonedElement) => {
                                        $elem.append(clonedElement);
                                    });
                                }
                            }
                        });
                    }
                };
            }
        };
    }
]);
