angular.module("services").service(
    "HostingFrameworkEnvvar",
    class HostingFrameworkEnvvar {

        /**
         * @constructs HostingFrameworkEnvvar
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
         * Get list of envvars on hosting
         * @param serviceName
         * @param filters
         */
        list (serviceName, filters) {
            const promises = [];

            if (angular.isArray(filters)) {
                filters.forEach((filter) => {
                    promises.push(
                        this.OvhHttp.get(`/hosting/web/${serviceName}/envVar`, {
                            rootPath: "apiv6",
                            params: filter
                        })
                    );
                });
            } else {
                promises.push(
                    this.OvhHttp.get(`/hosting/web/${serviceName}/envVar`, {
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
         * Get envvar informations
         * @param serviceName
         * @param key
         */
        get (serviceName, key) {
            return this.OvhHttp.get(`/hosting/web/${serviceName}/envVar/${key}`, {
                rootPath: "apiv6"
            });
        }

        /**
         * Create an envvar on hosting configuration
         * @param serviceName
         * @param key
         * @param type
         * @param value
         */
        create (serviceName, { key, type, value }) {
            return this.OvhHttp.post(`/hosting/web/${serviceName}/envVar`, {
                rootPath: "apiv6",
                data: {
                    key,
                    type,
                    value
                }
            }).then(
                (data) => {
                    this.Hosting.resetEnvvars();

                    return data;
                },

                (http) => this.$q.reject(http)
            );
        }

        /**
         * Edit an envvar on hosting configuration
         * @param serviceName
         * @param oldKey
         * @param key
         * @param type
         * @param value
         */
        edit (serviceName, oldKey, { key, type, value }) {
            return this.OvhHttp.put(`/hosting/web/${serviceName}/envVar/${oldKey}`, {
                rootPath: "apiv6",
                data: {
                    key,
                    type,
                    value
                }
            }).then((data) => {
                this.Hosting.resetEnvvars();

                return data;
            });
        }

        /**
         * Delete an envvar on hosting configuration
         * @param serviceName
         * @param key
         */
        delete (serviceName, key) {
            return this.OvhHttp.delete(`/hosting/web/${serviceName}/envVar/${key}`, {
                rootPath: "apiv6"
            }).then(
                (data) => {
                    this.Hosting.resetEnvvars();

                    return data;
                },

                (http) => this.$q.reject(http)
            );
        }
    }
);
