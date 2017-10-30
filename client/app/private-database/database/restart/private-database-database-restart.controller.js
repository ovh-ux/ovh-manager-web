angular
    .module("App")
    .controller("PrivateDatabaseRestartCtrl", class PrivateDatabaseRestartCtrl {

        constructor ($scope, $stateParams, Alerter, PrivateDatabase) {
            this.$scope = $scope;
            this.$stateParams = $stateParams;
            this.alerter = Alerter;
            this.privateDatabaseService = PrivateDatabase;
        }

        $onInit () {
            this.productId = this.$stateParams.productId;

            this.$scope.restartDatabase = () => this.restartDatabase();
        }

        restartDatabase () {
            this.$scope.resetAction();
            this.privateDatabaseService.restartDatabase(this.productId)
                .then((task) => {
                    this.$scope.pollAction(task);
                    this.alerter.success(this.$scope.tr("privateDatabase_restart_success"), this.$scope.alerts.main);
                })
                .catch((err) => {
                    this.alerter.alertFromSWS(this.$scope.tr("privateDatabase_restart_fail"), _.get(err, "data", err), this.$scope.alerts.main);
                });
        }
});
