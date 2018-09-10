angular.module('controllers').controller(
  'Domain.controllers.DnsSec',
  class DomainDnsSecCtrl {
    constructor($scope, $rootScope, Alerter, DomainsDnsSec, translator) {
      this.$scope = $scope;
      this.$rootScope = $rootScope;
      this.Alerter = Alerter;
      this.DomainsDnsSec = DomainsDnsSec;
      this.translator = translator;
    }

    $onInit() {
      this.domain = angular.copy(this.$scope.currentActionData);

      this.$scope.changeDnsSecState = () => this.changeDnsSecState();
      this.$scope.resetSwitchAndAction = () => this.resetSwitchAndAction();
    }

    changeDnsSecState() {
      const newState = this.domain.dnssecStatus !== 'ENABLED';
      return this.DomainsDnsSec.updateDnssecState(newState, [this.domain.name])
        .then((data) => {
          if (data.state !== 'OK') {
            this.Alerter.alertFromSWS(
              this.$scope.tr(`domain_configuration_dnssec_error_${newState}`),
              data,
              this.$scope.alerts.main,
            );
          }
        })
        .catch(err => this.Alerter.alertFromSWS(
          this.$scope.tr(`domain_configuration_dnssec_error_${newState}`),
          _.get(err, 'data', err),
          this.$scope.alerts.main,
        ))
        .finally(() => {
          this.$scope.$emit('domain.dashboard.refresh');
          this.$scope.resetAction();
        });
    }

    resetSwitchAndAction() {
      this.$rootScope.$broadcast('domain.dnssec.lock.unlock.cancel');
      this.$scope.resetAction();
    }
  },
);
