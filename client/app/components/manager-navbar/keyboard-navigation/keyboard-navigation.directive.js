angular.module("App")
    .directive("keyboardNavigation", (KeyboardNavigationService) => {
        "use strict";

        return {
            restrict: "A",
            scope: {
                groupName: "@keyboardNavigation",
                isLast: "<?"
            },
            link: (scope, element, attrs) => {
                KeyboardNavigationService.addItemToGroup(element[0], scope.groupName);

                // Bind items when it's the last item
                if (scope.isLast) {
                    KeyboardNavigationService.bindGroup(scope.groupName);
                }

                // Observe if is open to set the guard focus
                if (angular.isDefined(attrs.ariaExpanded)) {
                    attrs.$observe("ariaExpanded", (isOpen) => {
                        KeyboardNavigationService.toggleGroup(scope.groupName, isOpen);
                    });
                }
            }
        };
    });
