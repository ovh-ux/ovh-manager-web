/**
 * Return first X characters of any string and add
 * tail if needed.
 */
angular.module("filters").filter("wrapOverflow", () => function (value, max, tail) {
    "use strict";
    if (!value) { return ""; }

    const relativeMax = parseInt(max, 10);
    if (!relativeMax) { return value; }
    if (value.length <= relativeMax) { return value; }

    return value.substr(0, relativeMax) + (tail || "…");
});
