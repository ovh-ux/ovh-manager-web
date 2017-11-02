angular.module("App").controller(
    "HostingUserLogsDeleteCtrl",
    class HostingUserLogsDeleteCtrl {
        constructor ($scope, $stateParams, Alerter, Hosting) {
            this.$scope = $scope;
            this.$stateParams = $stateParams;
            this.Alerter = Alerter;
            this.Hosting = Hosting;
        }

        $onInit () {
            this.entryToDelete = this.$scope.currentActionData;
            this.$scope.deleteUser = () => this.deleteUser();
        }

        deleteUser () {
            this.$scope.resetAction();
            return this.Hosting.deleteUserLogs(this.$stateParams.productId, this.entryToDelete)
                .then(() => {
                    this.Alerter.success(this.$scope.tr("hosting_tab_USER_LOGS_configuration_user_delete_success"), this.$scope.alerts.main);
                })
                .catch((err) => {
                    this.Alerter.alertFromSWS(this.$scope.tr("hosting_tab_USER_LOGS_configuration_user_delete_fail", [this.entryToDelete]), _.get(err, "data", err), this.$scope.alerts.main);
                });
        }
    }
);
