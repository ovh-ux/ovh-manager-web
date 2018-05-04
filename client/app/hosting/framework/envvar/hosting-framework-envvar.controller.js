angular.module("App").controller(
    "HostingFrameworkEnvvarCtrl",
    class HostingFrameworkEnvvarCtrl {
        constructor ($scope, $stateParams, $timeout, Alerter, Hosting, HostingFrameworkEnvvar, translator) {
            this.$scope = $scope;
            this.$stateParams = $stateParams;
            this.$timeout = $timeout;

            this.Alerter = Alerter;
            this.Hosting = Hosting;
            this.HostingFrameworkEnvvar = HostingFrameworkEnvvar;
            this.translator = translator;
        }

        $onInit () {
            this.loading = true;
            this.hasResult = false;
            this.envvars = [];
            this.maxEnvvars = 0;

            this.$scope.$on(this.Hosting.events.tabFrameworkEnvvarsRefresh, () => this.getIds());

            return this.getIds().then(() => this.loadCapabilities());
        }

        /**
         * Load all environment variables keys from API
         */
        getIds () {
            return this.HostingFrameworkEnvvar
                .list(this.$stateParams.productId)
                .then((keys) => {
                    if (!_(keys).isArray()) {
                        throw this.translator.tr("hosting_tab_FRAMEWORK_envvar_list_error_temporary");
                    }

                    this.envvars = keys.sort((a, b) => a.localeCompare(b)).map((key) => ({ key }));
                })
                .catch((err) => {
                    this.Alerter.error(this.$scope.tr("hosting_tab_FRAMEWORK_envvar_list_error") + err.message, this.$scope.alerts.main);
                })
                .finally(() => {
                    if (this.envvars.length > 0) {
                        this.hasResult = true;
                    }

                    this.loading = false;
                })
            ;
        }

        /**
         * Load an environment variable given its key
         */
        getEnvvar (row) {
            return this.HostingFrameworkEnvvar.get(this.$stateParams.productId, row.key)
                .then((envvar) => {
                    envvar.loaded = true;

                    return envvar;
                })
            ;
        }

        /**
         * Check if customer can add a new envvar
         * @returns {boolean}
         */
        canAddEnvvar () {
            return this.envvars && this.envvars.length < this.maxEnvvars;
        }

        /**
         * Load offer capabilities to check if envvars can be added
         */
        loadCapabilities () {
            return this.Hosting.getSelected(this.$stateParams.productId)
                .then((hosting) => {
                    const offer = hosting.offer.toLowerCase().replace("_", "");

                    return this.Hosting.getOfferCapabilities(offer);
                })
                .then((capabilities) => {
                    this.maxEnvvars = capabilities.envVars;
                })
                .catch((err) => {
                    this.Alerter.error(this.$scope.tr("hosting_tab_FRAMEWORK_error") + err.message, this.$scope.alerts.main);
                })
            ;
        }
    }
);
