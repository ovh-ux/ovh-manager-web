angular.module("services").service(
    "PrivateDatabaseCron",
    class PrivateDatabaseCron {
        /**
         * Constructor
         * @param $http
         * @param $q
         */
        constructor ($http, $q) {
            this.$http = $http;
            this.$q = $q;

            this.events = {
                tabCronRefresh: "privateDatabase.tabs.cron.refresh"
            };
            this.swsProxypassPath = "apiv6/hosting/privateDatabase";
        }

        getCronIds (serviceName) {
            return this.$http.get(`${this.swsProxypassPath}/${serviceName}/cron`).then((response) => response.data);
        }

        getCronDetails (serviceName, cronId) {
            return this.$http.get(`${this.swsProxypassPath}/${serviceName}/cron/${cronId}`).then((response) => response.data);
        }

        createCron (serviceName, model) {
            return this.$http
                .post(`${this.swsProxypassPath}/${serviceName}/cron`, {
                    command: model.command,
                    databaseName: model.databaseName,
                    description: model.description || undefined,
                    email: model.email || undefined,
                    frequency: model.frequency,
                    status: model.status
                })
                .then((response) => response.data)
                .catch((err) => this.$q.reject(err));
        }

        deleteCron (serviceName, cronId) {
            return this.$http.delete(`${this.swsProxypassPath}/${serviceName}/cron/${cronId}`).then((response) => response.data).catch((err) => this.$q.reject(err));
        }

        editCron (serviceName, cronId, model) {
            return this.$http
                .put(`${this.swsProxypassPath}/${serviceName}/cron/${cronId}`, {
                    command: model.command,
                    databaseName: model.databaseName,
                    description: model.description || undefined,
                    email: model.email || undefined,
                    frequency: model.frequency,
                    language: model.language,
                    status: model.status
                })
                .then((response) => response.data)
                .catch((err) => this.$q.reject(err));
        }

        static trEnum (str) {
            if (!str) {
                return "";
            }
            return str.replace(/\./g, "_");
        }
    }
);
