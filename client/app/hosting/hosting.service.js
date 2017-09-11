angular.module("services").service("Hosting", function (Products, $http, $q, constants, $rootScope, $stateParams, Poll, OvhHttp) {
    "use strict";

    const hostingCache = "UNIVERS_WEB_HOSTING";
    const passwordConditions = {
        min: 8,
        max: 30
    };

    this.events = {
        dashboardRefresh: "hosting.dashboard.refresh",
        tabCronsRefresh: "hosting.tabs.crons.refresh",
        tabDomainsRefresh: "hosting.tabs.domains.refresh",
        tabDatabasesRefresh: "hosting.tabs.databases.refresh",
        tasksChanged: "hosting.tabs.tasks.refresh",
        tabFtpRefresh: "hosting.tabs.ftp.refresh"
    };

    /* -------------------------BROADCAST-------------------------*/

    this.resetDatabases = function () {
        $rootScope.$broadcast(this.events.tabDatabasesRefresh);
    };

    this.resetUsers = function () {
        $rootScope.$broadcast(this.events.tabFtpRefresh);
    };

    this.resetDomains = function () {
        $rootScope.$broadcast(this.events.tabDomainsRefresh);
    };

    this.resetCrons = function () {
        $rootScope.$broadcast(this.events.tabCronsRefresh);
    };

    /* -------------------------MODELS-------------------------*/

    this.getModels = function () {
        return OvhHttp.get("/hosting/web.json", {
            rootPath: "apiv6",
            cache: "HOSTING_WEB_MODELS"
        });
    };

    /* -------------------------TOOLS-------------------------*/

    this.getPasswordConditions = function (customConditions) {
        const min = _.get(customConditions, "min", passwordConditions.min);
        const max = _.get(customConditions, "max", passwordConditions.max);
        return {
            min,
            max
        };
    };

    this.isPerfOffer = (offer) => /^perf.+$/.test(offer);

    this.cloudWebUnlimitedQuantity = 100000;

    this.isPasswordValid = function (password, customConditions) {
        const min = _.get(customConditions, "min", passwordConditions.min);
        const max = _.get(customConditions, "max", passwordConditions.max);
        return !!(password && password.length >= min && password.length <= max && password.match(/.*[0-9].*/) && password.match(/.*[a-z].*/) && password.match(/.*[A-Z].*/) && password.match(/^[a-zA-Z0-9]+$/));
    };

    this.isPathValid = function (path) {
        return /^[a-zA-Z0-9-._\/]*$/.test(path) && !/\.\./.test(path);
    };

    this.getRemainingQuota = (quotaSize, quotaUsed) => {
        switch (quotaUsed.unit) {
        case "MB":
            if (quotaSize.unit === "MB") {
                return quotaSize.value - quotaUsed.value;
            }
            return (quotaSize.value * 1000) - quotaUsed.value;
        case "GB":
            if (quotaSize.unit === "MB") {
                return quotaSize.value - (quotaUsed.value * 1000);
            }
            return (quotaUsed.value * 1000) - (quotaSize.value * 1000);
        default:
            return quotaSize.value - quotaUsed.value;
        }
    };

    /* -------------------------HOSTING/WEB-------------------------*/

    this.getSelected = function (serviceName, forceRefresh) {
        return OvhHttp.get("/sws/hosting/web/{serviceName}", {
            rootPath: "2api",
            urlParams: {
                serviceName
            },
            clearCache: forceRefresh,
            cache: hostingCache
        }).then((hosting) => {
            if (hosting.offer === "START_10_M") {
                return OvhHttp.get("/domain/{serviceName}/serviceInfos", {
                    rootPath: "apiv6",
                    urlParams: {
                        serviceName
                    },
                    clearCache: forceRefresh,
                    cache: hostingCache
                })
                    .then((data) => {
                        hosting.expiration = data.expiration;
                        return hosting;
                    })
                    .catch(() => hosting);
            }
            return hosting;
        });
    };

    this.getHostings = function () {
        return OvhHttp.get("/hosting/web", {
            rootPath: "apiv6"
        });
    };

    this.getHosting = function (domainName, catchOpt) {
        return $http.get(["apiv6/hosting/web", domainName].join("/")).then(
            (data) => data ? data.data : null,
            (http) => {
                if (catchOpt && angular.isArray(catchOpt) && catchOpt.indexOf(http.status) !== -1) {
                    return null;
                }
                return $q.reject(http);
            }
        );
    };

    this.updateHosting = function (serviceName, opts) {
        return OvhHttp.put("/hosting/web/{serviceName}", {
            rootPath: "apiv6",
            urlParams: {
                serviceName
            },
            clearAllCache: true,
            broadcast: this.events.dashboardRefresh,
            data: opts.body
        });
    };

    /*
     * Get content of domains tab
     */
    this.getTabDomains = function (serviceName, count, offset, search) {
        return OvhHttp.get("/sws/hosting/web/{serviceName}/domains", {
            rootPath: "2api",
            urlParams: {
                serviceName
            },
            params: {
                count,
                offset,
                search
            }
        });
    };

    /*
     * Get content of databases tab
     */
    this.getTabDatabases = function (serviceName, count, offset, search) {
        return OvhHttp.get("/sws/hosting/web/{serviceName}/databases", {
            rootPath: "2api",
            urlParams: {
                serviceName
            },
            params: {
                count,
                offset,
                search
            }
        });
    };

    /*
     * Get content of ftp tab
     */
    this.getTabFTP = function (serviceName, count, offset, needUsers, search) {
        return OvhHttp.get("/sws/hosting/web/{serviceName}/ftp", {
            rootPath: "2api",
            urlParams: {
                serviceName
            },
            params: {
                count,
                offset,
                needUsers,
                search
            }
        });
    };

    /*
     * Get tasks list
     */
    this.getTasksList = function (serviceName, count, offset) {
        return OvhHttp.get("/sws/hosting/web/{serviceName}/tasks", {
            rootPath: "2api",
            urlParams: {
                serviceName
            },
            params: {
                count,
                offset
            }
        });
    };

    this.flushCdn = function (serviceName) {
        return OvhHttp.post("/hosting/web/{serviceName}/request", {
            rootPath: "apiv6",
            urlParams: {
                serviceName
            },
            data: {
                action: "FLUSH_CACHE"
            }
        });
    };

    this.terminateCdn = function (serviceName) {
        return OvhHttp.post("/hosting/web/{serviceName}/cdn/terminate", {
            rootPath: "apiv6",
            urlParams: {
                serviceName
            }
        });
    };

    this.getAvailableOffer = function (serviceName) {
        return OvhHttp.get("/hosting/web/availableOffer", {
            rootPath: "apiv6",
            params: {
                domain: serviceName
            }
        });
    };

    this.migrateMyOvhOrg = function (serviceName, destination) {
        return OvhHttp.post("/hosting/web/{serviceName}/migrateMyOvhOrg", {
            rootPath: "apiv6",
            urlParams: {
                serviceName
            },
            data: {
                destinationServiceName: destination
            }
        });
    };

    /*
     * Get users account that have access to webserver logs
     */
    this.getUserLogs = function (serviceName) {
        return OvhHttp.get("/hosting/web/{serviceName}/userLogs", {
            rootPath: "apiv6",
            urlParams: {
                serviceName
            }
        });
    };

    this.getUserLogsEntry = function (serviceName, login) {
        return OvhHttp.get("/hosting/web/{serviceName}/userLogs/{login}", {
            rootPath: "apiv6",
            urlParams: {
                serviceName,
                login
            }
        });
    };

    /*
     * Delete a user
     */
    this.deleteUserLogs = function (serviceName, login) {
        return OvhHttp.delete("/hosting/web/{serviceName}/userLogs/{login}", {
            rootPath: "apiv6",
            urlParams: {
                serviceName,
                login
            },
            broadcast: "hosting.userLogs.refresh"
        });
    };

    /*
     * Change password of a user
     */
    this.userLogsChangePassword = function (serviceName, login, newPassword) {
        return OvhHttp.post("/hosting/web/{serviceName}/userLogs/{login}/changePassword", {
            rootPath: "apiv6",
            urlParams: {
                serviceName,
                login
            },
            data: {
                password: newPassword
            }
        });
    };

    /*
     * Create a user
     */
    this.userLogsCreate = function (serviceName, description, login, password) {
        return OvhHttp.post("/hosting/web/{serviceName}/userLogs", {
            rootPath: "apiv6",
            urlParams: {
                serviceName
            },
            data: {
                description,
                login,
                password
            },
            broadcast: "hosting.userLogs.refresh"
        });
    };

    /*
     *
     */
    this.modifyUserLogs = function (serviceName, login, description) {
        return OvhHttp.put("/hosting/web/{serviceName}/userLogs/{login}", {
            rootPath: "apiv6",
            urlParams: {
                serviceName,
                login
            },
            data: {
                description
            },
            broadcast: "hosting.userLogs.refresh"
        });
    };

    this.getUserLogsToken = function (serviceName, opts) {
        return OvhHttp.get("/hosting/web/{serviceName}/userLogsToken", {
            rootPath: "apiv6",
            urlParams: {
                serviceName
            },
            params: opts.params
        });
    };

    /* -------------------------POLLING-------------------------*/

    this.pollFlushCdn = function (serviceName, taskIds) {
        const pollingTable = [];

        angular.forEach(taskIds, (taskId) => {
            pollingTable.push(
                Poll.poll(["apiv6/hosting/web", serviceName, "tasks", taskId].join("/"), null, {
                    namespace: "hosting.cdn.flush.refresh",
                    interval: 30000
                }).then((resp) => resp, (err) => err)
            );
        });

        return $q.all(pollingTable);
    };

    this.pollSqlPrive = function (serviceName, taskIds) {
        const pollingTable = [];

        angular.forEach(taskIds, (taskId) => {
            pollingTable.push(
                Poll.poll(["apiv6/hosting/web", serviceName, "tasks", taskId].join("/"), null, {
                    namespace: "hosting.database.sqlPrive",
                    interval: 30000
                }).then((resp) => resp, (err) => err)
            );
        });

        return $q.all(pollingTable);
    };

    this.killPollFlushCdn = function () {
        Poll.kill({ namespace: "hosting.cdn.flush.refresh" });
    };

    this.pollDatabaseQuotaTask = function (serviceName, taskId) {
        return Poll.poll(["apiv6/hosting/web", serviceName, "tasks", taskId].join("/"));
    };

    this.killPollSqlPrive = function () {
        Poll.kill({ namespace: "hosting.database.sqlPrive" });
    };

    this.checkTaskUnique = function (serviceName, fct) {
        const r = [];
        let tasks = [];

        angular.forEach(["init", "doing", "todo"], (status) => {
            r.push(
                $http
                    .get(["apiv6/hosting/web", serviceName, "tasks"].join("/"), {
                        params: {
                            "function": fct,
                            status
                        }
                    })
                    .then((response) => {
                        if (response.data && response.data.length) {
                            tasks = _.union(tasks, response.data);
                        }
                    })
            );
        });

        return $q.all(r).then(() => tasks);
    };

    /* -------------------------ORDER/HOSTING/WEB-------------------------*/

    function listAvailableUpgradeDurations (opts, serviceName) {
        return OvhHttp.get("/order/hosting/web/{serviceName}/upgrade", {
            rootPath: "apiv6",
            urlParams: {
                serviceName
            },
            params: {
                offer: opts.offer
            }
        });
    }

    this.getUpgradePrices = function (opts, serviceName) {
        return listAvailableUpgradeDurations(opts, serviceName).then((durations) => {
            const requests = [];
            const durationsTab = [];
            const defer = $q.defer();

            defer.notify(durations);

            angular.forEach(durations, (duration) => {
                requests.push(
                    OvhHttp.get("/order/hosting/web/{serviceName}/upgrade/{duration}", {
                        rootPath: "apiv6",
                        urlParams: {
                            serviceName,
                            duration
                        },
                        params: {
                            offer: opts.offer
                        }
                    }).then((durationDetails) => {
                        const details = angular.copy(durationDetails);
                        details.duration = duration;
                        durationsTab.push(details);
                        defer.notify(durationsTab);
                    })
                );
            });

            $q.all(requests).then(
                () => {
                    defer.resolve(durationsTab);
                },
                () => {
                    defer.resolve(durationsTab);
                }
            );

            return defer.promise;
        });
    };

    this.orderUpgrade = function (offer, duration, serviceName) {
        return OvhHttp.post("/order/hosting/web/{serviceName}/upgrade/{duration}", {
            rootPath: "apiv6",
            urlParams: {
                serviceName,
                duration
            },
            data: {
                offer
            }
        });
    };

    this.terminate = function (serviceName) {
        return OvhHttp.post("/hosting/web/{serviceName}/terminate", {
            rootPath: "apiv6",
            urlParams: {
                serviceName
            },
            data: {}
        });
    };

    this.getSslState = (serviceName) =>
        OvhHttp.get("/hosting/web/{serviceName}/ssl", {
            rootPath: "apiv6",
            urlParams: {
                serviceName
            }
        });

    this.createSsl = (serviceName, certificate, key, chain) =>
        OvhHttp.post("/hosting/web/{serviceName}/ssl", {
            rootPath: "apiv6",
            urlParams: {
                serviceName
            },
            data: {
                certificate,
                key,
                chain
            }
        });

    this.deleteSsl = (serviceName) =>
        OvhHttp.delete("/hosting/web/{serviceName}/ssl", {
            rootPath: "apiv6",
            urlParams: {
                serviceName
            }
        });

    this.getAttachDomainSslLinked = (serviceName) => {
        const defered = $q.defer();

        OvhHttp.get("/hosting/web/{serviceName}/ssl/domains", {
            rootPath: "apiv6",
            urlParams: {
                serviceName
            },
            returnSuccessKey: ""
        })
            .then((resp) => defered.resolve(resp.data))
            .catch((err) => {
                if (err.status === 404) {
                    defered.resolve([]);
                } else {
                    defered.reject(err.data);
                }
            });

        return defered.promise;
    };

    this.regeneratingSSL = (serviceName) =>
        OvhHttp.post("/hosting/web/{serviceName}/ssl/regenerate", {
            rootPath: "apiv6",
            urlParams: {
                serviceName
            }
        });

    this.getServiceInfos = (serviceName) =>
        OvhHttp.get("/hosting/web/{serviceName}/serviceInfos", {
            rootPath: "apiv6",
            urlParams: {
                serviceName
            }
        });

    this.getPrivateDatabasesLinked = (serviceName) =>
        OvhHttp.get("/hosting/web/{serviceName}/privateDatabases", {
            rootPath: "apiv6",
            urlParams: {
                serviceName
            }
        });
});
