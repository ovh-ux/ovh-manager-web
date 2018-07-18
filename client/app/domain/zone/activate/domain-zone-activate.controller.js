angular.module('App').controller(
  'DomainZoneActivateCtrl',
  class DomainZoneActivateCtrl {
    constructor($scope, Alerter, Domain) {
      this.$scope = $scope;
      this.Alerter = Alerter;
      this.Domain = Domain;
    }

    $onInit() {
      this.domain = this.$scope.currentActionData;
      this.loading = false;
      this.activationZone = { minimized: false };

      this.$scope.activateZone = () => this.activateZone();
    }

    activateZone() {
      this.loading = true;
      return this.Domain.activateZone(
        this.domain.name,
        this.activationZone.minimized,
      )
        .then(() => this.Alerter.success(
          this.$scope.tr('domain_tab_ZONE_no_zone_activate_success'),
          this.$scope.alerts.main,
        ))
        .catch((err) => {
          _.set(err, 'type', err.type || 'ERROR');
          this.Alerter.alertFromSWS(
            this.$scope.tr('domain_tab_ZONE_no_zone_activate_error'),
            err,
            this.$scope.alerts.main,
          );
        })
        .finally(() => {
          this.$scope.resetAction();
        });
    }
  },
);
