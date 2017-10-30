angular
    .module("App")
    .controller("PrivateDatabaseDeleteBDDCtrl", class PrivateDatabaseDeleteBDDCtrl {

        constructor ($scope, $stateParams, Alerter, PrivateDatabase) {
            this.$scope = $scope;
            this.$stateParams = $stateParams;
            this.alerter = Alerter;
            this.privateDatabaseService = PrivateDatabase;
        }

        $onInit () {
            this.productId = this.$stateParams.productId;

            this.bddToDelete = this.$scope.currentActionData;

            this.$scope.deleteBDD = () => this.deleteBDD();
        }

        deleteBDD () {
            this.$scope.resetAction();

            this.privateDatabaseService.deleteBDD(this.productId, this.bddToDelete.databaseName)
                .then(() => {
                    this.alerter.success(this.$scope.tr("privateDatabase_delete_bdd_success"), this.$scope.alerts.main);
                })
                .catch(() => {
                    this.alerter.error(this.$scope.tr("privateDatabase_delete_bdd_fail"), this.$scope.alerts.main);
                });
        }
});
