angular.module("services").service(
    "HostingFrameworkRuntime",
    class HostingFrameworkRuntime {

        /**
         * @constructs HostingFrameworkRuntime
         * @param $q
         * @param OvhHttp
         * @param Hosting
         */
        constructor ($q, OvhHttp, Hosting) {
            this.$q = $q;
            this.OvhHttp = OvhHttp;
            this.Hosting = Hosting;
        }

        /**
         * List all runtime configurations on hosting
         * @param serviceName
         * @param filters
         */
        list (serviceName, filters) {
            const promises = [];

            if (angular.isArray(filters)) {
                filters.forEach((filter) => {
                    promises.push(
                        this.OvhHttp.get(`/hosting/web/${serviceName}/runtime`, {
                            rootPath: "apiv6",
                            params: filter
                        })
                    );
                });
            } else {
                promises.push(
                    this.OvhHttp.get(`/hosting/web/${serviceName}/runtime`, {
                        rootPath: "apiv6"
                    })
                );
            }

            return this.$q.allSettled(promises).then(
                (data) => {
                    let result = [];
                    data.forEach((res) => {
                        result = result.concat(res);
                    });

                    return _.uniq(result);
                },

                (err) => this.$q.reject(err)
            );
        }

        /**
         * Get runtime configuration informations
         * @param serviceName
         * @param id
         */
        get (serviceName, id) {
            return this.OvhHttp.get(`/hosting/web/${serviceName}/runtime/${id}`, {
                rootPath: "apiv6"
            });
        }

        /**
         * Get runtime attached domains
         * @param serviceName
         * @param id
         */
        getAttachedDomains (serviceName, id) {
            return this.OvhHttp.get(`/hosting/web/${serviceName}/runtime/${id}/attachedDomains`, {
                rootPath: "apiv6"
            });
        }

        /**
         * Get runtime available backend types
         * @param {string} serviceName
         */
        getAvailableTypes (serviceName) {
            return this.OvhHttp.get(`/hosting/web/${serviceName}/runtimeAvailableTypes`, {
                rootPath: "apiv6"
            });
        }

        /**
         * Create a runtime configuration on hosting
         * @param serviceName
         * @param model
         */
        create (serviceName, model) {
            return this.OvhHttp.post(`/hosting/web/${serviceName}/runtime`, {
                rootPath: "apiv6",
                data: {
                    name: model.name,
                    type: model.type,
                    publicDir: model.publicDir,
                    appEnv: model.appEnv,
                    appBootstrap: model.appBootstrap
                }
            }).then(
                (data) => {
                    this.Hosting.resetRuntimes();

                    return data;
                },

                (http) => this.$q.reject(http)
            );
        }

        /**
         * Update a runtime configuration on hosting
         * @param serviceName
         * @param id
         * @param model
         */
        edit (serviceName, id, model) {
            return this.OvhHttp.put(`/hosting/web/${serviceName}/runtime/${id}`, {
                rootPath: "apiv6",
                data: {
                    name: model.name,
                    type: model.type,
                    publicDir: model.publicDir,
                    appEnv: model.appEnv,
                    appBootstrap: model.appBootstrap
                }
            }).then((data) => {
                this.Hosting.resetRuntimes();

                return data;
            });

        }

        /**
         * Delete a runtime configuration on hosting
         * @param serviceName
         * @param id
         */
        delete (serviceName, id) {
            return this.OvhHttp.delete(`/hosting/web/${serviceName}/runtime/${id}`, {
                rootPath: "apiv6"
            }).then(
                (data) => {
                    this.Hosting.resetRuntimes();

                    return data;
                },

                (http) => this.$q.reject(http)
            );
        }

        /**
         * Set a runtime configuration to default on hosting
         * @param serviceName
         * @param model
         * @param id
         */
        setDefault (serviceName, id) {
            return this.OvhHttp.put(`/hosting/web/${serviceName}/runtime/${id}`, {
                rootPath: "apiv6",
                data: {
                    isDefault: true
                }
            }).then(
                (data) => {
                    this.Hosting.resetRuntimes();

                    return data;
                },

                (http) => this.$q.reject(http)
            );
        }
    }
);
