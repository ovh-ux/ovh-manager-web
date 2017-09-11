angular.module("filters").filter("orderObjectBy", () => {
    "use strict";

    return function (arr, prop) {
        _.each(arr, (item, key) => {
            item.key = key;
        });

        return _.sortBy(arr, prop);
    };
});
