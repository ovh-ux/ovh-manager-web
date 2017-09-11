angular.module("services").service("Screenshot", [
    "$http",
    "constants",
    "$cacheFactory",
    function ($http, constants, cache) {
        "use strict";

        const swsScreenshotPath = `${constants.aapiRootPath}sws/screenshot`;
        const screenshotsCache = cache("SCREENSHOTS");

        this.getScreenshot = function (url) {
            return $http
                .get(swsScreenshotPath, {
                    cache: screenshotsCache,
                    params: {
                        url
                    }
                })
                .then((response) => response ? response.data : null);
        };
    }
]);
