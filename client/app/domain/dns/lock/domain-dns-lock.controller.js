angular.module('controllers').controller(
  'controllers.Domain.Dns.Lock',
  class DomainDnsLockCtrl {
    constructor($scope, $rootScope, $stateParams, Alerter, Domain) {
      this.$scope = $scope;
      this.$rootScope = $rootScope;
      this.$stateParams = $stateParams;
      this.Alerter = Alerter;
      this.Domain = Domain;
    }

    $onInit() {
      this.loading = false;
      this.$scope.updateDomainLock = () => this.updateDomainLock();
    }

    updateDomainLock() {
      this.loading = true;
      return this.Domain.updateNameServerType(
        this.$stateParams.productId,
        'hosted',
      )
        .then(() => this.Alerter.success(
          this.$scope.i18n.domain_tab_DNS_lock_success,
          this.$scope.alerts.main,
        ))
        .catch((err) => {
          _.set(err, 'type', err.type || 'ERROR');
          this.Alerter.alertFromSWS(
            this.$scope.i18n.domain_tab_DNS_lock_error,
            err,
            this.$scope.alerts.main,
          );
        })
        .finally(() => {
          this.$rootScope.$broadcast('Domain.Dns.Reload');
          this.$scope.$emit('domain.dashboard.refresh');
          this.loading = false;
          this.$scope.resetAction();
        });
    }
  },
);
