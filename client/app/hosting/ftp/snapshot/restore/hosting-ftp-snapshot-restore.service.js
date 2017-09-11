angular.module("services").service("HostingFtp", function (OvhHttp) {
    "use strict";

    /**
    * Get hosting models
    */
    this.getModels = function () {
        return OvhHttp.get("/hosting/web.json", {
            rootPath: "apiv6",
            cache: "HOSTING_MODELS"
        });
    };

    /**
     * Restore a snapshot
     */
    this.restoreSnapshot = function (serviceName, data) {
        return OvhHttp.post("/hosting/web/{serviceName}/restoreSnapshot", {
            rootPath: "apiv6",
            urlParams: {
                serviceName
            },
            data
        });
    };
});
