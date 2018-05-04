angular.module("App").controller(
    "controllers.Hosting.Framework.Envvar.delete",
    class HostingFrameworkEnvvarDeleteCtrl {

        constructor ($scope, $stateParams, translator, Alerter, HostingFrameworkEnvvar) {
            this.$scope = $scope;
            this.$stateParams = $stateParams;
            this.translator = translator;
            this.Alerter = Alerter;
            this.HostingFrameworkEnvvar = HostingFrameworkEnvvar;
        }

        $onInit () {
            this.isLoading = false;

            this.entryToDelete = angular.copy(this.$scope.currentActionData).envvar;

            this.$scope.delete = () => this.delete();
        }

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
