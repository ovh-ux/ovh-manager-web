angular.module("App").service("HostingBandwidthOrder", function (OvhHttp) {
    "use strict";

    const cache = {
        durations: "UNIVERS_WEB_ORDER_BANDWIDTH_DURATIONS",
        order: "UNIVERS_WEB_ORDER_BANDWIDTH_ORDER",
        models: "UNIVERS_WEB_ORDER_BANDWIDTH_MODELS"
    };

    this.getDurations = function (serviceName, opts) {
        return OvhHttp.get("/order/hosting/web/{serviceName}/bandwidth", {
            rootPath: "apiv6",
            urlParams: {
                serviceName
            },
            params: {
                traffic: opts.traffic
            },
            cache: cache.durations
        });
    };

    this.getOrder = function (serviceName, opts) {
        return OvhHttp.get("/order/hosting/web/{serviceName}/bandwidth/{duration}", {
            rootPath: "apiv6",
            urlParams: {
                serviceName,
                duration: opts.duration
            },
            params: {
                traffic: opts.traffic
            },
            cache: cache.order
        });
    };

    this.order = function (serviceName, opts) {
        return OvhHttp.post("/order/hosting/web/{serviceName}/bandwidth/{duration}", {
            rootPath: "apiv6",
            urlParams: {
                serviceName,
                duration: opts.duration
            },
            data: {
                traffic: opts.traffic
            }
        });
    };

    this.getModels = function () {
        return OvhHttp.get("/order.json", {
            rootPath: "apiv6",
            cache: cache.models
        });
    };
});
