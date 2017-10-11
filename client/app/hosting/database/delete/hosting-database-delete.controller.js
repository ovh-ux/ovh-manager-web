angular.module("App")
    .controller("HostingDatabaseDeleteCtrl", class HostingDatabaseDeleteCtrl {
        constructor ($scope, $stateParams, HostingDatabase, Alerter) {
            this.$scope = $scope;
            this.$stateParams = $stateParams;
            this.HostingDatabase = HostingDatabase;
            this.Alerter = Alerter;
        }

        $onInit () {
            this.entryToDelete = this.$scope.currentActionData;
            this.$scope.deleteDatabase = () => this.deleteDatabase();
        }

        deleteDatabase () {
            this.HostingDatabase.deleteDatabase(this.$stateParams.productId, this.entryToDelete)
                .then(() => {
                    this.Alerter.success(this.$scope.tr("hosting_tab_DATABASES_configuration_delete_success"), this.$scope.alerts.main);
                })
                .catch((err) => {
                    _.set(err, "type", err.type || "ERROR");
                    this.Alerter.alertFromSWS(this.$scope.tr("hosting_tab_DATABASES_configuration_delete_fail", [this.entryToDelete]), _.get(err, "data", err), this.$scope.alerts.main);
                })
                .finally(() => {
                    this.$scope.resetAction();
                });
        }
    });
