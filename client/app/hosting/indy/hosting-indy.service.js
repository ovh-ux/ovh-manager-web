angular.module("App").service("HostingIndy", function (constants, OvhHttp) {
    "use strict";

    const cache = {
        indys: "UNIVERS_WEB_INDYS",
        indy: "UNIVERS_WEB_INDY"
    };

    this.getIndys = function (serviceName, opts = {}) {
        return OvhHttp.get("/hosting/web/{serviceName}/indy", {
            rootPath: "apiv6",
            urlParams: {
                serviceName
            },
            params: opts.params,
            cache: cache.indys,
            clearAllCache: opts.forceRefresh
        });
    };

    this.getIndy = function (serviceName, opts) {
        return OvhHttp.get("/hosting/web/{serviceName}/indy/{login}", {
            rootPath: "apiv6",
            urlParams: {
                serviceName,
                login: opts.login
            },
            cache: cache.indy
        });
    };
});
