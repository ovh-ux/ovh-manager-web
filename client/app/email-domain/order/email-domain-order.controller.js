angular.module('App').controller(
  'MXPlanOrderCtrl',
  class MXPlanOrderCtrl {
    /**
   * Constructor
   * @param $scope
   * @param $q
   * @param Alerter
   * @param atInternet
   * @param Domain
   * @param MXPlan
   * @param User
   */
    constructor($scope, $q, $window, Alerter, atInternet, Domain, MXPlan, User) {
      this.$scope = $scope;
      this.$q = $q;
      this.$window = $window;
      this.Alerter = Alerter;
      this.atInternet = atInternet;
      this.Domain = Domain;
      this.MXPlan = MXPlan;
      this.User = User;
    }

    $onInit() {
      this.list = {
        domains: [],
        offers: [],
      };
      this.loading = {
        bc: false,
        init: false,
        offers: false,
      };
      this.order = null;
      this.selectedOrder = {
        config: {
          domain: null,
          offer: null,
        },
        duration: null,
        contractsValidated: false,
      };
      this.urls = {};

      this.$scope.alerts = {
        order: 'mxPlan.alerts.order',
        durations: 'mxPlan.alerts.order.duration',
      };

      this.initialLoad();
    }

    initialLoad() {
      this.loading.init = true;
      this.User.getUrlOfEndsWithSubsidiary('MX_PLAN').then((page) => {
        this.urls.mxPlanProductDescription = page;
      });

      return this.Domain.getDomains()
        .then((domains) => { this.list.domains = domains; })
        .catch(() => this.Alerter.error(this.$scope.tr('mxPlan_order_step1_error'), this.$scope.alerts.order))
        .finally(() => { this.loading.init = false; });
    }

    fetchOffers() {
      this.loading.offers = true;
      this.selectedOrder.offer = null;
      this.list.offers = [];

      return this.MXPlan
        .getOrderModels(this.selectedOrder.config.domain)
        .then((response) => { this.list.offers = response; })
        .catch((err) => {
          this.list.offers = _.filter(err, offer => offer.offer);
          const errors = _.filter(err, offer => offer.message);
          if (this.list.offers.length <= 0) {
            this.Alerter.error(this.$scope.tr('mxPlan_order_step1_error', errors[0].message), this.$scope.alerts.order);
          }
        })
        .finally(() => { this.loading.offers = false; });
    }

    selectOffer() {
      this.selectedOrder.contractsValidated = false;
      if (this.selectedOrder.config.domain
          && this.selectedOrder.config.domain.length
          && this.selectedOrder.config.offer
          && this.selectedOrder.config.offer.length) {
        this.order = null;
        this.selectedOrder.duration = null;
        this.getDurations();
      }
    }

    getDurations() {
      this.loading.durations = true;
      this.Alerter.resetMessage(this.$scope.alerts.durations);
      this.durations = {
        available: null,
        details: {},
      };

      return this.MXPlan
        .orderDuration(this.selectedOrder.config.domain, this.selectedOrder.config.offer)
        .then((durations) => {
          this.durations.available = durations;
          return this.loadPrices(durations);
        })
        .catch(err => this.Alerter.alertFromSWS(this.$scope.tr('mxPlan_order_step2_duration_fail'), err, this.$scope.alerts.durations))
        .finally(() => { this.loading.durations = false; });
    }

    loadPrices(durations) {
      this.loading.prices = true;
      const queue = _.map(durations, duration =>
        this.MXPlan
          .orderPrice(this.selectedOrder.config.domain, this.selectedOrder.config.offer, duration)
          .then((details) => {
            this.durations.details[duration] = details;
          }));

      return this.$q
        .all(queue)
        .then(() => {
          if (durations && durations.length === 1) {
            [this.selectedOrder.duration] = durations;
          }
        })
        .catch(err => this.Alerter.alertFromSWS(this.$scope.tr('mxPlan_order_step2_price_fail'), err, this.$scope.alerts.order))
        .finally(() => {
          this.loading.prices = false;
        });
    }

    generateBc() {
      this.loading.bc = true;
      this.MXPlan
        .orderMxPlan(
          this.selectedOrder.config.domain,
          this.selectedOrder.offer.offer,
          this.selectedOrder.offer.duration,
        )
        .then((details) => { this.order = details; })
        .catch(err => this.Alerter.alertFromSWS(this.$scope.tr('mxPlan_order_step3_fail'), err, this.$scope.alerts.order))
        .catch(() => { this.loading.bc = false; });
    }

    openBc() {
      this.atInternet.trackOrder({
        name: `[mxplan]::MX-${this.selectedOrder.offer.offer}[MX-${this.selectedOrder.offer.offer}]`,
        page: 'web::payment-pending',
        orderId: this.order.orderId,
        priceTaxFree: this.order.prices.withoutTax.value,
        price: this.order.prices.withTax.value,
        status: 1,
      });
      this.$window.open(this.order.url);
      this.$onInit();
    }
  },
);
