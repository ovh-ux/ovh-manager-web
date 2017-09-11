angular.module("services").service("HostingDatabase", function ($q, $rootScope, Hosting, OvhHttp, Poller, JavaEnum) {
    "use strict";
    const self = this;

    /*
     * Delete a database
     */
    this.deleteDatabase = function (serviceName, dbToDelete) {
        return OvhHttp.delete("/hosting/web/{serviceName}/database/{name}", {
            rootPath: "apiv6",
            urlParams: {
                serviceName,
                name: dbToDelete
            }
        }).then((response) => {
            Hosting.resetDatabases();
            return response;
        });
    };

    /*
     * get database list
     */
    this.databaseList = function (serviceName) {
        return OvhHttp.get("/hosting/web/{serviceName}/database", {
            rootPath: "apiv6",
            urlParams: {
                serviceName
            }
        });
    };

    /*
     * get database type availability
     */
    this.getDatabaseAvailableType = (serviceName) =>
        OvhHttp.get("/hosting/web/{serviceName}/databaseAvailableType", {
            urlParams: {
                serviceName
            },
            rootPath: "apiv6"
        }).then((availableTypes) => availableTypes.map((type) => type.toUpperCase()));

    /*
     * get database ids
     */
    this.getDatabaseIds = function (serviceName, search) {
        return OvhHttp.get("/hosting/web/{serviceName}/database", {
            rootPath: "apiv6",
            urlParams: {
                serviceName
            },
            params: {
                name: ["%", search, "%"].join("")
            }
        });
    };

    /*
     * get database detail
     */
    this.getDatabase = function (serviceName, name) {
        return OvhHttp.get("/hosting/web/{serviceName}/database/{name}", {
            rootPath: "apiv6",
            urlParams: {
                serviceName,
                name
            }
        }).then((database) => {
            ["type", "state", "mode"].forEach((elt) => {
                database[elt] = database[elt].toUpperCase();
            });
            database.version = `_${_.snakeCase(database.version)}`;
            database.quotaPercent = database.quotaUsed.value / database.quotaSize.value * 100;

            return database;
        });
    };

    /*
     * get dumps ids
     */
    this.getDumpIds = function (serviceName, name) {
        return OvhHttp.get("/hosting/web/{serviceName}/database/{name}/dump ", {
            rootPath: "apiv6",
            urlParams: {
                serviceName,
                name
            }
        });
    };

    /*
     * get dump details
     */
    this.getDump = function (serviceName, name, id) {
        return OvhHttp.get("/hosting/web/{serviceName}/database/{name}/dump/{id}", {
            rootPath: "apiv6",
            urlParams: {
                serviceName,
                name,
                id
            }
        });
    };

    /*
     * restore database dump
     */
    this.restoreBDD = function (serviceName, databaseName, dump) {
        return OvhHttp.post("/hosting/web/{serviceName}/database/{name}/dump/{id}/restore", {
            rootPath: "apiv6",
            urlParams: {
                serviceName,
                name: databaseName,
                id: dump.id
            }
        }).then((task) => {
            self.pollTasks(serviceName, {
                namespace: "database.dump.restore.poll",
                task,
                dump,
                successSates: ["canceled", "done"],
                errorsSates: ["error"]
            });
        });
    };

    /*
     * restore database from a dynamic backup
     */
    this.restoreBDDBackup = function (serviceName, databaseName, backupType, sendEmail) {
        return OvhHttp.post("/hosting/web/{serviceName}/database/{name}/restore", {
            rootPath: "apiv6",
            urlParams: {
                serviceName,
                name: databaseName
            },
            data: {
                date: backupType,
                sendEmail
            }
        });
    };

    /*
     * get database stats
     */
    this.databaseStatistics = function (serviceName, dbId, period, type, aggregation) {
        return OvhHttp.get("/sws/hosting/web/{serviceName}/databases/{database}/statistics", {
            rootPath: "2api",
            urlParams: {
                serviceName,
                database: dbId
            },
            params: {
                period,
                type,
                aggregation
            }
        });
    };

    /*
     * Update password for database
     */
    this.changePassword = function (serviceName, database, password) {
        return OvhHttp.post("/hosting/web/{serviceName}/database/{name}/changePassword", {
            rootPath: "apiv6",
            urlParams: {
                serviceName,
                name: database
            },
            data: { password }
        });
    };

    /*
     * Ask a dump for a database
     */
    this.dumpDatabase = function (serviceName, db, date, sendEmail) {
        return OvhHttp.post("/hosting/web/{serviceName}/database/{name}/dump", {
            rootPath: "apiv6",
            urlParams: {
                serviceName,
                name: db
            },
            data: {
                date: date.toLowerCase().replace("_", "."),
                sendEmail
            }
        });
    };

    /*
     * Delete a database dump
     */
    this.deleteDatabaseDump = function (serviceName, databaseName, dump) {
        return OvhHttp.delete("/hosting/web/{serviceName}/database/{databaseName}/dump/{id}", {
            rootPath: "apiv6",
            urlParams: {
                serviceName,
                databaseName,
                id: dump.id
            }
        }).then((task) => {
            self.pollTasks(serviceName, {
                namespace: "database.dump.delete.poll",
                task,
                dump,
                successSates: ["canceled", "done"],
                errorsSates: ["error"]
            });
        });
    };

    /*
     * Import a database from a file updloaded in /me/document/
     */
    this.importDatabase = function (serviceName, db, documentId, flushDatabase, sendEmail) {
        return OvhHttp.post("/hosting/web/{serviceName}/database/{database}/import", {
            rootPath: "apiv6",
            urlParams: {
                serviceName,
                database: db
            },
            data: {
                documentId,
                flushDatabase,
                sendEmail
            }
        });
    };

    /*
     * Get dump options
     */
    this.dumpDatabaseOptions = function () {
        return Hosting.getModels().then((models) => ({
            dumpDates: models.models["hosting.web.database.dump.DateEnum"].enum.map((model) => JavaEnum.tr(model))
        }));
    };

    /*
     * get database capabilities for creation
     */
    this.getCreationCapabilities = function (serviceName) {
        return $q
            .all({
                hosting: OvhHttp.get("/hosting/web/{serviceName}", {
                    rootPath: "apiv6",
                    urlParams: {
                        serviceName
                    }
                }),
                capabilities: OvhHttp.get("/hosting/web/{serviceName}/databaseCreationCapabilities", {
                    rootPath: "apiv6",
                    urlParams: {
                        serviceName
                    }
                }),
                models: Hosting.getModels()
            })
            .then(({ hosting, capabilities, models }) => ({
                availableDatabases: capabilities.map((capa) => ({
                    type: JavaEnum.tr(capa.type),
                    quota: capa.quota,
                    extraSqlQuota: capa.type === "extraSqlPerso" ? `_${capa.quota.value}` : null,
                    available: capa.available
                })),
                databaseTypes: models.models["hosting.web.database.DatabaseTypeEnum"].enum.map((m) => JavaEnum.tr(m)),
                primaryLogin: hosting.primaryLogin
            }));
    };

    /*
     * get database capabilities for creation
     */
    this.getAvailableVersion = function (serviceName, type) {
        return OvhHttp.get("/hosting/web/{serviceName}/databaseAvailableVersion", {
            rootPath: "apiv6",
            urlParams: {
                serviceName
            },
            params: { type }
        });
    };

    /*
     * Create a database
     */
    this.createDatabase = function (serviceName, capabilitie, password, quota, type, user, version) {
        return OvhHttp.post("/hosting/web/{serviceName}/database", {
            rootPath: "apiv6",
            urlParams: {
                serviceName
            },
            data: {
                capabilitie,
                password,
                quota,
                type,
                user,
                version
            }
        }).then(() => {
            Hosting.resetDatabases();
        });
    };

    this.activeDatabasePrivate = function (serviceName, ram, version) {
        return OvhHttp.post("/hosting/web/{serviceName}/activatePrivateDatabase", {
            rootPath: "apiv6",
            urlParams: {
                serviceName
            },
            data: {
                ram,
                version
            }
        });
    };

    this.getPrivateDatabaseCapabilities = function (serviceName) {
        return OvhHttp.get("/hosting/web/{serviceName}/privateDatabaseCreationCapabilities", {
            rootPath: "apiv6",
            urlParams: {
                serviceName
            }
        });
    };

    this.getDatabasesCapabilities = (serviceName) =>
        $q.all({
            database: OvhHttp.get(`/hosting/web/${serviceName}/privateDatabaseCreationCapabilities`, {
                rootPath: "apiv6"
            }),
            privateDatabase: OvhHttp.get(`/hosting/web/${serviceName}/databaseCreationCapabilities`, {
                rootPath: "apiv6"
            })
        });

    /**
     * Request a new quota check on a database
     */
    this.requestDatabaseQuotaCheck = function (serviceName, database) {
        return OvhHttp.post("/hosting/web/{serviceName}/database/{database}/request", {
            rootPath: "apiv6",
            urlParams: {
                serviceName,
                database
            },
            data: {
                action: "CHECK_QUOTA"
            }
        });
    };

    /**
     *  Get tasks
     */

    this.getTaskIds = function (serviceName, status, func) {
        return OvhHttp.get("/hosting/web/{serviceName}/tasks", {
            rootPath: "apiv6",
            urlParams: {
                serviceName
            },
            params: {
                "function": func,
                status
            }
        });
    };

    /**
     *  Get tasks
     */
    this.getTasks = function (serviceName, status, func) {
        return self.getTaskIds(serviceName, status, func).then((tasksId) => {
            const promises = tasksId.map((id) =>
                OvhHttp.get("/hosting/web/{serviceName}/tasks/{id}", {
                    rootPath: "apiv6",
                    urlsParams: {
                        serviceName,
                        id
                    }
                })
            );

            return $q.all(promises);
        });
    };

    /**
     * Polling tasks
     */

    self.pollTasks = function (serviceName, opts) {
        if (!opts.dump || !opts.task) {
            return $rootScope.$broadcast(`${opts.namespace}.error`, "");
        }

        if (!Array.isArray(opts.successSates)) {
            opts.successSates = [opts.successSates];
        }

        const url = ["apiv6/hosting/web", serviceName, "tasks", opts.task.id].join("/");

        $rootScope.$broadcast(`${opts.namespace}.start`, opts.task, opts.dump);
        return Poller.poll(url, null, {
            namespace: opts.namespace,
            interval: 5000,
            successRule: {
                state (task) {
                    return opts.successSates.indexOf(task.state) !== -1;
                }
            },
            errorRule: {
                state (task) {
                    return opts.errorsSates.indexOf(task.state) !== -1;
                }
            }
        }).then(
            (pollObject, task) => {
                $rootScope.$broadcast(`${opts.namespace}.done`, pollObject, task, opts.dump);
            },
            (err) => {
                $rootScope.$broadcast(`${opts.namespace}.error`, err);
            },
            (task) => {
                $rootScope.$broadcast(`${opts.namespace}.doing`, task);
            }
        );
    };
});
