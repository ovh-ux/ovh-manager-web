angular.module('App').controller(
  'DomainDynHostEditCtrl',
  class DomainDynHostEditCtrl {
    constructor($scope, Alerter, Domain, Validator) {
      this.$scope = $scope;
      this.Alerter = Alerter;
      this.Domain = Domain;
      this.Validator = Validator;
    }

    $onInit() {
      this.dynHost = angular.copy(this.$scope.currentActionData.dynHost);
      this.product = angular.copy(this.$scope.currentActionData.product);

      this.loading = false;

      this.$scope.updateDynHost = () => this.updateDynHost();
    }

    ipTargetCheck(input) {
      input.$setValidity(
        'iptarget',
        this.Validator.isValidIpv4(this.dynHost.ip),
      );
    }

    subDomainCheck(input) {
      input.$setValidity(
        'subdomain',
        this.dynHost.subDomain === null
          || this.dynHost.subDomain === ''
          || this.Validator.isValidSubDomain(this.dynHost.subDomain),
      );
    }

    updateDynHost() {
      this.loading = true;
      return this.Domain.updateDynHost(this.product.name, this.dynHost.id, {
        ip: this.dynHost.ip,
        subDomain: punycode.toASCII(this.dynHost.subDomain),
      })
        .then(() => this.Domain.refreshZoneState(this.product.name).then(() => this.Alerter.success(
          this.$scope.tr('domain_tab_DYNHOST_edit_success'),
          this.$scope.alerts.main,
        )))
        .catch(err => this.Alerter.alertFromSWS(
          this.$scope.tr('domain_tab_DYNHOST_error'),
          _.get(err, 'data', err),
          this.$scope.alerts.main,
        ))
        .finally(() => {
          this.loading = false;
          this.$scope.resetAction();
        });
    }
  },
);
