angular.module('App').controller(
  'DomainDynHostAddCtrl',
  class DomainDynHostAddCtrl {
    constructor($scope, $translate, Alerter, Domain, Validator) {
      this.$scope = $scope;
      this.$translate = $translate;
      this.Alerter = Alerter;
      this.Domain = Domain;
      this.Validator = Validator;
    }

    $onInit() {
      this.product = angular.copy(this.$scope.currentActionData);

      this.dynHost = { ipTarget: '', subDomain: '' };
      this.loading = false;

      this.$scope.addDynHost = () => this.addDynHost();
    }

    ipTargetCheck(input) {
      input.$setValidity(
        'iptarget',
        this.Validator.isValidIpv4(this.dynHost.ipTarget),
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

    addDynHost() {
      this.loading = true;
      return this.Domain.addDynHost(this.product.name, {
        ip: this.dynHost.ipTarget,
        subDomain: punycode.toASCII(this.dynHost.subDomain),
      })
        .then(() => this.Domain.refreshZoneState(this.product.name).then(() => this.Alerter.success(
          this.$translate.instant('domain_tab_DYNHOST_add_success'),
          this.$scope.alerts.main,
        )))
        .catch(err => this.Alerter.alertFromSWS(
          this.$translate.instant('domain_tab_DYNHOST_error'),
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
