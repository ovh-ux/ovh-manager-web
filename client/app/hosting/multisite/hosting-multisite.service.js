angular.module("services").service("HostingDomain", function ($rootScope, $http, $q, Products, constants, Hosting, Poll, OvhHttp) {
    "use strict";

    const aapiHostingPath = `${constants.aapiRootPath}hosting/web`;

    /*
     * Delete domain of domains tab
     */
    this.removeDomain = function (serviceName, domain, wwwNeeded, autoconfigure) {
        return OvhHttp.delete("/sws/hosting/web/{serviceName}/domains-delete", {
            rootPath: "2api",
            urlParams: {
                serviceName
            },
            params: {
                domain,
                wwwNeeded,
                autoconfigure
            }
        }).then((response) => {
            if (response.state !== "ERROR") {
                this.getTaskIds({ fn: "web/detachDomain" }, serviceName).then((taskIds) => {
                    this.pollRequest({
                        serviceName,
                        taskIds,
                        namespace: "detachDomain"
                    });
                });
            }
            Hosting.resetDomains();
            this.getTaskIds({ fn: "attachedDomain/delete" }, serviceName).then((taskIds) => {
                this.pollRequest({
                    serviceName,
                    taskIds,
                    namespace: "modifyDomain"
                });
            });
        });
    };

    /*
     * Add domain of domains tab
     */
    this.addDomain = function (baseDomain, domain, home, wwwNeeded, ipv6Needed, autoconfigure, cdn, countryIp, firewall, ownLog, ssl, hostingServiceName) {
        return $http
            .put([aapiHostingPath, hostingServiceName, "domains"].join("/"), {
                baseDomain,
                domainName: domain,
                home,
                wwwNeeded,
                ipv6Needed,
                autoconfigure,
                cdn: cdn.toLowerCase(),
                countryIp,
                firewallNeeded: firewall.toLowerCase(),
                ownLog,
                ssl
            })
            .then((response) => {
                Hosting.resetDomains();
                this.getTaskIds({ fn: "attachedDomain/create" }, hostingServiceName).then((taskIds) => {
                    this.pollRequest({ serviceName: hostingServiceName, taskIds, namespace: "modifyDomain" });
                });
                return response.data;
            });
    };

    this.modifyDomain = function (domain, home, wwwNeeded, ipv6Needed, autoconfigure, cdn, countryIp, firewall, ownLog, ssl, hostingServiceName) {
        return this.getZoneLinked(domain)
            .then((urlSplitted) => {
                let baseDomain;
                let domainName;

                if (urlSplitted.zone) {
                    baseDomain = urlSplitted.zone;
                    domainName = urlSplitted.subDomain;
                } else {
                    baseDomain = domain;
                    domainName = null;
                }

                return this.addDomain(baseDomain, domainName, home, wwwNeeded, ipv6Needed, !!urlSplitted.zone, cdn.toLowerCase(), countryIp, firewall.toLowerCase(), ownLog, ssl, hostingServiceName);
            })
            .then((response) => {
                Hosting.resetDomains();
                this.getTaskIds({ fn: "attachedDomain/update" }, hostingServiceName).then((taskIds) => {
                    this.pollRequest({ serviceName: hostingServiceName, taskIds, namespace: "modifyDomain" });
                });
                return response.data;
            });
    };

    this.getExistingDomains = function (serviceName, tokenNeeded) {
        return OvhHttp.get("/sws/hosting/web/{serviceName}/add-domain-existing", {
            rootPath: "2api",
            urlParams: {
                serviceName
            },
            params: {
                tokenNeeded
            }
        });
    };

    this.getExistingConfiguration = function (serviceName, domain, subDomain, wwwNeeded) {
        return $http
            .get([aapiHostingPath, serviceName, "domains", domain, "configuration"].join("/"), {
                params: {
                    domainName: subDomain,
                    wwwNeeded
                }
            })
            .then((response) => response.data);
    };

    this.getCapabilities = function (offer) {
        return OvhHttp.get("/hosting/web/offerCapabilities", {
            rootPath: "apiv6",
            params: {
                offer: _.camelCase(offer).toLowerCase()
            },
            cache: "hosting.web.capabilities"
        });
    };

    this.getAddDomainOptions = function () {
        return OvhHttp.get("/domain/zone", {
            rootPath: "apiv6"
        }).then((zones) => {
            const zonesJava = zones.map((zone) => ({
                displayName: zone,
                formattedName: zone,
                name: zone
            }));

            return {
                availableDomains: zonesJava
            };
        });
    };

    this.getTaskIds = function (opts, hostingServiceName) {
        const fn = opts.fn || "";
        return $http
            .get(["apiv6/hosting/web", hostingServiceName, "tasks"].join("/"), {
                params: {
                    "function": fn
                }
            })
            .then((response) => response.data);
    };

    /**
     * Poll request
     */
    this.pollRequest = function (opts) {
        if (!angular.isArray(opts.taskIds) || opts.taskIds.length <= 0) {
            $rootScope.$broadcast(["hostingDomain", opts.namespace, "done"].join("."));
        } else {
            opts.taskIds.forEach((taskId) => {
                $rootScope.$broadcast(["hostingDomain", opts.namespace, "start"].join("."), opts);

                Poll.poll(["apiv6/hosting/web", opts.serviceName, "tasks", taskId].join("/"), null, {
                    successRule: { state: "done" },
                    namespace: "hostingDomain.request"
                }).then((task) => $rootScope.$broadcast(["hostingDomain", opts.namespace, "done"].join("."), task), (err) => $rootScope.$broadcast(["hostingDomain", opts.namespace, "error"].join("."), err));
            });
        }
    };

    this.killAllPolling = function () {
        angular.forEach(["detachDomain", "attachDomain", "modifyDomain"], (action) => {
            Poll.kill({ namespace: `hostingDomain.${action}` });
        });
    };

    /**
     * Records
     */
    this.getRecords = function (domain, subDomain, type) {
        return OvhHttp.get(["domain", domain, "record"].join("/"), {
            params: {
                subdomain: subDomain,
                fieldType: type
            }
        }).then((response) => response.data);
    };

    this.getZones = function () {
        return OvhHttp.get("/domain/zone", {
            rootPath: "apiv6"
        });
    };

    this.getZoneLinked = function (url) {
        const zoneAssociated = {};

        return this.getZones().then((zones) => {
            const urlSplitted = url.split(".");

            for (let index = 0; index < urlSplitted.length - 1 && !zoneAssociated.zone; index++) {
                const zoneIndex = zones.indexOf(urlSplitted.slice(index).join("."));

                if (zoneIndex !== -1) {
                    zoneAssociated.zone = zones[zoneIndex];
                    zoneAssociated.subDomain = urlSplitted.slice(0, index).join(".");
                }
            }

            return zoneAssociated;
        });
    };

    /**
     * IPv6
     */
    this.getIPv6Configuration = function (domain, subDomain) {
        return OvhHttp.get(["/sws/domain", domain, "zone/records"].join("/"), {
            rootPath: "2api",
            params: {
                search: subDomain,
                searchedType: "AAAA"
            }
        }).then((data) => data.paginatedZone.records.list);
    };

    this.getAttachedDomains = function (domain) {
        return OvhHttp.get("/hosting/web/attachedDomain", {
            rootPath: "apiv6",
            params: {
                domain
            }
        });
    };

    this.getAttachedDomain = function (domain, attachedDomain) {
        return OvhHttp.get("/hosting/web/{domain}/attachedDomain/{attachedDomain}", {
            rootPath: "apiv6",
            urlParams: {
                domain,
                attachedDomain
            }
        });
    };

    this.updateAttachedDomain = function (domain, attachedDomain, data) {
        return OvhHttp.put("/hosting/web/{domain}/attachedDomain/{attachedDomain}", {
            rootPath: "apiv6",
            urlParams: {
                domain,
                attachedDomain
            },
            data
        });
    };
});
