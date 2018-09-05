angular.module('App').controller(
  'SqlDatabaseOrderCtrl',
  class SqlDatabaseOrderCtrl {
    constructor(
      $q, $scope, $stateParams, $timeout, $window,
      atInternet,
      ConverterService, Hosting, HostingDatabase, HostingOptionOrder, PrivateDatabase, User,
    ) {
      this.$q = $q;
      this.$scope = $scope;
      this.$stateParams = $stateParams;
      this.$timeout = $timeout;
      this.$window = $window;

      this.atInternet = atInternet;
      this.converterService = ConverterService;
      this.hostingService = Hosting;
      this.hostingDatabaseService = HostingDatabase;
      this.hostingOptionOrderService = HostingOptionOrder;
      this.privateDatabaseService = PrivateDatabase;
      this.User = User;
    }

    $onInit() {
      this.orderType = this.$stateParams.orderType;
      this.currentHosting = this.$stateParams.currentHosting;

      this.selectectedHosting = null;
      this.includedOffer = false;

      this.$scope.alerts = {
        order: 'privatedatabase.alerts.order',
        durations: 'privatedatabase.alerts.order.duration',
      };

      this.loading = {
        init: false,
        durations: false,
        prices: false,
        bc: false,
        window: false,
      };

      this.data = [];
      this.model = {
        type: null,
        datacenter: null,
        version: null,
        ram: null,
        dbPack: null,
        hosting: null,
        duration: null,
        contract: false,
      };

      this.getAvailableOrderCapacities();

      this.User.getUser().then((user) => {
        this.user = user;
      });
    }

    convertBytesSize(nb, unit = 'MB') {
      const res = filesize(this.converterService.convertToOctet(nb, unit), { output: 'object', round: 0, base: -1 });
      const resUnit = this.$scope.tr(`unit_size_${res.symbol}`);

      return `${res.value} ${resUnit}`;
    }

    getAvailableOrderCapacities() {
      const typeConverter = {
        dbaas: 'public',
        private: 'classic',
      };

      this.loading.init = true;

      return this.privateDatabaseService
        .getOrderModels()
        .then((models) => {
          const dbaasName = _.get(models, 'hosting.PrivateDatabase.OfferEnum').enum[1];
          const sqlName = _.get(models, 'hosting.PrivateDatabase.OfferEnum').enum[0];

          this.model.type = typeConverter[this.orderType] || sqlName;

          return this.$q
            .all({
              dbaasOrderCapacities:
                this.privateDatabaseService.getAvailableOrderCapacities(dbaasName),
              privateOrderCapacities:
                this.privateDatabaseService.getAvailableOrderCapacities(sqlName),
              hostings:
                this.hostingService.getHostings(),
              dbPack:
                this.hostingOptionOrderService.getOrderEnums('hosting.web.database.SqlPersoOfferEnum'),
            })
            .then((res) => {
              this.data.push({
                key: 'dbaas',
                offer: dbaasName,
                datacenters: res.dbaasOrderCapacities.datacenter,
                versions: res.dbaasOrderCapacities.version.sort(),
                rams: res.dbaasOrderCapacities.ram,
                dbPack: null,
                hostings: null,
                durations: null,
                nbTooltip: 6,
                tooltips: {
                  rams: {
                    min: this.convertBytesSize(_.min(res.dbaasOrderCapacities.ram)),
                    max: this.convertBytesSize(_.max(res.dbaasOrderCapacities.ram)),
                  },
                },
              });
              this.data.push({
                key: 'premium',
                offer: sqlName,
                datacenters: res.privateOrderCapacities.datacenter,
                versions: res.privateOrderCapacities.version.sort(),
                rams: res.privateOrderCapacities.ram,
                dbPack: null,
                hostings: [],
                durations: null,
                nbTooltip: 6,
                tooltips: {
                  rams: {
                    min: this.convertBytesSize(_.min(res.privateOrderCapacities.ram)),
                    max: this.convertBytesSize(_.max(res.privateOrderCapacities.ram)),
                  },
                },
              });
              this.data.push({
                key: 'start',
                offer: 'start',
                datacenters: null,
                versions: null,
                rams: null,
                dbPack: res.dbPack,
                hostings: [],
                durations: null,
                nbTooltip: 4,
              });
              return res;
            });
        })
        .then(res => this.$q
          .all(_.map(res.hostings, domainName => this.hostingService.getHosting(domainName)))
          .then((domains) => {
            this.noHostValue = 'other';

            const validDomains = _.filter(domains, 'state', 'active');

            _.find(this.data, 'key', 'start').hostings = _.map(validDomains, validDomain => ({
              name: validDomain.serviceName,
              displayName: punycode.toUnicode(validDomain.serviceName),
              datacenter: validDomain.datacenter,
            }));
            _.find(this.data, 'key', 'premium').hostings = angular.copy(_.find(this.data, 'key', 'start').hostings);
            _.find(this.data, 'key', 'premium').hostings.push({
              datacenter: null,
              displayName: this.$scope.tr('common_other'),
              name: this.noHostValue,
            });

            this.model.hosting = this.currentHosting || null;

            if (this.model.hosting) {
              this.selectectedHosting = this.findHosting(this.model.hosting);
              this.model.datacenter = this.selectectedHosting.datacenter || null;
            }
          }))
        .catch(err => this.alerter.alertFromSWS(this.$scope.tr('privateDatabase_order_step1_error'), err, this.$scope.alerts.durations))
        .finally(() => {
          this.loading.init = false;
        });
    }

    changeType() {
      this.model.datacenter = null;
      this.model.version = null;
      this.model.ram = null;
      this.model.dbPack = null;
      this.model.hosting = null;
      this.getDuration();
      this.resetOrder();
    }

    /*
       * DURATION
       */
    getDuration() {
      this.loading.durations = true;
      this.model.duration = null;
      this.resetOrder();
      const selected = this.getData(this.model.type);

      return this[`getDurations${selected.key}`](selected).then((durations) => {
        this.loading.prices = true;
        return this[`getPrices${selected.key}`](selected, durations);
      });
    }

    getDurationspremium(data) {
      const { version, ram } = this.model;

      return this.privateDatabaseService
        .orderDuration(version, ram)
        .then((durations) => {
          data.durations = _.map(durations, duration => ({ // eslint-disable-line no-param-reassign
            duration,
            details: {},
          }));
          this.model.duration = _.last(durations);
          return durations;
        })
        .catch(err => this.alerter.alertFromSWS(this.$scope.tr('privateDatabase_order_step2_duration_fail'), err, this.$scope.alerts.durations))
        .finally(() => {
          this.loading.durations = false;
        });
    }

    getDurationsdbaas(data) {
      const { version, ram } = this.model;

      return this.getDurationspremium(data, version, ram);
    }

    getDurationsstart(data) {
      const { hosting, dbPack: startDbVersion } = this.model;

      return this.hostingOptionOrderService
        .getSqlPersoAllowedDurations(hosting, startDbVersion)
        .then((durations) => {
          data.durations = _.map(durations, duration => ({ // eslint-disable-line no-param-reassign
            duration,
            details: {},
          }));
          this.model.duration = _.last(durations);
          return durations;
        })
        .catch(err => this.alerter.alertFromSWS(this.$scope.tr('privateDatabase_order_step2_duration_fail'), err, this.$scope.alerts.durations))
        .finally(() => {
          this.loading.durations = false;
        });
    }

    /*
       * PRICE
       */
    getPricespremium(data, durations) {
      const { version, ram } = this.model;

      return this.$q
        .all(_.map(
          durations,
          duration => this.privateDatabaseService
            .orderPrice(version, ram, duration)
            .then((details) => {
              _.find(data.durations, 'duration', duration).details = details;
              return details;
            }),
        ))
        .then(() => {
          if (durations && durations.length === 1) {
            this.model.duration = _.first(durations);
          }
        })
        .catch(err => this.alerter.alertFromSWS(this.$scope.tr('privateDatabase_order_step2_price_fail'), err, this.$scope.alerts.order))
        .finally(() => { this.loading.prices = false; });
    }

    getPricesdbaas(data, durations) {
      return this.getPricespremium(data, durations);
    }

    getPricesstart(data, durations) {
      const { hosting, dbPack: startDbVersion } = this.model;

      return this.$q
        .all(_.map(durations, duration => this.hostingOptionOrderService
          .getSqlPersoPrice(hosting, startDbVersion, duration)
          .then((details) => {
            _.find(data.durations, 'duration', duration).details = details;
            return details;
          })))
        .then(() => {
          if (durations && durations.length === 1) {
            this.model.duration = _.first(durations);
          }
        })
        .catch(err => this.alerter.alertFromSWS(this.$scope.tr('privateDatabase_order_step2_price_fail'), err, this.$scope.alerts.order))
        .finally(() => { this.loading.prices = false; });
    }

    /*
       * BC
       */
    generateBc() {
      if (!this.model.contract) {
        return null;
      }
      this.loading.window = true;
      return this[`generateBc${this.getData(this.model.type).key}`]();
    }

    generateBcpremium() {
      this.loading.bc = true;

      return this.privateDatabaseService
        .orderPrivateDatabase(
          this.model.version,
          this.model.ram,
          this.model.duration,
          this.model.datacenter,
        )
        .then((details) => {
          this.order = details;
          this.$timeout(() => {
            this.loading.window = false;
            this.openBc();
          }, 5000);
        })
        .catch(err => this.alerter.alertFromSWS(this.$scope.tr('privateDatabase_order_step3_fail'), err, this.$scope.alerts.order))
        .finally(() => {
          this.loading.bc = false;
        });
    }

    generateBcdbaas() {
      this.loading.bc = true;

      return this.privateDatabaseService
        .orderDBaaS(this.model.version, this.model.ram, this.model.duration, this.model.datacenter)
        .then((details) => {
          this.order = details;
          this.$timeout(() => {
            this.loading.window = false;
            this.openBc();
          }, 5000);
        })
        .catch(err => this.alerter.alertFromSWS(this.$scope.tr('privateDatabase_order_step3_fail'), err, this.$scope.alerts.order))
        .finally(() => { this.loading.bc = false; });
    }

    generateBcstart() {
      this.loading.bc = true;

      return this.hostingOptionOrderService
        .orderSqlPerso(this.model.hosting, this.model.dbPack, this.model.duration)
        .then((details) => {
          this.order = details;
          this.$timeout(() => {
            this.loading.window = false;
            this.openBc();
          }, 5000);
        })
        .catch(err => this.alerter.alertFromSWS(this.$scope.tr('privateDatabase_order_step3_fail'), err, this.$scope.alerts.order))
        .finally(() => { this.loading.bc = false; });
    }

    /*
       * ORDER
       */
    canOrder() {
      return !this.loading.bc && !this.loading.window;
    }

    canOrderpremium() {
      return this.model.contract
        && this.model.duration
        && this.model.ram
        && this.model.hosting
        && this.model.datacenter
        && this.model.version;
    }

    canOrderdbaas() {
      return this.model.contract
        && this.model.duration
        && this.model.ram
        && this.model.datacenter
        && this.model.version;
    }

    canOrderstart() {
      return this.model.contract
        && this.model.duration
        && this.model.hosting
        && this.model.datacenter
        && this.model.dbPack;
    }

    /*
       * UTILS
       */
    getData(type) {
      return _.find(this.data, 'offer', type);
    }

    getDurationDetails(type, duration) {
      if (!duration) {
        return null;
      }
      return _.find(this.getData(type).durations, 'duration', duration).details;
    }

    setDatacenter() {
      if (_.isEmpty(this.selectectedHosting) || this.selectectedHosting === this.noHostValue) {
        return;
      }
      this.model.hosting = this.selectectedHosting.name;
      this.model.datacenter = this.selectectedHosting.datacenter || null;
    }

    openBc() {
      this.atInternet.trackOrder({
        name: `[sql-${this.model.type}]::${this.model.version || this.model.dbPack}[${this.model.version || this.model.dbPack}]`,
        page: 'web::payment-pending',
        orderId: this.order.orderId,
        priceTaxFree: this.order.prices.withoutTax.value,
        price: this.order.prices.withTax.value,
        status: 1,
      });
      this.$window.open(this.order.url);
    }

    findHosting(name) {
      return _.find(this.getData(this.model.type).hostings, 'name', name);
    }

    isCloudDbOrPrivateDb() {
      return this.isCloudDb() || this.isPrivateDb();
    }

    isCloudDb() {
      return this.getData(this.model.type).key === 'dbaas';
    }

    isPrivateDb() {
      return this.getData(this.model.type).key === 'premium';
    }

    isStart() {
      return this.getData(this.model.type).key === 'start';
    }

    resetOrder() {
      this.order = null;
    }
  },
);
