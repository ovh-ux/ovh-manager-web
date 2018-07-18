angular.module('App').controller(
  'DnsZoneCtrl',
  class DnsZoneCtrl {
    /**
     * Constructor
     * @param $scope
     * @param $q
     * @param $stateParams
     * @param $timeout
     * @param Alerter
     * @param Domain
     * @param Products
     * @param currentSection
     */
    constructor(
      $scope,
      $q,
      $stateParams,
      $timeout,
      Alerter,
      Domain,
      Products,
      currentSection,
    ) {
      this.$scope = $scope;
      this.$q = $q;
      this.$stateParams = $stateParams;
      this.$timeout = $timeout;
      this.Alerter = Alerter;
      this.Domain = Domain;
      this.Products = Products;
      this.currentSection = currentSection;
    }

    $onInit() {
      this.loading = {
        domainsInfos: false,
      };
      this.stepPath = '';

      this.$scope.alerts = { page: 'domain_alert_page' };
      this.$scope.currentAction = null;
      this.$scope.currentActionData = null;
      this.$scope.currentSection = this.currentSection;

      this.$scope.resetAction = () => this.$scope.setAction(false);

      this.$scope.setAction = (action, data) => {
        this.$scope.currentAction = action;
        this.$scope.currentActionData = data;

        if (action) {
          this.stepPath = `domain/${this.$scope.currentAction}.html`;
          $('#currentAction').modal({
            keyboard: true,
            backdrop: 'static',
          });
        } else {
          $('#currentAction').modal('hide');
          this.$scope.currentActionData = null;
          this.$timeout(() => {
            this.stepPath = '';
          }, 300);
        }
      };

      this.loadDomain();
    }

    loadDomain() {
      this.loading.domainsInfos = true;

      this.$q
        .all({
          product: this.Products.getSelectedProduct(true),
          tabZone: this.Domain.getTabZoneDns(this.$stateParams.productId, 1),
        })
        .then(({ product, tabZone }) => {
          if (tabZone) {
            this.hasZoneDns = true;
          }

          this.domain = product;

          return this.Domain.getZoneByZoneName(this.domain.name).then((zoneInfos) => {
            this.domain.displayName = this.domain.name;
            this.domain.nameServers = zoneInfos.nameServers;
            return this.domain;
          });
        })
        .catch(err => this.Alerter.alertFromSWS(
          this.$scope.tr('domain_dashboard_loading_error'),
          err,
          this.$scope.alerts.page,
        ))
        .finally(() => {
          this.loading.domainsInfos = false;
        });
    }
  },
);
