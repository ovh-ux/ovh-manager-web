angular.module("App").controller(
    "controllers.Hosting.Framework.Runtime.setDefault",
    class HostingFrameworkRuntimeSetDefaultCtrl {

        /**
         * @constructs HostingFrameworkRuntimeSetDefaultCtrl
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
         * Initialize HostingFrameworkRuntimeSetDefaultCtrl
         */
        $onInit () {
            this.isLoading = true;

            const actionData = angular.copy(this.$scope.currentActionData);
            this.entryToSetup = actionData.runtime;

            this.$scope.setDefault = () => this.setDefault();

            this.isLoading = false;
        }

        /**
         * Call on runtime set default popover
         */
        setDefault () {
            this.isLoading = true;

            this.HostingFrameworkRuntime.setDefault(this.$stateParams.productId, this.entryToSetup.id)
                .then(() => {
                    this.Alerter.success(this.translator.tr("hosting_tab_FRAMEWORK_runtime_set_default_success"), this.$scope.alerts.main);
                })
                .catch((err) => {
                    this.Alerter.error(this.translator.tr("hosting_tab_FRAMEWORK_runtime_set_default_error") + err.message, this.$scope.alerts.main);
                })
                .finally(() => {
                    this.$scope.resetAction();
                })
            ;
        }
    }
);
