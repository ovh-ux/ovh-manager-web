angular.module("App").controller(
    "PrivateDatabaseDeleteUserCtrl",
    class PrivateDatabaseDeleteUserCtrl {
        constructor (Alerter, PrivateDatabase, $scope, $stateParams) {
            this.alerter = Alerter;
            this.privateDatabaseService = PrivateDatabase;
            this.$scope = $scope;
            this.$stateParams = $stateParams;
        }

        $onInit () {
            this.userToDelete = this.$scope.currentActionData;
            this.productId = this.$stateParams.productId;

            this.$scope.deleteUser = () => {
                this.$scope.resetAction();

                this.privateDatabaseService
                    .deleteUser(this.productId, this.userToDelete.userName)
                    .then(() => this.alerter.success(this.$scope.tr("privateDatabase_delete_user_success"), "privateDataBase.alerts.user"))
                    .catch(() => this.alerter.error(this.$scope.tr("privateDatabase_delete_user_fail"), "privateDataBase.alerts.user"));
            };
        }
    }
);
