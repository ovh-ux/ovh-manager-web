angular.module("App").controller(
    "controllers.Hosting.Framework.Runtime.delete",
    class HostingFrameworkRuntimeDeleteCtrl {

        /**
         * @constructs HostingFrameworkRuntimeDeleteCtrl
         * @param $scope
         * @param $stateParams
         * @param translator
         * @param Alerter
         * @param HostingFrameworkRuntime
         */
        constructor ($scope, $stateParams, translator, Alerter, HostingFrameworkRuntime) {
            this.$scope = $scope;
            this.$stateParams = $stateParams;
            this.translator = translator;
            this.Alerter = Alerter;
            this.HostingFrameworkRuntime = HostingFrameworkRuntime;
        }

        /**
         * Initialize HostingFrameworkRuntimeDeleteCtrl
         */
        $onInit () {
            this.isLoading = true;

            const actionData = angular.copy(this.$scope.currentActionData);
            this.entryToDelete = actionData.runtime;

            this.$scope.delete = () => this.delete();

            this.isLoading = false;
        }

        /**
         * Call on runtime deletion
         */
        delete () {
            this.isLoading = true;

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
