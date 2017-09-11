/* global angular*/
angular.module("App").service("HostingAutomatedEmails", function (constants, $q, OvhHttp) {
    "use strict";

    const cache = {
        email: "UNIVERS_WEB_AUTOMATED_EMAILS"
    };

    this.getAutomatedEmails = function (serviceName) {
        return OvhHttp.get("/hosting/web/{serviceName}/email", {
            rootPath: "apiv6",
            urlParams: {
                serviceName
            }
        });
    };

    this.putEmail = function (serviceName, email) {
        return OvhHttp.put("/hosting/web/{serviceName}/email", {
            rootPath: "apiv6",
            clearAllCache: cache.email,
            urlParams: {
                serviceName
            },
            data: {
                email
            },
            broadcast: "hosting.automatedEmails.request.changed"
        });
    };

    this.postRequest = function (serviceName, action) {
        return OvhHttp.post("/hosting/web/{serviceName}/email/request", {
            rootPath: "apiv6",
            clearAllCache: cache.email,
            urlParams: {
                serviceName
            },
            data: {
                action
            },
            broadcast: "hosting.automatedEmails.request.changed"
        });
    };

    this.getBounces = function (serviceName, opts) {
        return OvhHttp.get("/hosting/web/{serviceName}/email/bounces", {
            rootPath: "apiv6",
            urlParams: {
                serviceName
            },
            params: {
                limit: opts.limit
            },
            returnSuccessKey: ""
        });
    };

    this.getVolumes = function (serviceName) {
        return OvhHttp.get("/hosting/web/{serviceName}/email/volumes", {
            rootPath: "apiv6",
            urlParams: {
                serviceName
            },
            returnSuccessKey: ""
        });
    };
});
