angular.module("App").controller(
    "HostingRestoreDatabaseConfirmCtrl",
    class HostingRestoreDatabaseConfirmCtrl {
        constructor ($scope) {
            this.$scope = $scope;
        }

        $onInit () {
            this.backupType = angular.copy(this.$scope.currentActionData.backupType);
            this.bdd = angular.copy(this.$scope.currentActionData.bdd);

            this.$scope.restoreDatabaseBackup = () => this.restoreDatabaseBackup();
        }

        restoreDatabaseBackup () {
            this.$scope.currentActionData.deferred.resolve();
            this.$scope.resetAction();
        }
    }
);
