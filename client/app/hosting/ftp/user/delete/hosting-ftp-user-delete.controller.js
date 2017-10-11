angular.module("App").controller(
    "HostingFtpUserDeleteCtrl",
    class HostingFtpUserDeleteCtrl {
        constructor ($scope, $stateParams, Alerter, HostingUser) {
            this.$scope = $scope;
            this.$stateParams = $stateParams;
            this.Alerter = Alerter;
            this.HostingUser = HostingUser;
        }

        $onInit () {
            this.entryToDelete = this.$scope.currentActionData;

            this.$scope.deleteUser = () => this.deleteUser();
        }

        deleteUser () {
            this.$scope.resetAction();
            return this.HostingUser.deleteUser(this.$stateParams.productId, this.entryToDelete)
                .then(() => {
                    this.Alerter.success(this.$scope.tr("hosting_tab_DATABASES_configuration_user_delete_success"), this.$scope.alerts.main);
                })
                .catch((err) => {
                    this.Alerter.alertFromSWS(this.$scope.tr("hosting_tab_DATABASES_configuration_user_delete_fail", [this.entryToDelete]), _.get(err, "data", err), this.$scope.alerts.main);
                });
        }
    }
);
