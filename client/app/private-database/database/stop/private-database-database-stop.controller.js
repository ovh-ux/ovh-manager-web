angular
    .module("App")
    .controller("PrivateDatabaseStopCtrl", class PrivateDatabaseStopCtrl {

        constructor ($scope, $stateParams, Alerter, PrivateDatabase) {
            this.$scope = $scope;
            this.$stateParams = $stateParams;
            this.alerter = Alerter;
            this.privateDatabaseService = PrivateDatabase;
        }

        $onInit () {
            this.productId = this.$stateParams.productId;

            this.$scope.stopDatabase = () => this.stopDatabase();
        }

        stopDatabase () {
            this.$scope.resetAction();

            this.privateDatabaseService.stopDatabase(this.$stateParams.productId)
                .then((task) => {
                    this.$scope.pollAction(task);
                    this.alerter.success(this.$scope.tr("privateDatabase_stop_success"), this.$scope.alerts.main);
                })
                .catch((err) => {
                    this.alerter.alertFromSWS(this.$scope.tr("privateDatabase_stop_fail"), _.get(err, "data", err), this.$scope.alerts.main);
                });
        }
});
