{
    const hostingCache = "UNIVERS_WEB_HOSTING";
    const passwordConditions = {
        min: 8,
        max: 30
    };

    angular
        .module("services")
        .service("Hosting", class Hosting {

            constructor ($q, $http, $rootScope, $stateParams, constants, OvhHttp, Poll, Products) {
                this.$q = $q;
                this.$http = $http;
                this.$rootScope = $rootScope;
                this.$stateParams = $stateParams;
                this.constants = constants;
                this.OvhHttp = OvhHttp;
                this.Poll = Poll;
                this.Products = Products;

                this.cloudWebUnlimitedQuantity = 100000;
                this.events = {
                    dashboardRefresh: "hosting.dashboard.refresh",
                    tabCronsRefresh: "hosting.tabs.crons.refresh",
                    tabDomainsRefresh: "hosting.tabs.domains.refresh",
                    tabDatabasesRefresh: "hosting.tabs.databases.refresh",
                    tabDatabasesCreation: "hosting.tabs.databases.creation",
                    tabFrameworkRuntimesRefresh: "hosting.tabs.framework.runtimes.refresh",
                    tabFrameworkEnvvarsRefresh: "hosting.tabs.framework.envvars.refresh",
                    tasksChanged: "hosting.tabs.tasks.refresh",
                    tabFtpRefresh: "hosting.tabs.ftp.refresh"
                };
            }

            /* -------------------------BROADCAST-------------------------*/

            /**
             * Broadcast reset databases event
             */
            resetDatabases () {
                this.$rootScope.$broadcast(this.events.tabDatabasesRefresh);
            }

            /**
             * Broadcast reset users event
             */
            resetUsers () {
                this.$rootScope.$broadcast(this.events.tabFtpRefresh);
            }

            /**
             * Broadcast reset domains event
             */
            resetDomains () {
                this.$rootScope.$broadcast(this.events.tabDomainsRefresh);
            }

            /**
             * Broadcast reset cron event
             */
            resetCrons () {
                this.$rootScope.$broadcast(this.events.tabCronsRefresh);
            }

            /**
             * Broadcast reset runtimes event
             */
            resetRuntimes () {
                this.$rootScope.$broadcast(this.events.tabFrameworkRuntimesRefresh);
            }

            /**
             * Broadcast reset envvars event
             */
            resetEnvvars () {
                this.$rootScope.$broadcast(this.events.tabFrameworkEnvvarsRefresh);
            }

            /* -------------------------MODELS-------------------------*/

            /**
             * Get models
             */
            getModels () {
                return this.OvhHttp.get("/hosting/web.json", {
                    rootPath: "apiv6",
                    cache: "HOSTING_WEB_MODELS"
                });
            }

            /* -------------------------TOOLS-------------------------*/

            /**
             * Get password conditions object
             * @param {{min: *, max: *}|null} customConditions
             * @returns {{min: *, max: *}}
             */
            static getPasswordConditions (customConditions = undefined) {
                const min = _.get(customConditions, "min", passwordConditions.min);
                const max = _.get(customConditions, "max", passwordConditions.max);
                return { min, max };
            }

            /**
             * Is hosting performance offer
             * @param {string} offer
             * @returns {boolean}
             */
            static isPerfOffer (offer) {
                return /^perf.+$/.test(offer);
            }

            /**
             * Is password valid
             * @param {string} password
             * @param {{min: number, max: number}|null} customConditions
             * @returns {boolean}
             */
            static isPasswordValid (password, customConditions = undefined) {
                const min = _.get(customConditions, "min", passwordConditions.min);
                const max = _.get(customConditions, "max", passwordConditions.max);
                return !!(password && password.length >= min && password.length <= max && password.match(/.*[0-9].*/) && password.match(/.*[a-z].*/) && password.match(/.*[A-Z].*/) && password.match(/^[a-zA-Z0-9]+$/));
            }

            /**
             * Is path valid
             * @param {string} path
             * @returns {boolean}
             */
            static isPathValid (path) {
                return /^[\w\-.\/]*$/.test(path) && !/\.\./.test(path);
            }

            /**
             * Get remaining quotas
             * @param {object} quotaSize
             * @param {object} quotaUsed
             * @returns {number}
             */
            static getRemainingQuota (quotaSize, quotaUsed) {
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
            }

            /* -------------------------HOSTING/WEB-------------------------*/

            /**
             * Get selected hosting service
             * @param {string} serviceName
             * @param {boolean} forceRefresh
             */
            getSelected (serviceName, forceRefresh = false) {
                return this.OvhHttp.get(`/sws/hosting/web/${serviceName}`, {
                    rootPath: "2api",
                    cache: hostingCache,
                    clearCache: forceRefresh
                }).then((hosting) => {
                    hosting.isCloudWeb = hosting.offer.indexOf("CLOUD") !== -1;

                    if (hosting.offer === "START_10_M") {
                        return this.OvhHttp.get(`/domain/${serviceName}/serviceInfos`, {
                            rootPath: "apiv6",
                            cache: hostingCache,
                            clearCache: forceRefresh
                        }).then((data) => {
                            hosting.expiration = data.expiration;
                            return hosting;
                        }).catch(() => hosting);
                    }

                    return hosting;
                });
            }

            /**
             * Get hosting services list
             */
            getHostings () {
                return this.OvhHttp.get("/hosting/web", {
                    rootPath: "apiv6"
                });
            }

            /**
             * Get specific hosting service
             * @param {string} serviceName
             * @param {array|null} catchOpt
             */
            getHosting (serviceName, catchOpt) {
                return this.$http.get(`/hosting/web/${serviceName}`)
                    .then((response) => response.data)
                    .catch((http) => {
                        if (_.isArray(catchOpt) && _.indexOf(catchOpt, http.status) !== -1) {
                            return null;
                        }
                        return this.$q.reject(http);
                    });
            }

            /**
             * Update hosting service
             * @param {string} serviceName
             * @param {object} opts
             */
            updateHosting (serviceName, opts) {
                return this.OvhHttp.put(`/hosting/web/${serviceName}`, {
                    rootPath: "apiv6",
                    broadcast: this.events.dashboardRefresh,
                    clearAllCache: true,
                    data: opts.body
                });
            }

            /**
             * Get hosting service info
             * @param {string} serviceName
             */
            getServiceInfos (serviceName) {
                return this.OvhHttp.get(`/hosting/web/${serviceName}/serviceInfos`, {
                    rootPath: "apiv6"
                });
            }

            /**
             * Get content of domains tab
             * @param {string} serviceName
             * @param {integer} count
             * @param {integer} offset
             * @param {string|null} search
             */
            getTabDomains (serviceName, count, offset, search) {
                return this.OvhHttp.get(`/sws/hosting/web/${serviceName}/domains`, {
                    rootPath: "2api",
                    params: {
                        count,
                        offset,
                        search
                    }
                });
            }

            /**
             * Get content of databases tab
             * @param {string} serviceName
             * @param {integer} count
             * @param {integer} offset
             * @param {string|null} search
             */
            getTabDatabases (serviceName, count, offset, search) {
                return this.OvhHttp.get(`/sws/hosting/web/${serviceName}/databases`, {
                    rootPath: "2api",
                    params: {
                        count,
                        offset,
                        search
                    }
                });
            }

            /**
             * Get content of ftp tab
             * @param {string} serviceName
             * @param {integer} count
             * @param {integer} offset
             * @param {boolean} needUsers
             * @param {string|null} search
             */
            getTabFTP (serviceName, count, offset, needUsers, search) {
                return this.OvhHttp.get(`/sws/hosting/web/${serviceName}/ftp`, {
                    rootPath: "2api",
                    params: {
                        count,
                        offset,
                        needUsers,
                        search
                    }
                });
            }

            /**
             * Get tasks list
             * @param {string} serviceName
             * @param {integer} count
             * @param {integer} offset
             */
            getTasksList (serviceName, count, offset) {
                return this.OvhHttp.get(`/sws/hosting/web/${serviceName}/tasks`, {
                    rootPath: "2api",
                    params: {
                        count,
                        offset
                    }
                });
            }

            /**
             * Flush Cdn
             * @param {string} serviceName
             */
            flushCdn (serviceName) {
                return this.OvhHttp.post(`/hosting/web/${serviceName}/request`, {
                    rootPath: "apiv6",
                    data: {
                        action: "FLUSH_CACHE"
                    }
                });
            }

            /**
             * Terminate Cdn
             * @param {string} serviceName
             */
            terminateCdn (serviceName) {
                return this.OvhHttp.post(`/hosting/web/${serviceName}/cdn/terminate`, {
                    rootPath: "apiv6"
                });
            }

            /**
             * Get available offers
             * @param {string} domain
             */
            getAvailableOffer (domain) {
                return this.OvhHttp.get("/hosting/web/availableOffer", {
                    rootPath: "apiv6",
                    params: {
                        domain
                    }
                });
            }

            /**
             * Get offer capabilities
             * @param {string} offer
             */
            getOfferCapabilities (offer) {
                return this.OvhHttp.get("/hosting/web/offerCapabilities", {
                    rootPath: "apiv6",
                    params: {
                        offer
                    }
                });
            }

            /**
             * MyOvhOrg migration
             * @param {string} serviceName
             * @param {string} destinationServiceName
             */
            migrateMyOvhOrg (serviceName, destinationServiceName) {
                return this.OvhHttp.post(`/hosting/web/${serviceName}/migrateMyOvhOrg`, {
                    rootPath: "apiv6",
                    data: {
                        destinationServiceName
                    }
                });
            }

            /**
             * Get list of user accounts that have access to webserver logs
             * @param {string} serviceName
             */
            getUserLogs (serviceName) {
                return this.OvhHttp.get(`/hosting/web/${serviceName}/userLogs`, {
                    rootPath: "apiv6"
                });
            }

            /**
             * Get user account
             * @param {string} serviceName
             * @param {string} login
             */
            getUserLogsEntry (serviceName, login) {
                return this.OvhHttp.get(`/hosting/web/${serviceName}/userLogs/${login}`, {
                    rootPath: "apiv6"
                });
            }

            /**
             * Get user token
             * @param {string} serviceName
             * @param {object} opts
             */
            getUserLogsToken (serviceName, opts) {
                return this.OvhHttp.get(`/hosting/web/${serviceName}/userLogsToken`, {
                    rootPath: "apiv6",
                    params: opts.params
                });
            }

            /**
             * Delete a user
             * @param {string} serviceName
             * @param {string} login
             */
            deleteUserLogs (serviceName, login) {
                return this.OvhHttp.delete(`/hosting/web/${serviceName}/userLogs/${login}`, {
                    rootPath: "apiv6",
                    broadcast: "hosting.userLogs.refresh"
                });
            }

            /**
             * Change password of a user
             * @param {string} serviceName
             * @param {string} login
             * @param {string} newPassword
             */
            userLogsChangePassword (serviceName, login, newPassword) {
                return this.OvhHttp.post(`/hosting/web/${serviceName}/userLogs/${login}/changePassword`, {
                    rootPath: "apiv6",
                    data: {
                        password: newPassword
                    }
                });
            }

            /**
             * Create a user
             * @param {string} serviceName
             * @param {string} description
             * @param {string} login
             * @param {string} password
             */
            userLogsCreate (serviceName, description, login, password) {
                return this.OvhHttp.post(`/hosting/web/${serviceName}/userLogs`, {
                    rootPath: "apiv6",
                    data: {
                        description,
                        login,
                        password
                    },
                    broadcast: "hosting.userLogs.refresh"
                });
            }

            /**
             * Update a user
             * @param {string} serviceName
             * @param {string} login
             * @param {string} description
             */
            modifyUserLogs (serviceName, login, description) {
                return this.OvhHttp.put(`/hosting/web/${serviceName}/userLogs/${login}`, {
                    rootPath: "apiv6",
                    data: {
                        description
                    },
                    broadcast: "hosting.userLogs.refresh"
                });
            }

            /* -------------------------POLLING-------------------------*/

            pollFlushCdn (serviceName, taskIds) {
                return this.$q.all(_.map(taskIds, (taskId) => this.Poll.poll(`apiv6/hosting/web/${serviceName}/tasks/${taskId}`, null, {
                    namespace: "hosting.cdn.flush.refresh",
                    interval: 30000
                }).then((resp) => resp, (err) => err)));
            }

            pollSqlPrive (serviceName, taskIds) {
                return this.$q.all(_.map(taskIds, (taskId) => this.Poll.poll(`apiv6/hosting/web/${serviceName}/tasks/${taskId}`, null, {
                    namespace: "hosting.database.sqlPrive",
                    interval: 30000
                })
                    .then((resp) => resp)
                    .catch((err) => err)));
            }

            killPollFlushCdn () {
                this.Poll.kill({ namespace: "hosting.cdn.flush.refresh" });
            }

            pollDatabaseQuotaTask (serviceName, taskId) {
                return this.Poll.poll(`apiv6/hosting/web/${serviceName}/tasks/${taskId}`);
            }

            killPollSqlPrive () {
                this.Poll.kill({ namespace: "hosting.database.sqlPrive" });
            }

            /**
             * Check task unique
             * @param {string} serviceName
             * @param {string} fct
             */
            checkTaskUnique (serviceName, fct) {
                let tasks = [];
                const r = _.map(["init", "doing", "todo"], (status) => this.OvhHttp.get(`/hosting/web/${serviceName}/tasks`, {
                    rootPath: "apiv6",
                    params: {
                        "function": fct,
                        status
                    }
                }).then((response) => {
                    if (_.isArray(response.data) && !_.isEmpty(response.data)) {
                        tasks = _.union(tasks, response.data);
                    }
                }));

                return this.$q.all(r).then(() => tasks);
            }

            /* -------------------------ORDER/HOSTING/WEB-------------------------*/

            /**
             * Get upgrade offer prices
             * @param {string} serviceName
             * @param {string} offer
             */
            getUpgradePrices (serviceName, offer) {
                return this.OvhHttp.get(`/order/hosting/web/${serviceName}/upgrade`, {
                    rootPath: "apiv6",
                    params: {
                        offer
                    }
                }).then((durations) => {
                    const durationsTab = [];
                    const defer = this.$q.defer();
                    defer.notify(durations);

                    const requests = _.map(durations, (duration) => this.OvhHttp.get(`/order/hosting/web/${serviceName}/upgrade/${duration}`, {
                        rootPath: "apiv6",
                        params: {
                            offer
                        }
                    }).then((durationDetails) => {
                        const details = angular.copy(durationDetails);
                        details.duration = duration;
                        durationsTab.push(details);
                        defer.notify(durationsTab);
                    }));

                    this.$q.all(requests)
                        .then(() => {
                            defer.resolve(durationsTab);
                        }, () => {
                            defer.resolve(durationsTab);
                        });

                    return defer.promise;
                });
            }

            /**
             * Order upgraded offer
             * @param {string} serviceName
             * @param {string} offer
             * @param {string} duration
             */
            orderUpgrade (serviceName, offer, duration) {
                return this.OvhHttp.post(`/order/hosting/web/${serviceName}/upgrade/${duration}`, {
                    rootPath: "apiv6",
                    data: {
                        offer
                    }
                });
            }

            /**
             * Terminate hosting service
             * @param {string} serviceName
             */
            terminate (serviceName) {
                return this.OvhHttp.post(`/hosting/web/${serviceName}/terminate`, {
                    rootPath: "apiv6",
                    data: {}
                });
            }

            /**
             * Get linked private databases
             * @param {string} serviceName
             */
            getPrivateDatabasesLinked (serviceName) {
                return this.OvhHttp.get(`/hosting/web/${serviceName}/privateDatabases`, {
                    rootPath: "apiv6"
                });
            }
        }
    );
}
