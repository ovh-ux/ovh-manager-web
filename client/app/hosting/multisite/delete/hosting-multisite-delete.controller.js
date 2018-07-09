angular.module('App').controller(
  'HostingRemoveDomainCtrl',
  class HostingRemoveDomainCtrl {
    constructor($scope, $stateParams, Alerter, HostingDomain) {
      this.$scope = $scope;
      this.$stateParams = $stateParams;
      this.Alerter = Alerter;
      this.HostingDomain = HostingDomain;
    }

    $onInit() {
      this.model = {
        domains: null,
      };
      this.selected = {
        autoconfigure: true,
        domain: this.$scope.currentActionData,
        wwwNeeded: false,
      };
      this.resultMessages = {
        OK: this.$scope.tr('hosting_tab_DOMAINS_configuration_remove_!success'),
        PARTIAL: this.$scope.tr('hosting_tab_DOMAINS_configuration_remove_partial'),
        ERROR: this.$scope.tr('hosting_tab_DOMAINS_configuration_remove_failure'),
      };

      this.$scope.deleteMultiSite = () => this.deleteMultiSite();

      this.HostingDomain.getExistingDomains(this.$stateParams.productId, false)
        .then((data) => {
          this.model.domains = _.get(data, 'existingDomains');
        })
        .catch((err) => {
          this.$scope.resetAction();
          this.Alerter.alertFromSWS(this.$scope.tr('hosting_tab_DOMAINS_configuration_remove_step1_loading_error'), _.get(err, 'data', err), this.$scope.alerts.main);
        });
    }

    domainsWwwExists() {
      return this.model.domains && _.indexOf(this.model.domains, `www.${this.selected.domain.name}`) !== -1;
    }

    deleteMultiSite() {
      this.$scope.resetAction();
      return this.HostingDomain.removeDomain(this.$stateParams.productId, this.selected.domain.name, this.selected.wwwNeeded, this.selected.autoconfigure)
        .then((data) => {
          this.Alerter.alertFromSWSBatchResult(this.resultMessages, data, this.$scope.alerts.main);
          this.selected.domain.isUpdating = true;
        })
        .catch((err) => {
          this.Alerter.alertFromSWS(this.$scope.tr('hosting_tab_DOMAINS_configuration_remove_failure'), _.get(err, 'data', err), this.$scope.alerts.main);
        });
    }
  },
);
