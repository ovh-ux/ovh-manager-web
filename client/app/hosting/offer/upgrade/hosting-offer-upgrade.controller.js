angular.module('App').controller(
  'HostingUpgradeOfferCtrl',
  class HostingUpgradeOfferCtrl {
    constructor($scope, $rootScope, $stateParams, $translate, $window,
      Alerter, atInternet, Hosting, User) {
      this.$scope = $scope;
      this.$rootScope = $rootScope;
      this.$stateParams = $stateParams;
      this.$translate = $translate;
      this.$window = $window;
      this.Alerter = Alerter;
      this.atInternet = atInternet;
      this.Hosting = Hosting;
      this.User = User;
    }

    $onInit() {
      this.hosting = this.$scope.currentActionData;

      this.availableOffers = [];
      this.downgradeAgree = false;
      this.durations = null;
      this.loading = {
        availableOffer: true,
        durations: false,
      };
      this.model = {
        capacity: null,
        duration: null,
      };

      this.$scope.orderUpgrade = () => this.orderUpgrade();
      this.$scope.getDurations = () => this.getDurations();
      this.$scope.loadContracts = () => this.loadContracts();
      this.$scope.backToContracts = () => this.backToContracts();

      this.User.getUser()
        .then((user) => {
          this.ovhSubsidiary = user.ovhSubsidiary;
        });

      this.Hosting.getAvailableOffer(_.get(this.hosting, 'serviceName', this.$stateParams.productId))
        .then((availableOffer) => {
          this.availableOffers = availableOffer;
        })
        .catch(() => {
          this.availableOffers = [];
        })
        .finally(() => {
          this.loading.availableOffer = false;
        });
    }

    /* Step 1 */
    orderByOffer(offer) {
      return this.$translate.instant(`hosting_dashboard_service_offer_${offer}`) || offer;
    }

    /* Step 2 */
    getDurations() {
      this.durations = {
        available: [],
        details: {},
      };
      this.loading.durations = true;

      return this.Hosting.getUpgradePrices(_.get(this.hosting, 'serviceName', this.$stateParams.productId), this.model.capacity)
        .then((durations) => {
          this.durations.available = durations;
          if (durations.length === 1) {
            [this.model.duration] = this.durations.available;
          }
        }, (err) => {
          this.$scope.resetAction();
          this.Alerter.alertFromSWS(this.$translate.instant('hosting_order_upgrade_error'), err, this.$scope.alerts.main);
        }, (durations) => {
          this.durations.available = durations;
        })
        .finally(() => {
          this.loading.durations = false;
        });
    }

    /* Step 3 */
    loadContracts() {
      this.agree = false;
      if (!this.model.duration.contracts || !this.model.duration.contracts.length) {
        this.$rootScope.$broadcast('wizard-goToStep', 4);
      }
    }

    /* Step 4 */
    backToContracts() {
      if (!this.model.duration.contracts || !this.model.duration.contracts.length) {
        this.$rootScope.$broadcast('wizard-goToStep', 3);
      }
    }

    getResumePrice(price) {
      return price.value === 0 ? this.$translate.instant('price_free') : this.$translate.instant('price_ht_label', { price: price.text });
    }

    orderUpgrade() {
      this.loading.validation = true;

      return this.Hosting.orderUpgrade(_.get(this.hosting, 'serviceName', this.$stateParams.productId), this.model.capacity, this.model.duration.duration)
        .then((order) => {
          this.Alerter.success(this.$translate.instant('hosting_order_upgrade_success', { t0: order.url, t1: order.orderId }), this.$scope.alerts.main);
          this.atInternet.trackOrder({
            name: `[hosting]::${this.model.capacity}[${this.model.capacity}]`,
            page: 'web::payment-pending',
            orderId: order.orderId,
            priceTaxFree: order.prices.withoutTax.value,
            price: order.prices.withTax.value,
            status: 1,
          });
          this.$window.open(order.url, '_blank');
        })
        .catch((err) => {
          this.Alerter.alertFromSWS(this.$translate.instant('hosting_order_upgrade_error'), err, this.$scope.alerts.main);
        })
        .finally(() => {
          this.loading.validation = false;
          this.$scope.resetAction();
        });
    }
  },
);
