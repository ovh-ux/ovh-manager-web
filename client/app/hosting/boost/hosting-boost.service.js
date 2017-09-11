angular.module("services").service("HostingBoost", function ($q, $rootScope, OvhHttp, Poll) {
    "use strict";

    /**
     * Get models
     */
    this.getModels = function () {
        return OvhHttp.get("/hosting/web.json", {
            rootPath: "apiv6"
        });
    };

    /**
     * Get tasks
     */
    this.getTasks = function (serviceName) {
        const tasks = [
            OvhHttp.get("/hosting/web/{serviceName}/tasks", {
                rootPath: "apiv6",
                urlParams: {
                    serviceName
                },
                params: {
                    "function": "changeSlot/upgrade"
                }
            }),
            OvhHttp.get("/hosting/web/{serviceName}/tasks", {
                rootPath: "apiv6",
                urlParams: {
                    serviceName
                },
                params: {
                    "function": "changeSlot/downgrade"
                }
            })
        ];
        return $q.all(tasks);
    };

    /**
     * Obtain hosting boost history
     */
    this.getHistory = function (serviceName) {
        return OvhHttp.get("/hosting/web/{serviceName}/boostHistory", {
            rootPath: "apiv6",
            urlParams: {
                serviceName
            }
        });
    };

    /**
     * Obtain an hosting boost history entry
     */
    this.getHistoryEntry = function (serviceName, date) {
        return OvhHttp.get("/hosting/web/{serviceName}/boostHistory/{date}", {
            rootPath: "apiv6",
            urlParams: {
                serviceName,
                date
            }
        });
    };

    /**
     * Boost me I"m famous !!!
     */
    this.requestBoost = function (data) {
        const self = this;
        return OvhHttp.post("/hosting/web/{serviceName}/requestBoost", {
            rootPath: "apiv6",
            urlParams: {
                serviceName: data.serviceName
            },
            data: { offer: data.offer },
            broadcast: "hosting.tabs.boostHistory.refresh"
        }).then((task) => {
            self.pollBoostRequestState({ serviceName: data.serviceName, task });
        });
    };

    /**
     * Disable boost
     */
    this.disableBoost = function (opts) {
        const self = this;
        return OvhHttp.post("/hosting/web/{serviceName}/requestBoost", {
            rootPath: "apiv6",
            urlParams: {
                serviceName: opts.serviceName
            },
            data: { offer: null },
            broadcast: "hosting.tabs.boostHistory.refresh"
        }).then((task) => {
            self.pollBoostDisableState({ serviceName: opts.serviceName, task });
        });
    };

    /**
     * Poll boost request
     */
    this.pollBoostRequestState = function (opts) {
        const taskId = opts.task.id || opts.task;

        if (!taskId) {
            return $rootScope.$broadcast("hosting.boost.error", "");
        }

        $rootScope.$broadcast("hosting.boost.request.start", opts);

        return Poll.poll(["apiv6/hosting/web", opts.serviceName, "tasks", taskId].join("/"), null, {
            successRule: { status: "done" },
            namespace: "hosting.boost.request"
        }).then(
            (task) => {
                $rootScope.$broadcast("hosting.boost.request.done", task);
            },
            (err) => {
                $rootScope.$broadcast("hosting.boost.request.error", err);
            }
        );
    };

    /**
     * Poll disable request
     */
    this.pollBoostDisableState = function (opts) {
        const taskId = opts.task.id || opts.task;

        if (!taskId) {
            return $rootScope.$broadcast("hosting.boost.error", "");
        }

        $rootScope.$broadcast(["hosting.boost.disable", "start"].join("."), opts);

        return Poll.poll(["apiv6/hosting/web", opts.serviceName, "tasks", taskId].join("/"), null, {
            successRule: { status: "done" },
            namespace: "hosting.boost.disable"
        }).then(
            (task) => {
                $rootScope.$broadcast("hosting.boost.disable.done", task);
            },
            (err) => {
                $rootScope.$broadcast("hosting.boost.disable.error", err);
            }
        );
    };

    this.killAllPolling = function () {
        angular.forEach(["request", "disable"], (action) => {
            Poll.kill({ namespace: `hosting.boost.${action}` });
        });
    };
});
