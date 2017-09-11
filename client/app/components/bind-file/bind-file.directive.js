{
    const bindFile = () => {
        "use strict";

        const directive = {
            scope: {
                bindFile: "=",
                onFileChange: "="
            },
            link,
            restrict: "A"
        };

        return directive;

        function link (scope, element) {
            element.bind("change", (changeEvent) => {
                scope.$apply(() => {
                    scope.bindFile = {
                        meta: changeEvent.target.files[0]
                    };
                });

                if (scope.onFileChange != null) {
                    scope.onFileChange();
                }
            });
        }
    };

    angular
        .module("directives")
        .directive("bindFile", bindFile);
}
