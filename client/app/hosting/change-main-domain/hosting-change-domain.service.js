angular.module("App").service("hostingChangeDomain", function (OvhHttp) {
    "use strict";

    this.getAllowedDurations = function (serviceName, opts) {
        return OvhHttp.get("/order/hosting/web/{serviceName}/changeMainDomain", {
            rootPath: "apiv6",
            urlParams: {
                serviceName
            },
            params: {
                domain: opts.domain,
                mxplan: opts.mxplan
            }
        });
    };

    this.get = function (serviceName, opts) {
        return OvhHttp.get("/order/hosting/web/{serviceName}/changeMainDomain/{duration}", {
            rootPath: "apiv6",
            urlParams: {
                serviceName,
                duration: opts.duration
            },
            params: {
                domain: opts.domain,
                mxplan: opts.mxplan
            }
        });
    };

    this.post = function (serviceName, opts) {
        return OvhHttp.post("/order/hosting/web/{serviceName}/changeMainDomain/{duration}", {
            rootPath: "apiv6",
            urlParams: {
                serviceName,
                duration: opts.duration
            },
            data: {
                domain: opts.domain,
                mxplan: opts.mxplan
            }
        });
    };

    this.getModels = function () {
        return OvhHttp.get("/order.json", {
            rootPath: "apiv6"
        }).then((data) => data.models);
    };
});
