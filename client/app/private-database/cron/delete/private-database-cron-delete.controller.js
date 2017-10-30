angular.module("App").controller(
    "PrivateDatabaseDeleteCronCtrl",
    class PrivateDatabaseDeleteCronCtrl {
        constructor ($scope, $rootScope, $stateParams, Alerter, PrivateDatabaseCron) {
            this.$scope = $scope;
            this.$rootScope = $rootScope;
            this.$stateParams = $stateParams;
            this.Alerter = Alerter;
            this.PrivateDatabaseCron = PrivateDatabaseCron;
        }

        $onInit () {
            this.entryToDelete = this.$scope.currentActionData;
            this.$scope.deleteCron = () => this.deleteCron();
        }

        resetCronTab () {
            this.$rootScope.$broadcast(this.PrivateDatabaseCron.events.tabCronRefresh);
        }

        deleteCron () {
            this.$scope.resetAction();
            return this.PrivateDatabaseCron.deleteCron(this.$stateParams.productId, this.entryToDelete.id)
                .then(() => {
                    this.Alerter.alertFromSWS(this.$scope.tr("privateDatabase_tabs_cron_configuration_delete_success"), { idTask: 42, state: "OK" }, this.$scope.alerts.main);
                    this.resetCronTab();
                })
                .catch((err) => {
                    this.Alerter.alertFromSWS(this.$scope.tr("privateDatabase_tabs_cron_configuration_delete_fail"), _.get(err, "data", err), this.$scope.alerts.main);
                });
        }
    }
);
