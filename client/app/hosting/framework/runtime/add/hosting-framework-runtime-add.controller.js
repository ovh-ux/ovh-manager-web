angular.module("App").controller(
    "controllers.Hosting.Framework.Runtime.create",
    class HostingFrameworkRuntimeCreateCtrl {

        /**
         * @constructs HostingFrameworkRuntimeCreateCtrl
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
         * Initialize HostingFrameworkRuntimeCreateCtrl
         */
        $onInit () {
            this.isLoading = true;
            this.entryToCreate = {
                name: null,
                type: null,
                publicDir: null,
                appEnv: null,
                appBootstrap: null
            };

            this.$scope.create = () => this.create();
            this.$scope.isValid = () => this.isValid();

            this.HostingFrameworkRuntime.getAvailableTypes(this.$stateParams.productId)
                .then((types) => {
                    this.availableTypes = types;
                })
                .catch(() => {
                    this.Alerter.error(this.$scope.tr("hosting_tab_FRAMEWORK_runtime_list_error"), this.$scope.alerts.main);

                    this.$scope.resetAction();
                })
                .finally(() => {
                    this.isLoading = false;
                })
            ;
        }

        /**
         * Verify if current form is valid
         * @returns {boolean}
         */
        isValid () {
            if (this.entryToCreate && this.entryToCreate.type && this.entryToCreate.type.indexOf("nodejs") !== -1) {
                return this.entryToCreate && this.entryToCreate.name && this.entryToCreate.publicDir && this.entryToCreate.appEnv && this.entryToCreate.appBootstrap;
            }

            return this.entryToCreate && this.entryToCreate.name && this.entryToCreate.type;
        }

        /**
         * Called on runtime create/edit popover
         */
        create () {
            this.isLoading = true;

            this.HostingFrameworkRuntime.create(this.$stateParams.productId, this.entryToCreate)
                .then(() => {
                    this.Alerter.success(this.$scope.tr("hosting_tab_FRAMEWORK_runtime_save_success"), this.$scope.alerts.main);
                })
                .catch((err) => {
                    this.Alerter.error(this.$scope.tr("hosting_tab_FRAMEWORK_runtime_save_error") + err.message, this.$scope.alerts.main);
                })
                .finally(() => {
                    this.$scope.resetAction();
                })
            ;
        }
    }
);
