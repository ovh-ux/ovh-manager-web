angular.module("App").service("HostingOrder", function (Api, constants) {
    "use strict";

    const proxyPass = `${constants.swsProxyRootPath}order/hosting/web`;

    this.getDurations = function (domain, offer, dnsZone) {
        return Api.get(`${proxyPass}/new`, {
            params: {
                dnsZone,
                domain,
                offer
            }
        });
    };

    this.get = function (domain, offer, dnsZone, duration, module) {
        const parameters = {
            domain,
            offer
        };
        if (dnsZone) {
            parameters.dnsZone = dnsZone;
        }
        if (module) {
            parameters.module = module;
        }
        return Api.get(`${proxyPass}/new/{duration}`, {
            urlParams: {
                duration
            },
            params: parameters
        });
    };

    this.post = function (domain, offer, dnsZone, duration, module) {
        const parameters = {
            domain,
            offer
        };
        if (dnsZone) {
            parameters.dnsZone = dnsZone;
        }
        if (module) {
            parameters.module = module;
        }
        return Api.post(`${proxyPass}/new/{duration}`, {
            urlParams: {
                duration
            },
            data: parameters
        });
    };

    this.getModels = function () {
        return Api.get(`${constants.swsProxyRootPath}order.json`).then((data) => data.models);
    };
});
