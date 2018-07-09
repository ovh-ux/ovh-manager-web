angular.module('App').controller(
  'DomainLockDisableCtrl',
  class DomainLockDisableCtrl {
    constructor($scope, $rootScope, Alerter, Domain) {
      this.$scope = $scope;
      this.$rootScope = $rootScope;
      this.Alerter = Alerter;
      this.Domain = Domain;
    }

    $onInit() {
      this.domain = angular.copy(this.$scope.currentActionData);
      this.$scope.resetSwitchAndAction = () => this.resetSwitchAndAction();
      this.$scope.unlockDomain = () => this.unlockDomain();
    }

    resetSwitchAndAction() {
      this.$rootScope.$broadcast('domain.protection.unlock.cancel');
      this.$scope.resetAction();
    }

    unlockDomain() {
      return this.Domain.changeLockState(this.domain.name, 'unlocked')
        .then((data) => {
          this.$rootScope.$broadcast('domain.protection.unlock.done', data);
          this.Alerter.success(
            this.$scope.tr('domain_configuration_protection_desactivate_success'),
            this.$scope.alerts.main,
          );
        })
        .catch((err) => {
          this.$rootScope.$broadcast('domain.protection.unlock.error', err);
          this.Alerter.alertFromSWS(
            this.$scope.tr('domain_configuration_protection_desactivate_fail'),
            _.get(err, 'data', err),
            this.$scope.alerts.main,
          );
        })
        .finally(() => {
          this.$scope.resetAction();
        });
    }
  },
);
