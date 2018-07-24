angular.module('controllers').controller(
  'DomainZoneDefaultTTLCtrl',
  class DomainZoneDefaultTTLCtrl {
    constructor($scope, Alerter, Domain) {
      this.$scope = $scope;
      this.Alerter = Alerter;
      this.Domain = Domain;
    }

    $onInit() {
      this.domain = this.$scope.currentActionData;
      this.autorizedValues = {
        min: 60,
        max: 2147483647,
      };
      this.loading = true;
      this.zoneSOA = { ttl: '' };

      this.Domain.getZoneSOA(this.domain.name)
        .then((data) => {
          this.zoneSOA = data;
        })
        .catch((err) => {
          this.Alerter.alertFromSWS(
            this.$scope.tr('domain_tab_ZONE_default_ttl_error'),
            err,
            this.$scope.alerts.main,
          );
          this.$scope.resetAction();
        })
        .finally(() => {
          this.loading = false;
        });
    }

    updateDefaultTTL() {
      this.loading = true;
      return this.Domain.putZoneSOA(this.domain.name, this.zoneSOA)
        .then(() => this.Alerter.success(
          this.$scope.tr('domain_tab_ZONE_default_ttl_success'),
          this.$scope.alerts.main,
        ))
        .catch(err => this.Alerter.alertFromSWS(
          this.$scope.tr('domain_tab_ZONE_default_ttl_error'),
          err,
          this.$scope.alerts.main,
        ))
        .finally(() => {
          this.loading = false;
          this.$scope.resetAction();
        });
    }
  },
);
