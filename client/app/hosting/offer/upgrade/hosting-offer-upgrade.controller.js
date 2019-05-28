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
      this.hosting = this.$scope.hosting;

      this.availableOffers = [];
      this.durations = null;
      this.loading = {
        availableOffers: true,
        durations: false,
      };
      this.model = {
        offer: null,
        startTime: '12:00',
        duration: null,
        agree: false,
        downgradeAgree: false,
      };

      this.User.getUser()
        .then((user) => {
          this.ovhSubsidiary = user.ovhSubsidiary;
        });

      this.Hosting.getAvailableOffer(_.get(this.hosting, 'serviceName', this.$stateParams.productId))
        .then((availableOffers) => {
          this.availableOffers = availableOffers
            .map(offer => ({
              name: this.$translate.instant(`hosting_dashboard_service_offer_${offer}`),
              value: offer,
            }));
        }).catch(() => {
          this.availableOffers = [];
        })
        .finally(() => {
          this.loading.availableOffers = false;
        });
    }

    getDurations() {
      this.durations = {
        available: [],
        details: {},
      };
      this.loading.durations = true;

      return this.Hosting.getUpgradePrices(_.get(this.hosting, 'serviceName', this.$stateParams.productId), this.model.offer.value)
        .then((durations) => {
          this.durations.available = durations;
          if (durations.length === 1) {
            [this.model.duration] = this.durations.available;
          }
        })
        .catch((err) => {
          this.$scope.resetAction();
          this.Alerter.alertFromSWS(this.$translate.instant('hosting_order_upgrade_error'), err, this.$scope.alerts.main);
        })
        .finally(() => {
          this.loading.durations = false;
        });
    }

    formatTime(startTime) {
      const time = moment(`T${startTime}`);
      const now = moment(moment().format('TH:m'));
      const isToday = time.diff(now) > 0;

      return isToday
        ? this.$translate.instant('hosting_order_upgrade_start_time_summary_today', { time: time.format('LT') })
        : this.$translate.instant('hosting_order_upgrade_start_time_summary_tomorrow', { time: time.format('LT') });
    }

    formatPrice(price) {
      return price.value === 0 ? this.$translate.instant('price_free') : this.$translate.instant('price_ht_label', { price: price.text });
    }

    orderUpgrade() {
      this.loading.validation = true;

      const startTime = moment(`T${this.model.startTime}`).utc().format('HH:mm:ss');

      return this.Hosting
        .orderUpgrade(
          _.get(this.hosting, 'serviceName', this.$stateParams.productId),
          this.model.offer.value,
          this.model.duration.duration,
          (this.hosting.isCloudWeb ? startTime : null),
        ).then((order) => {
          this.Alerter.success(this.$translate.instant('hosting_order_upgrade_success', { t0: order.url, t1: order.orderId }), this.$scope.alerts.main);
          this.atInternet.trackOrder({
            name: `[hosting]::${this.model.offer.value}[${this.model.offer.value}]`,
            page: 'web::payment-pending',
            orderId: order.orderId,
            priceTaxFree: order.prices.withoutTax.value,
            price: order.prices.withTax.value,
            status: 1,
          });
          this.$window.open(order.url, '_blank');
        }).catch((err) => {
          this.Alerter.alertFromSWS(this.$translate.instant('hosting_order_upgrade_error'), err, this.$scope.alerts.main);
        }).finally(() => {
          this.loading.validation = false;
          this.$scope.resetAction();
        });
    }
  },
);
