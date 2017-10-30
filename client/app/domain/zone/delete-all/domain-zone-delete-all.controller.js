angular.module("App").controller(
    "DomainZoneDeleteAllCtrl",
    class DomainZoneDeleteAllCtrl {
        constructor ($scope, Alerter, Domain) {
            this.$scope = $scope;
            this.Alerter = Alerter;
            this.Domain = Domain;
        }

        $onInit () {
            this.domain = this.$scope.currentActionData;
            this.loading = false;
            this.$scope.deleteAllZone = () => this.deleteAllZone();
        }

        deleteAllZone () {
            this.loading = true;
            return this.Domain
                .deleteAllZone(this.domain.name)
                .then(() => this.Alerter.success(this.$scope.tr("domain_configuration_zonedns_delete_all_success"), this.$scope.alerts.main))
                .catch((err) => this.Alerter.alertFromSWS(this.$scope.tr("domain_configuration_zonedns_delete_all_error"), err, this.$scope.alerts.main))
                .finally(() => {
                    this.loading = false;
                    this.$scope.resetAction();
                });
        }
    }
);
