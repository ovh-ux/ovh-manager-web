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
            this.loading = true;
            this.runtimes = [];
            this.maxRuntimes = 0;

            this.$scope.$on(this.Hosting.events.tabFrameworkRuntimesRefresh, () => this.getIds());

            this.getIds();
            this.loadCapabilities();
        }

        /**
         * Load all runtimes ids from API
         */
        getIds () {
            return this.HostingFrameworkRuntime.list(this.$stateParams.productId)
                .then((ids) => {
                    if (ids) {
                        const runtimeIds = ids.sort((a, b) => a < b);

                        this.runtimes = runtimeIds.map((id) => ({ id }));
                    }
                })
                .catch((err) => {
                    this.Alerter.error(this.$scope.tr("hosting_tab_FRAMEWORK_runtime_list_error") + err.message, this.$scope.alerts.main);
                })
                .finally(() => {
                    if (this.runtimes.length > 0) {
                        this.hasResult = true;
                    }

                    this.loading = false;
                })
            ;
        }

        /**
         * Load a runtime given its id
         */
        getRuntime (row) {
            let runtime = null;

            return this.HostingFrameworkRuntime.get(this.$stateParams.productId, row.id)
                .then((data) => {
                    runtime = data;
                    runtime.countAttachedDomains = 0;

                    return this.HostingFrameworkRuntime.getAttachedDomains(this.$stateParams.productId, runtime.id);
                })
                .then((attachedDomains) => {
                    runtime.countAttachedDomains = attachedDomains.length;
                    runtime.loaded = true;

                    return runtime;
                })
            ;
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
                    this.maxRuntimes = capabilities.runtimes;
                })
                .catch((err) => {
                    this.Alerter.error(this.$scope.tr("hosting_tab_FRAMEWORK_error") + err.message, this.$scope.alerts.main);
                })
            ;
        }

        /**
         * Check if customer can add a new runtime
         * @returns {boolean}
         */
        canAddRuntime () {
            return _(this.runtimes).isArray() && this.runtimes.length < this.maxRuntimes;
        }
    }
);
