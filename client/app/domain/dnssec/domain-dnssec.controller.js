angular.module('controllers').controller(
  'DomainDnssecTabCtrl',
  class DomainDnssecTabCtrl {
    constructor(
      $scope,
      $q,
      $stateParams,
      Alerter,
      Domain,
      Products,
      constants,
    ) {
      this.$scope = $scope;
      this.$q = $q;
      this.$stateParams = $stateParams;
      this.Alerter = Alerter;
      this.Domain = Domain;
      this.Products = Products;
      this.constants = constants;
    }

    $onInit() {
      this.const = {
        ALGORITHM_OPTIONS: this.constants.algorithm_options,
        ALTERABLE_DNSSEC_SERVER_TYPE: 'EXTERNAL',
        FLAGS_OPTIONS: this.constants.flags_options,
        MAX_AMOUNT_DNSSEC: 4,
        PUBLIC_KEY_REGEX: null,
        TAG_MIN: 1,
        TAG_MAX: 65536,
      };
      this.editMode = false;
      this.loading = false;
      this.product = null;

      this.$scope.$on('domain.tabs.dnssec.save', () =>
        this.saveModifications());

      this.loadDnssec();
    }

    isModifiable() {
      if (!this.product) {
        return false;
      }
      return (
        this.product.nameServerType ===
          this.const.ALTERABLE_DNSSEC_SERVER_TYPE &&
        !this.product.managedByOvh &&
        !this.hasActiveTask
      );
    }

    isNotModifiableByActiveTask() {
      if (!this.product) {
        return false;
      }
      return (
        this.product.nameServerType ===
          this.const.ALTERABLE_DNSSEC_SERVER_TYPE &&
        !this.product.managedByOvh &&
        this.hasActiveTask &&
        this.product.dnssecSupported
      );
    }

    loadDnssec() {
      this.loading = true;
      this.dnssecListSave = [];
      this.keyAlgorithmEnum = [];
      this.keyFlagEnum = [];

      return this.$q
        .all({
          product: this.Domain.getSelected(this.$stateParams.productId),
          pendingTasks: this.getPendingTasks(this.$stateParams.productId),
          dnsSecs: this.getDnsSecs(this.$stateParams.productId),
          models: this.Domain.getDomainModels(),
        })
        .then(({ product, models }) => {
          this.product = product;
          this.keyAlgorithmEnum = _.map(
            models.models['dnssec.KeyAlgorithmEnum'].enum,
            algorithm => +algorithm,
          );
          this.keyFlagEnum = _.map(
            models.models['dnssec.KeyFlagEnum'].enum,
            flag => +flag,
          );
        })
        .catch(err =>
          this.Alerter.alertFromSWS(
            this.$scope.tr('domain_tab_DNSSEC_loading_error'),
            _.get(err, 'data', err),
            this.$scope.alerts.main,
          ))
        .finally(() => {
          this.dnssecListSave = _.slice(this.dnssecList);
          this.loading = false;
        });
    }

    getDnsSecs(domain) {
      this.dnssecList = [];
      return this.Domain.getDnssecList(domain).then(dnssecList =>
        this.$q.all(_.map(dnssecList, dnsSecName =>
          this.Domain.getDnssec(domain, dnsSecName).then(dnssec =>
            this.dnssecList.push(dnssec)))));
    }

    static getLabel(key, options) {
      const option = _.find(
        options,
        currentOption => currentOption.value === key,
      );
      if (!option) {
        return key;
      }
      return option.label;
    }

    getPendingTasks(domain) {
      this.hasActiveTask = 0;
      _.forEach(['todo', 'doing', 'error'], status =>
        this.Domain.getDomainPendingTasks(domain, {
          function: 'DomainDnsUpdate',
          status,
        }).then((tasks) => {
          this.hasActiveTask += tasks.length > 0 ? 1 : 0;
        }));
    }

    addRecord() {
      this.dnssecList.push({
        id: this.nextAvailableId(),
        tag: 0,
        flags: null,
        algorithm: null,
        publicKey: null,
      });
    }

    nextAvailableId() {
      return _.find(
        _.range(this.const.MAX_AMOUNT_DNSSEC),
        id => !_.any(this.dnssecList, { id }),
      );
    }

    deleteRecord(dnssec) {
      _.remove(this.dnssecList, dnssec);
    }

    reset() {
      this.dnssecList = _.slice(this.dnssecListSave);
      this.editMode = false;
    }

    saveModifications() {
      this.loading = true;
      return this.Domain.saveDnssecList(this.product.name, {
        keys: this.dnssecList,
      })
        .then(() =>
          this.Alerter.success(
            this.$scope.tr('domain_tab_DNSSEC_action_add_success'),
            this.$scope.alerts.main,
          ))
        .catch(err =>
          this.Alerter.alertFromSWS(
            this.$scope.tr('domain_tab_DNSSEC_action_add_error'),
            err,
            this.$scope.alerts.main,
          ))
        .finally(() => this.loadDnssec());
    }
  },
);
