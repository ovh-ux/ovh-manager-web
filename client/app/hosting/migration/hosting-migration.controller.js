angular.module("App").controller(
    "HostingMigrateMyOvhOrgCtrl",
    class HostingMigrateMyOvhOrgCtrl {
        constructor ($scope, $stateParams, Alerter, Hosting) {
            this.$scope = $scope;
            this.$stateParams = $stateParams;
            this.Alerter = Alerter;
            this.Hosting = Hosting;
        }

        $onInit () {
            this.hosting = this.$scope.currentActionData;
            this.hostings = [];
            this.loading = true;
            this.model = {
                destination: null
            };

            this.$scope.migrateMyOvhOrg = () => this.migrateMyOvhOrg();

            this.Hosting.getHostings(_.get(this.hosting, "serviceName"))
                .then((hostings) => {
                    this.hostings = hostings;

                    // We delete the current product
                    const index = _.indexOf(this.hostings, this.$stateParams.productId);
                    this.hostings.splice(index, 1);
                })
                .catch(() => {
                    this.hostings = [];
                })
                .finally(() => {
                    this.loading = false;
                });
        }

        migrateMyOvhOrg () {
            this.loading = true;
            this.$scope.resetAction();

            return this.Hosting.migrateMyOvhOrg(this.$stateParams.productId, this.model.destination)
                .then(() => {
                    this.Alerter.success(this.$scope.tr("hosting_migrate_my_ovh_org_success"), this.$scope.alerts.tabs);
                })
                .catch((err) => {
                    this.Alerter.alertFromSWS(this.$scope.tr("hosting_migrate_my_ovh_org_error"), err, this.$scope.alerts.tabs);
                })
                .finally(() => {
                    this.loading = false;
                });
        }
    }
);
