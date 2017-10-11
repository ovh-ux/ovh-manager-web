angular.module("App").controller(
    "HostingModuleDeleteCtrl",
    class HostingModuleDeleteCtrl {
        constructor ($scope, $stateParams, Alerter, HostingModule) {
            this.$scope = $scope;
            this.$stateParams = $stateParams;
            this.Alerter = Alerter;
            this.HostingModule = HostingModule;
        }

        $onInit () {
            this.moduleToDelete = this.$scope.currentActionData;
            this.$scope.deleteModule = () => this.deleteModule();
        }

        deleteModule () {
            this.$scope.resetAction();
            return this.HostingModule.deleteModule(this.$stateParams.productId, this.moduleToDelete.id)
                .then(() => {
                    this.Alerter.success(this.$scope.tr("hosting_configuration_tab_modules_delete_success"), this.$scope.alerts.main);
                })
                .catch((err) => {
                    this.Alerter.alertFromSWS(this.$scope.tr("hosting_configuration_tab_modules_delete_fail", [this.moduleToDelete]), err, this.$scope.alerts.main);
                });
        }
    }
);
