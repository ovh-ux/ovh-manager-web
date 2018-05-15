angular
    .module("App")
    .controller("controllers.Hosting.Framework.Runtime.delete", class HostingFrameworkRuntimeDeleteCtrl {
        constructor ($scope, $stateParams, Alerter, HostingFrameworkRuntime, translator) {
            this.$scope = $scope;
            this.$stateParams = $stateParams;

            this.Alerter = Alerter;
            this.HostingFrameworkRuntime = HostingFrameworkRuntime;
            this.translator = translator;
        }

        $onInit () {
            const actionData = angular.copy(this.$scope.currentActionData);
            this.entryToDelete = actionData.runtime;

            this.$scope.delete = () => this.delete();
        }

        delete () {
            this.HostingFrameworkRuntime.delete(this.$stateParams.productId, this.entryToDelete.id)
                .then(() => {
                    this.Alerter.success(this.translator.tr("hosting_tab_FRAMEWORK_runtime_delete_success"), this.$scope.alerts.main);
                })
                .catch((err) => {
                    this.Alerter.error(this.translator.tr("hosting_tab_FRAMEWORK_runtime_delete_error") + err.message, this.$scope.alerts.main);
                })
                .finally(() => {
                    this.$scope.resetAction();
                })
            ;
        }
    }
);
