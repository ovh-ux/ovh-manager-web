angular.module("directives").directive("paginatedTable", [
    "$http",
    function ($http) {
        "use strict";
        return {
            restrict: "A",
            scope: true,
            templateUrl: "components/paginatedTable/paginatedTable.html",
            link ($scope, $elem, $attr) {
                $scope.getPaginatedTableStuff = function () {
                    return $scope[$attr.paginatedTablePaginatedStuff];
                };

                $scope.getPaginatedTableLoading = function () {
                    return $scope[$attr.paginatedTableTableLoading];
                };

                if ($attr.paginatedTableTitles) {
                    $scope.paginatedTableTitles = $scope.$eval($attr.paginatedTableTitles);
                }

                if ($attr.paginatedTableLineTemplate) {
                    $scope.paginatedTableLineTemplate = $scope.$eval($attr.paginatedTableLineTemplate);
                    $http.get($scope.paginatedTableLineTemplate).then((template) => {
                        $scope.lineTemplate = $("<div/>").html(template);
                    });
                }

                if ($attr.paginatedTableEmptyLabel) {
                    $scope.paginatedTableEmptyLabel = $scope.$eval($attr.paginatedTableEmptyLabel);
                }

                if ($attr.paginatedTableClass) {
                    $scope.paginatedTableClass = $attr.paginatedTableClass;
                }
            }
        };
    }
]);
