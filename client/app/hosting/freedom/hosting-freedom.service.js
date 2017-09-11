angular.module("App").service("HostingFreedom", function (OvhHttp) {
    "use strict";

    const cache = {
        freedoms: "UNIVERS_WEB_FREEDOMS",
        freedom: "UNIVERS_WEB_FREEDOM",
        models: "UNIVERS_WEB_FREEDOM_MODELS"
    };

    this.getFreedoms = (serviceName, opts = {}) =>
        OvhHttp.get("/hosting/web/{serviceName}/freedom", {
            rootPath: "apiv6",
            urlParams: {
                serviceName
            },
            params: opts.params,
            cache: cache.freedoms,
            clearAllCache: opts.forceRefresh
        });

    this.getFreedom = (serviceName, opts) =>
        OvhHttp.get("/hosting/web/{serviceName}/freedom/{domain}", {
            rootPath: "apiv6",
            urlParams: {
                serviceName,
                domain: opts.domain
            },
            cache: cache.freedom
        });

    this.deleteFreedom = (serviceName, domain) =>
        OvhHttp.delete("/hosting/web/{serviceName}/freedom/{domain}", {
            rootPath: "apiv6",
            urlParams: {
                serviceName,
                domain
            },
            clearAllCache: cache.freedom,
            broadcast: "hosting.web.freedom.delete"
        });

    this.getModels = () =>
        OvhHttp.get("/hosting/web.json", {
            rootPath: "apiv6",
            cache: cache.models
        });
});
