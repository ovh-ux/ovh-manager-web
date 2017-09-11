angular.module("services").service("HostingUser", function (Hosting, OvhHttp, Poller, $rootScope) {
    "use strict";

    /*
     * Delete a user
     */
    this.deleteUser = function (serviceName, userId) {
        return OvhHttp.delete("/hosting/web/{serviceName}/user/{userId}", {
            rootPath: "apiv6",
            urlParams: {
                serviceName,
                userId
            }
        }).then(() => {
            Hosting.resetUsers();
        });
    };

    /*
     * Update password for user
     */
    this.changePassword = function (serviceName, userId, password) {
        return OvhHttp.post("/hosting/web/{serviceName}/user/{userId}/changePassword", {
            rootPath: "apiv6",
            urlParams: {
                serviceName,
                userId
            },
            data: {
                password
            }
        });
    };

    /*
     * Add user
     */
    this.addUser = function (serviceName, login, password, home) {
        return OvhHttp.post("/hosting/web/{serviceName}/user", {
            rootPath: "apiv6",
            urlParams: {
                serviceName
            },
            data: {
                login,
                password,
                home
            }
        }).then((resp) => {
            Hosting.resetUsers();
            return resp;
        });
    };

    /*
     * modify user
     */
    this.updateUser = function (serviceName, opts) {
        return OvhHttp.put("/hosting/web/{serviceName}/user/{login}", {
            rootPath: "apiv6",
            urlParams: {
                serviceName,
                login: opts.login
            },
            data: opts.data
        }).then(() => {
            Hosting.resetUsers();
        });
    };

    /*
     * getUserCreationCapabilities
     */
    this.getUserCreationCapabilities = function () {
        return Hosting.getModels().then((models) => {
            Hosting.resetUsers();
            return {
                maxUser: 1000,
                stateAvailable: models.models["hosting.web.user.StateEnum"].enum.map((m) => _.snakeCase(m).toUpperCase())
            };
        });
    };

    this.getTasks = function (serviceName, opts) {
        return OvhHttp.get("/hosting/web/{serviceName}/tasks", {
            rootPath: "apiv6",
            urlParams: {
                serviceName
            },
            params: opts.params
        });
    };

    this.pollState = function (serviceName, opts) {
        if (!opts.id) {
            return $rootScope.$broadcast(`${opts.namespace}.error`, "");
        }

        if (!Array.isArray(opts.successSates)) {
            opts.successSates = [opts.successSates];
        }

        $rootScope.$broadcast(`${opts.namespace}.start`, opts.id);
        return Poller.poll(["apiv6/hosting/web", serviceName, "tasks", opts.id].join("/"), null, {
            interval: 5000,
            successRule: {
                state (task) {
                    return opts.successSates.indexOf(task.state) !== -1;
                }
            },
            namespace: opts.namespace
        }).then(
            (pollObject, task) => {
                $rootScope.$broadcast(`${opts.namespace}.done`, pollObject, task);
            },
            (err) => {
                $rootScope.$broadcast(`${opts.namespace}.error`, err);
            }
        );
    };

    this.killAllPolling = function (opts) {
        Poller.kill({ namespace: opts.namespace });
    };
});
