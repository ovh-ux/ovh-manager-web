angular.module("App").controller(
    "HostingModuleChangePasswordCtrl",
    class HostingModuleChangePasswordCtrl {
        constructor ($scope, $stateParams, Alerter, HostingModule) {
            this.$scope = $scope;
            this.$stateParams = $stateParams;
            this.Alerter = Alerter;
            this.HostingModule = HostingModule;
        }

        $onInit () {
            this.moduleToUpdate = this.$scope.currentActionData;
            this.$scope.updatePasswordModule = () => this.updatePasswordModule();
        }

        updatePasswordModule () {
            this.$scope.resetAction();
            return this.HostingModule.changePassword(this.$stateParams.productId, this.moduleToUpdate.id)
                .then(() => {
                    this.Alerter.success(this.$scope.tr("hosting_configuration_tab_modules_update_success"), this.$scope.alerts.main);
                })
                .catch((err) => {
                    this.Alerter.alertFromSWS(this.$scope.tr("hosting_configuration_tab_modules_update_fail", [this.moduleToUpdate]), _.get(err, "data", err), this.$scope.alerts.main);
                    this.$scope.resetActions();
                });
        }
    }
);
