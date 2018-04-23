angular.module("App").controller(
    "HostingFrameworkRuntimeCtrl",
    class HostingFrameworkRuntimeCtrl {

        /**
         * @constructs HostingFrameworkRuntimeCtrl
         * @param $scope
         * @param $stateParams
         * @param $timeout
         * @param Alerter
         * @param Hosting
         * @param HostingFrameworkRuntime
         */
        constructor ($scope, $stateParams, $timeout, Alerter, Hosting, HostingFrameworkRuntime) {
            this.$scope = $scope;
            this.$stateParams = $stateParams;
            this.$timeout = $timeout;
            this.Alerter = Alerter;
            this.Hosting = Hosting;
            this.HostingFrameworkRuntime = HostingFrameworkRuntime;
        }

        /**
         * Initialize HostingFrameworkRuntimeCtrl
         */
        $onInit () {
            this.hasResult = false;
            this.loading = {
                runtimes: false,
                init: true
            };

            this.runtimes = {
                ids: [],
                details: [],
                quotas: 0
            };

            this.search = null;

            this.$scope.onTransformItem = (id) => this.onTransformItem(id);
            this.$scope.onTransformItemDone = () => this.onTransformItemDone();
            this.$scope.onRefresh = () => this.onRefresh();

            this.$scope.$on(this.Hosting.events.tabFrameworkRuntimesRefresh, () => this.onRefresh());

            this.loadRuntimes();
            this.loadCapabilities();
        }

        /**
         * Load all runtime configurations on hosting
         */
        loadRuntimes () {
            this.loading.runtimes = true;

            let filters = null;
            if (this.search) {
                filters = [
                    { name: `%${this.search}%` }
                ];
            }

            this.HostingFrameworkRuntime.list(this.$stateParams.productId, filters)
                .then((ids) => {
                    this.runtimes.ids = ids;
                })
                .catch((err) => {
                    this.Alerter.error(this.$scope.tr("hosting_tab_FRAMEWORK_runtime_list_error") + err.message, this.$scope.alerts.main);
                })
                .finally(() => {
                    if (!_.isEmpty(this.runtimes.ids)) {
                        this.hasResult = true;
                    }

                    this.loading.runtimes = false;
                    this.loading.init = false;
                })
            ;
        }

        /**
         * Check if customer can add a new runtime
         * @returns {boolean}
         */
        canAddRuntime () {
            return this.runtimes.ids && this.runtimes.ids.length < this.runtimes.quotas;
        }

        /**
         * Load offer capabilities to check out if runtime can be added
         */
        loadCapabilities () {
            this.Hosting.getSelected(this.$stateParams.productId)
                .then((hosting) => {
                    const offer = hosting.offer.toLowerCase().replace("_", "");

                    return this.Hosting.getOfferCapabilities(offer);
                })
                .then((capabilities) => {
                    this.runtimes.quotas = capabilities.runtimes;
                })
                .catch((err) => {
                    this.Alerter.error(this.$scope.tr("hosting_tab_FRAMEWORK_error") + err.message, this.$scope.alerts.main);
                })
            ;
        }

        /**
         * Transform runtime id into fully runtime object
         * @param id
         */
        onTransformItem (id) {
            let runtime = null;

            return this.HostingFrameworkRuntime.get(this.$stateParams.productId, id)
                .then((data) => {
                    runtime = data;

                    return this.HostingFrameworkRuntime.getAttachedDomains(this.$stateParams.productId, id);
                })
                .then((attachedDomains) => {
                    runtime.countAttachedDomains = attachedDomains.length;

                    return runtime;
                })
            ;
        }

        /**
         * Event called when runtime transformation is done
         */
        onTransformItemDone () {
            this.loading.runtimes = false;
        }

        /**
         * Refresh runtimes list
         */
        onRefresh () {
            this.loading.runtimes = true;
            this.runtimes.ids = null;
            this.runtimes.details = [];

            this.loadRuntimes();
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
