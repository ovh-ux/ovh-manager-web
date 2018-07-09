angular.module('App').controller(
  'DomainZoneDeleteAllCtrl',
  class DomainZoneDeleteAllCtrl {
    constructor($scope, Alerter, Domain, Hosting) {
      this.$scope = $scope;
      this.alerter = Alerter;
      this.domainService = Domain;
      this.hostingService = Hosting;
    }

    $onInit() {
      this.domain = this.$scope.currentActionData;
      this.canDeleteAllZone = false;
      this.loading = true;
      this.$scope.deleteAllZone = () => this.deleteAllZone();

      this.checkAllZoneCanBeDelete(this.domain.name);
    }

    checkAllZoneCanBeDelete(name) {
      this.loading = true;
      return this.hostingService
        .getHosting(name)
        .then(() => {
          this.canDeleteAllZone = false;
        })
        .catch((err) => {
          this.canDeleteAllZone = _.get(err, 'status') === 404;
        })
        .finally(() => {
          this.loading = false;
        });
    }

    deleteAllZone() {
      this.loading = true;
      return this.domainService
        .deleteAllZone(this.domain.name)
        .then(() =>
          this.alerter.success(
            this.$scope.tr('domain_configuration_zonedns_delete_all_success'),
            this.$scope.alerts.main,
          ))
        .catch(err =>
          this.alerter.alertFromSWS(
            this.$scope.tr('domain_configuration_zonedns_delete_all_error'),
            err,
            this.$scope.alerts.main,
          ))
        .finally(() => {
          this.$scope.resetAction();
        });
    }
  },
);
