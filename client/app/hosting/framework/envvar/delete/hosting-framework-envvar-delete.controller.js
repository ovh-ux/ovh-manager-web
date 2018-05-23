angular
    .module("App")
    .controller("controllers.Hosting.Framework.Envvar.delete", class HostingFrameworkEnvvarDeleteCtrl {
        constructor ($scope, $stateParams, Alerter, HostingFrameworkEnvvar, translator) {
            this.$scope = $scope;
            this.$stateParams = $stateParams;

            this.Alerter = Alerter;
            this.HostingFrameworkEnvvar = HostingFrameworkEnvvar;
            this.translator = translator;
        }

        $onInit () {
            this.entryToDelete = angular.copy(this.$scope.currentActionData).envvar;

            this.$scope.delete = () => this.delete();
        }

        delete () {
            return this.HostingFrameworkEnvvar.delete(this.$stateParams.productId, this.entryToDelete.key)
                .then(() => {
                    this.Alerter.success(this.translator.tr("hosting_tab_FRAMEWORK_envvar_delete_success"), this.$scope.alerts.main);
                })
                .catch((err) => {
                    this.Alerter.error(this.translator.tr("hosting_tab_FRAMEWORK_envvar_delete_error") + err.message, this.$scope.alerts.main);
                })
                .finally(() => {
                    this.$scope.resetAction();
                });
        }
    });
