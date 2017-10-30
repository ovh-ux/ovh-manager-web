angular.module("App").controller(
    "HostingUserLogsModifyCtrl",
    class HostingUserLogsModifyCtrl {
        constructor ($scope, $stateParams, Alerter, Hosting) {
            this.$scope = $scope;
            this.$stateParams = $stateParams;
            this.Alerter = Alerter;
            this.Hosting = Hosting;
        }

        $onInit () {
            this.model = {
                user: angular.copy(this.$scope.currentActionData)
            };

            this.$scope.modifyUser = () => this.modifyUser();
        }

        modifyUser () {
            this.$scope.resetAction();
            return this.Hosting.modifyUserLogs(this.$stateParams.productId, this.model.user.login, this.model.user.description)
                .then(() => {
                    this.Alerter.success(this.$scope.tr("hosting_tab_USER_LOGS_configuration_user_modify_success"), this.$scope.alerts.main);
                })
                .catch((err) => {
                    this.Alerter.alertFromSWS(this.$scope.tr("hosting_tab_USER_LOGS_configuration_user_modify_fail"), _.get(err, "data", err), this.$scope.alerts.main);
                });
        }
    }
);
