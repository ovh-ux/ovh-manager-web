angular.module("services").service("HostingModule", function (OvhHttp) {
    "use strict";

    const cache = {
        modules: "UNIVERS_HOSTING_MODULES",
        modulesLatest: "UNIVERS_HOSTING_MODULES_LATEST",
        installedModules: "UNIVERS_HOSTING_MODULES_INSTALLLED",
        installedModule: "UNIVERS_HOSTING_MODULE_INSTALLLED",
        databases: "UNIVERS_HOSTING_MODULES_DATABASES",
        attachedDomains: "UNIVERS_HOSTING_MODULES_ATTACHED_DOMAINS",
        attachedDomain: "UNIVERS_HOSTING_MODULES_ATTACHED_DOMAIN"
    };

    /**
     * Obtain service
     */
    this.getService = function (serviceName) {
        return OvhHttp.get("/hosting/web/{serviceName}", {
            rootPath: "apiv6",
            urlParams: {
                serviceName
            }
        });
    };

    /**
     * Obtain a list of availables modules
     */
    this.getModulesList = function () {
        return OvhHttp.get("/hosting/web/moduleList", {
            rootPath: "apiv6",
            params: {
                active: true
            },
            cache: cache.modules
        });
    };

    /**
     * Obtain a list of latest  modules
     */
    this.getModulesLatestList = function () {
        return OvhHttp.get("/hosting/web/moduleList", {
            rootPath: "apiv6",
            params: {
                active: true,
                latest: true
            },
            cache: cache.modulesLatest
        });
    };

    /**
     * Obtain a module
     */
    this.getAvailableModule = function (id) {
        return OvhHttp.get("/hosting/web/moduleList/{id}", {
            rootPath: "apiv6",
            urlParams: {
                id
            },
            cache: cache.moduleAvailable
        });
    };

    /**
     * Obtain a list of avalaibles databases
     */
    this.getDatabases = function (serviceName) {
        return OvhHttp.get("/hosting/web/{serviceName}/database", {
            rootPath: "apiv6",
            urlParams: {
                serviceName
            },
            params: {
                type: "mysql"
            }
        });
    };

    /**
     * Obtain a database by name
     */
    this.getDatabase = function (serviceName, name) {
        return OvhHttp.get("/hosting/web/{serviceName}/database/{name}", {
            rootPath: "apiv6",
            urlParams: {
                serviceName,
                name
            }
        });
    };

    /**
     * Obtain a list of installed modules
     */
    this.getModules = function (serviceName, opts) {
        return OvhHttp.get("/hosting/web/{serviceName}/module", {
            rootPath: "apiv6",
            urlParams: {
                serviceName
            },
            cache: cache.installedModules,
            clearCache: opts.forceRefresh
        });
    };

    /**
     * Obtain a an installed module
     */
    this.getModule = function (serviceName, id) {
        return OvhHttp.get("/hosting/web/{serviceName}/module/{id}", {
            rootPath: "apiv6",
            urlParams: {
                serviceName,
                id
            },
            cache: cache.installedModule
        });
    };

    /**
     * Obtain a attached domains
     */
    this.getAttachedDomains = function (serviceName) {
        return OvhHttp.get("/hosting/web/{serviceName}/attachedDomain", {
            rootPath: "apiv6",
            urlParams: {
                serviceName
            },
            cache: cache.attachedDomains
        });
    };

    /**
     * Obtain a attached domain path
     */
    this.getAttachedDomainPath = function (serviceName, domain) {
        return OvhHttp.get("/hosting/web/{serviceName}/attachedDomain/{domain}", {
            rootPath: "apiv6",
            urlParams: {
                serviceName,
                domain
            }
        });
    };

    /**
     * Create a new module
     */
    this.createModule = function (data, serviceName) {
        return OvhHttp.post("/hosting/web/{serviceName}/module", {
            rootPath: "apiv6",
            urlParams: {
                serviceName
            },
            data,
            broadcast: "hosting.tabs.modules.refresh"
        });
    };

    /**
     * Reset the admin password of a module
     */
    this.changePassword = function (serviceName, id) {
        return OvhHttp.post("/hosting/web/{serviceName}/module/{id}/changePassword", {
            rootPath: "apiv6",
            urlParams: {
                serviceName,
                id
            }
        });
    };

    /**
     * Remove an installed module
     */
    this.deleteModule = function (serviceName, id) {
        return OvhHttp.delete("/hosting/web/{serviceName}/module/{id}", {
            rootPath: "apiv6",
            urlParams: {
                serviceName,
                id
            },
            clearAllCache: true,
            broadcast: "hosting.tabs.modules.refresh"
        });
    };
});
