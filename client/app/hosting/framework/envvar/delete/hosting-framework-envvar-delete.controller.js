angular.module("App").controller(
    "controllers.Hosting.Framework.Envvar.delete",
    class HostingFrameworkEnvvarDeleteCtrl {

        /**
         * @constructs HostingFrameworkEnvvarDeleteCtrl
         * @param $scope
         * @param $stateParams
         * @param translator
         * @param Alerter
         * @param HostingFrameworkEnvvar
         */
        constructor ($scope, $stateParams, translator, Alerter, HostingFrameworkEnvvar) {
            this.$scope = $scope;
            this.$stateParams = $stateParams;
            this.translator = translator;
            this.Alerter = Alerter;
            this.HostingFrameworkEnvvar = HostingFrameworkEnvvar;
        }

        /**
         * Initialize HostingFrameworkEnvvarDeleteCtrl
         */
        $onInit () {
            this.isLoading = true;

            const actionData = angular.copy(this.$scope.currentActionData);
            this.entryToDelete = actionData.envvar;

            this.$scope.delete = () => this.delete();

            this.isLoading = false;
        }

        /**
         * Call on envvar deletion
         */
        delete () {
            this.isLoading = true;

            this.HostingFrameworkEnvvar.delete(this.$stateParams.productId, this.entryToDelete.key)
                .then(() => {
                    this.Alerter.success(this.translator.tr("hosting_tab_FRAMEWORK_envvar_delete_success"), this.$scope.alerts.main);
                })
                .catch((err) => {
                    this.Alerter.error(this.translator.tr("hosting_tab_FRAMEWORK_envvar_delete_error") + err.message, this.$scope.alerts.main);
                })
                .finally(() => {
                    this.$scope.resetAction();
                })
            ;
        }
    }
);
