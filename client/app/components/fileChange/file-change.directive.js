angular
    .module("directives")
    .directive("fileChange", () => ({
        require: "ngModel",
        restrict: "A",
        link: function postLink (scope, elem, attrs, ngModel) {
            elem.on("change", () => {
                ngModel.$setViewValue(elem[0].files);
            });
        }
    }));
