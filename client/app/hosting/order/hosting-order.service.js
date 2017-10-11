angular.module("services").service(
    "HostingOrder",
    class HostingOrder {
        /**
         * Constructor
         * @param Api
         * @param constants
         */
        constructor (Api, constants) {
            this.Api = Api;
            this.constants = constants;
            this.proxyPass = `${constants.swsProxyRootPath}order/hosting/web`;
        }

        getDurations (domain, offer, dnsZone) {
            return this.Api.get(`${this.proxyPass}/new`, {
                params: {
                    dnsZone,
                    domain,
                    offer
                }
            });
        }

        get (domain, offer, dnsZone, duration, module) {
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
            return this.Api.get(`${this.proxyPass}/new/${duration}`, {
                params: parameters
            });
        }

        post (domain, offer, dnsZone, duration, module) {
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
            return this.Api.post(`${this.proxyPass}/new/${duration}`, {
                data: parameters
            });
        }

        getModels () {
            return this.Api.get(`${this.constants.swsProxyRootPath}order.json`)
                .then((data) => data.models);
        }
    }
);
