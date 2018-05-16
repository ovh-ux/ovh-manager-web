angular.module("App").controller(
    "controllers.Hosting.Framework.Envvar.edit",
    class HostingFrameworkEnvvarEditCtrl {

        /**
         * @constructs HostingFrameworkEnvvarEditCtrl
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
         * Initialize HostingFrameworkEnvvarEditCtrl
         */
        $onInit () {
            this.isLoading = true;

            const data = angular.copy(this.$scope.currentActionData);
            this.entryToEdit = data.envvar;

            this.$scope.edit = () => this.save();
            this.$scope.isValid = () => this.isValid();

            this.isLoading = false;
        }

        /**
         * Verify if current form key entry does not contain any spaces
         * @returns {boolean}
         */
        isKeyValid () {
            return this.entryToEdit && this.entryToEdit.key && this.entryToEdit.key.indexOf(" ") === -1;
        }

        /**
         * Verify if current form is valid
         * @returns {boolean}
         */
        isValid () {
            return this.entryToEdit && this.isKeyValid() && this.entryToEdit.type && this.entryToEdit.value;
        }

        /**
         * Called on envvar create/edit popover
         */
        save () {
            this.isLoading = true;

            this.HostingFrameworkEnvvar.edit(this.$stateParams.productId, this.entryToEdit.key, this.entryToEdit)
                .then(() => {
                    this.Alerter.success(this.$scope.tr("hosting_tab_FRAMEWORK_envvar_edit_success"), this.$scope.alerts.main);
                })
                .catch((err) => {
                    this.Alerter.error(this.$scope.tr("hosting_tab_FRAMEWORK_envvar_edit_error") + err.message, this.$scope.alerts.main);
                })
                .finally(() => {
                    this.$scope.resetAction();
                })
            ;
        }
    }
);
