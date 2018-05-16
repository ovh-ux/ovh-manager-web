angular.module("App").controller(
    "controllers.Hosting.Framework.Runtime.edit",
    class HostingFrameworkRuntimeEditCtrl {

        /**
         * @constructs HostingFrameworkRuntimeEditCtrl
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
         * Initialize HostingFrameworkRuntimeEditCtrl
         */
        $onInit () {
            this.isLoading = true;

            const data = angular.copy(this.$scope.currentActionData);
            this.entryToEdit = data.runtime;

            this.$scope.edit = () => this.edit();
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
            if (this.entryToEdit && this.entryToEdit.type && this.entryToEdit.type.indexOf("nodejs") !== -1) {
                return this.entryToEdit && this.entryToEdit.name && this.entryToEdit.publicDir && this.entryToEdit.appEnv && this.entryToEdit.appBootstrap;
            }

            return this.entryToEdit && this.entryToEdit.name && this.entryToEdit.type;
        }

        /**
         * Called on runtime edit popover
         */
        edit () {
            this.isLoading = true;

            this.HostingFrameworkRuntime.edit(this.$stateParams.productId, this.entryToEdit.id, this.entryToEdit)
                .then(() => {
                    this.Alerter.success(this.$scope.tr("hosting_tab_FRAMEWORK_runtime_edit_success"), this.$scope.alerts.main);
                })
                .catch((err) => {
                    this.Alerter.error(this.$scope.tr("hosting_tab_FRAMEWORK_runtime_edit_error") + err.message, this.$scope.alerts.main);
                })
                .finally(() => {
                    this.$scope.resetAction();
                })
            ;
        }
    }
);
