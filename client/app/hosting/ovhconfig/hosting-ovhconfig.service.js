angular.module("services").service("HostingOvhConfig", function (OvhHttp, $q) {
    "use strict";

    const self = this;
    const defaultPath = "";
    const cache = "UNIVERS_WEB_HOSTING_OVHCONFIG";

    this.events = {
        ovhConfigNeedRefresh: "hosting.ovhConfig.needRefresh"
    };

    function OvhConfig (data) {
        this._setData(data);
    }
    Object.defineProperties(OvhConfig.prototype, {
        _patterns: {
            writable: false,
            configurable: false,
            value: {
                phpEngine: /php/i
            }
        },
        _setData: {
            writable: false,
            configurable: false,
            value (data) {
                let keys;

                if (_.isObject(data)) {
                    keys = Object.keys(data);

                    for (let i = 0, imax = keys.length; i < imax; i++) {
                        this[keys[i]] = data[keys[i]];
                    }
                }
            }
        },
        isPhpEngine: {
            configurable: false,
            set () {
                throw new Error("OvhConfig.isPhpEngine is a read only property");
            },
            get () {
                return this.engineName && this._patterns.phpEngine.test(this.engineName);
            }
        },
        label: {
            configurable: false,
            set () {
                throw new Error("OvhConfig.label is a read only property");
            },
            get () {
                let label = "";

                if (this.creationDate) {
                    this.creationDateHr = moment(this.creationDate).format("ll");
                }

                angular.forEach(
                    ["engineName", "engineVersion", "environment", "creationDateHr"],
                    function (key) {
                        if (this[key]) {
                            if (label.length > 0) {
                                label += " ";
                            }

                            label += this[key];
                        }
                    },
                    this
                );

                return label;
            }
        }
    });

    function getDatasFromIds (serviceName, ids) {
        const queue = _.map(ids, (id) => self.getFromId(serviceName, id));

        return $q.all(queue);
    }

    // sync the api with the host, in case of manual modification (ftp,…)
    this.ovhConfigRefresh = function (serviceName) {
        return OvhHttp.post("/hosting/web/{serviceName}/ovhConfigRefresh", {
            rootPath: "apiv6",
            clearAllCache: cache,
            urlParams: {
                serviceName
            }
        });
    };

    this.getIds = function (serviceName, getHistory, path = defaultPath) {
        return OvhHttp.get("/hosting/web/{serviceName}/ovhConfig", {
            rootPath: "apiv6",
            urlParams: {
                serviceName
            },
            params: {
                historical: getHistory ? true : getHistory === false ? false : undefined,
                path
            }
        });
    };

    this.getFromId = function (serviceName, id) {
        return OvhHttp.get("/hosting/web/{serviceName}/ovhConfig/{id}", {
            rootPath: "apiv6",
            cache,
            urlParams: {
                serviceName,
                id
            }
        }).then((data) => new OvhConfig(data));
    };

    this.get = function (serviceName) {
        return self.getIds(serviceName, false).then((ids) => self.getFromId(serviceName, ids.pop()));
    };

    this.getAll = function (serviceName) {
        return self.getIds(serviceName).then((ids) => getDatasFromIds(serviceName, ids));
    };

    this.getHistoric = function (serviceName) {
        return self.getIds(serviceName, true).then((ids) => getDatasFromIds(serviceName, ids));
    };

    this.changeConfiguration = function (serviceName, data) {
        const id = data.id;
        delete data.id;

        return OvhHttp.post("/hosting/web/{serviceName}/ovhConfig/{id}/changeConfiguration", {
            rootPath: "apiv6",
            clearAllCache: cache,
            urlParams: {
                serviceName,
                id
            },
            data
        });
    };

    this.rollbackConfig = function (serviceName, currentId, idToRollback) {
        return OvhHttp.post("/hosting/web/{serviceName}/ovhConfig/{id}/rollback", {
            rootPath: "apiv6",
            clearAllCache: cache,
            urlParams: {
                serviceName,
                id: currentId
            },
            data: {
                rollbackId: idToRollback
            }
        });
    };
});
