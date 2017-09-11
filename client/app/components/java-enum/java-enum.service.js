angular.module("services").service("JavaEnum", [
    function () {
        "use strict";

        this.tr = function (enumValue) {
            return _.snakeCase(enumValue).toUpperCase();
        };
    }
]);
