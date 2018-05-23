angular
    .module("App")
    .controller("controllers.Hosting.Framework.Runtime.setDefault", class HostingFrameworkRuntimeSetDefaultCtrl {
        constructor ($scope, $stateParams, Alerter, HostingFrameworkRuntime, translator) {
            this.$scope = $scope;
            this.$stateParams = $stateParams;

            this.Alerter = Alerter;
            this.HostingFrameworkRuntime = HostingFrameworkRuntime;
            this.translator = translator;
        }

        $onInit () {
            const actionData = angular.copy(this.$scope.currentActionData);
            this.entryToSetup = actionData.runtime;

            this.$scope.setDefault = () => this.setDefault();
        }

        setDefault () {
            return this.HostingFrameworkRuntime
                .setDefault(this.$stateParams.productId, this.entryToSetup.id)
                .then(() => {
                    this.Alerter.success(this.translator.tr("hosting_tab_FRAMEWORK_runtime_set_default_success"), this.$scope.alerts.main);
                })
                .catch((err) => {
                    this.Alerter.error(this.translator.tr("hosting_tab_FRAMEWORK_runtime_set_default_error") + err.message, this.$scope.alerts.main);
                })
                .finally(() => {
                    this.$scope.resetAction();
                });
        }
    }
);
