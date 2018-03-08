angular.module("App").controller(
    "HostingFrameworkEnvvarCtrl",
    class HostingFrameworkEnvvarCtrl {

        /**
         * @constructs HostingFrameworkEnvvarCtrl
         * @param $scope
         * @param $stateParams
         * @param $timeout
         * @param Alerter
         * @param Hosting
         * @param HostingFrameworkEnvvar
         */
        constructor ($scope, $stateParams, $timeout, Alerter, Hosting, HostingFrameworkEnvvar) {
            this.$scope = $scope;
            this.$stateParams = $stateParams;
            this.$timeout = $timeout;
            this.Alerter = Alerter;
            this.Hosting = Hosting;
            this.HostingFrameworkEnvvar = HostingFrameworkEnvvar;
        }

        /**
         * Initialize HostingFrameworkEnvvarCtrl
         */
        $onInit () {
            this.hasResult = false;
            this.loading = {
                envvars: false,
                init: true
            };

            this.envvars = {
                ids: [],
                details: [],
                quotas: 0
            };

            this.search = null;

            this.$scope.onTransformItem = (id) => this.onTransformItem(id);
            this.$scope.onTransformItemDone = () => this.onTransformItemDone();
            this.$scope.onRefresh = () => this.onRefresh();

            this.$scope.$on(this.Hosting.events.tabFrameworkEnvvarsRefresh, () => this.onRefresh());

            this.loadEnvvars();
            this.loadCapabilities();
        }

        /**
         * Load all environment variables on hosting
         */
        loadEnvvars () {
            this.loading.envvars = true;

            let filters = null;
            if (this.search) {
                filters = [
                    { type: this.search }
                ];
            }

            this.HostingFrameworkEnvvar.list(this.$stateParams.productId, filters)
                .then((ids) => {
                    this.envvars.ids = ids;
                })
                .catch((err) => {
                    this.Alerter.error(this.$scope.tr("hosting_tab_FRAMEWORK_envvar_list_error") + err.message, this.$scope.alerts.main);
                })
                .finally(() => {
                    if (!_.isEmpty(this.envvars.ids)) {
                        this.hasResult = true;
                    }

                    this.loading.envvars = false;
                    this.loading.init = false;
                })
            ;
        }

        /**
         * Check if customer can add a new envvar
         * @returns {boolean}
         */
        canAddEnvvar () {
            return this.envvars.ids && this.envvars.ids.length < this.envvars.quotas;
        }

        /**
         * Load offer capabilities to check if envvars can be added
         */
        loadCapabilities () {
            this.Hosting.getSelected(this.$stateParams.productId)
                .then((hosting) => {
                    const offer = hosting.offer.toLowerCase().replace("_", "");

                    return this.Hosting.getOfferCapabilities(offer);
                })
                .then((capabilities) => {
                    this.envvars.quotas = capabilities.envVars;
                })
                .catch((err) => {
                    this.Alerter.error(this.$scope.tr("hosting_tab_FRAMEWORK_error") + err.message, this.$scope.alerts.main);
                })
            ;
        }

        /**
         * Transform envvar id into fully envvar object
         * @param id
         */
        onTransformItem (id) {
            return this.HostingFrameworkEnvvar.get(this.$stateParams.productId, id);
        }

        /**
         * Event called when envvar transformation is done
         */
        onTransformItemDone () {
            this.loading.envvars = false;
        }

        /**
         * Refresh envvars list
         */
        onRefresh () {
            this.loading.envvars = true;
            this.envvars.ids = null;
            this.envvars.details = [];

            this.loadEnvvars();
        }

        /**
         * Search a needle in configurations list
         * @param newValue
         */
        onSearch (newValue) {
            if (this.search !== null) {
                if (this.search === "" || this.search === newValue) {
                    this.onRefresh();
                }
            }
        }

    }
);
