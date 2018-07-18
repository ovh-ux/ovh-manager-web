angular.module('App').controller(
  'DomainZoneRecordDeleteCtrl',
  class DomainZoneRecordDeleteCtrl {
    constructor($scope, $stateParams, Alerter, Domain) {
      this.$scope = $scope;
      this.$stateParams = $stateParams;
      this.Alerter = Alerter;
      this.Domain = Domain;
    }

    $onInit() {
      this.entryToDelete = this.$scope.currentActionData;
      this.massDelete = _.isArray(this.entryToDelete);
      this.loading = false;

      if (!this.massDelete) {
        this.entryToDelete.fieldTypeFormatted = this.entryToDelete.fieldType;
      }

      this.$scope.deleteDnsEntry = () => this.deleteDnsEntry();
    }

    deleteDnsEntry() {
      this.loading = true;
      if (this.massDelete) {
        return this.Domain.deleteDnsEntry(
          this.$stateParams.productId,
          this.entryToDelete,
        )
          .then(() => this.Alerter.success(
            this.$scope.tr('domain_configuration_dns_entry_delete_mass_success'),
            this.$scope.alerts.main,
          ))
          .catch(err => this.Alerter.alertFromSWS(
            this.$scope.tr('domain_configuration_dns_entry_delete_mass_fail'),
            err,
            this.$scope.alerts.main,
          ))
          .finally(() => this.$scope.resetAction());
      }
      return this.Domain.deleteDnsEntry(
        this.$stateParams.productId,
        this.entryToDelete.id,
      )
        .then(() => this.Alerter.success(
          this.$scope.tr('domain_configuration_dns_entry_delete_success'),
          this.$scope.alerts.main,
        ))
        .catch(err => this.Alerter.alertFromSWS(
          this.$scope.tr('domain_configuration_dns_entry_delete_fail', [
            `${this.entryToDelete.subDomain}.${this.entryToDelete.zone}`,
          ]),
          err,
          this.$scope.alerts.main,
        ))
        .finally(() => this.$scope.resetAction());
    }
  },
);
