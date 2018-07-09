angular.module('App').controller(
  'HostingRuntimesCtrl',
  class HostingRuntimesCtrl {
    /**
         * @constructs HostingRuntimesCtrl
         * @param $scope
         * @param $stateParams
         * @param $timeout
         * @param Alerter
         * @param Hosting
         * @param HostingRuntimes
         */
    constructor($q, $scope, $stateParams, $timeout, Alerter, Hosting, HostingRuntimes, translator) {
      this.$q = $q;
      this.$scope = $scope;
      this.$stateParams = $stateParams;
      this.$timeout = $timeout;

      this.Alerter = Alerter;
      this.Hosting = Hosting;
      this.HostingRuntimes = HostingRuntimes;
      this.translator = translator;
    }

    /**
         * Initialize HostingRuntimesCtrl
         */
    $onInit() {
      this.hasResult = false;
      this.loading = true;
      this.runtimes = [];
      this.maxRuntimes = 0;

      this.$scope.$on(this.Hosting.events.tabRuntimesRefresh, () => this.getIds());

      return this.getIds()
        .finally(() => this.loadCapabilities())
        .finally(() => {
          this.loading = false;
        });
    }

    /**
         * Load all runtimes ids from API
         */
    getIds() {
      return this.HostingRuntimes.list(this.$stateParams.productId)
        .then((ids) => {
          if (!_(ids).isArray()) {
            throw this.translator.tr('hosting_tab_RUNTIMES_list_error');
          }

          this.runtimes = ids.sort().map(id => ({ id }));
        })
        .then(() => this.$q.all(this.runtimes.map(row => this.HostingRuntimes
          .get(this.$stateParams.productId, row.id)
          .then((data) => {
            const runtime = _(data).clone();
            runtime.countAttachedDomains = 0;

            return this.HostingRuntimes
              .getAttachedDomains(this.$stateParams.productId, runtime.id)
              .then((attachedDomains) => {
                runtime.loaded = true;

                if (_(attachedDomains).isArray()) {
                  runtime.countAttachedDomains = attachedDomains.length;
                }

                return runtime;
              });
          }))))
        .then((runtimes) => {
          this.runtimes = runtimes;
        })
        .catch((err) => {
          this.Alerter.error(this.$scope.tr('hosting_tab_RUNTIMES_list_error') + err.message, this.$scope.alerts.main);
        })
        .finally(() => {
          this.hasResult = _(this.runtimes).isArray() && !_(this.runtimes).isEmpty();
        });
    }

    /**
         * Load offer capabilities to check out if runtime can be added
         */
    loadCapabilities() {
      this.Hosting.getSelected(this.$stateParams.productId)
        .then((hosting) => {
          const offer = hosting.offer.toLowerCase().replace('_', '');

          return this.Hosting.getOfferCapabilities(offer);
        })
        .then((capabilities) => {
          this.maxRuntimes = capabilities.runtimes;
        })
        .catch((err) => {
          this.Alerter.error(this.$scope.tr('hosting_tab_RUNTIMES_error') + err.message, this.$scope.alerts.main);
        });
    }

    /**
         * Check if customer can add a new runtime
         * @returns {boolean}
         */
    canAddRuntime() {
      return _(this.runtimes).isArray() && this.runtimes.length < this.maxRuntimes;
    }
  },
);
