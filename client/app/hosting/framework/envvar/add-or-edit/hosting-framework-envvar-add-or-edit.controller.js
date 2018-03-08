angular.module("App").controller(
    "controllers.Hosting.Framework.Envvar.create",
    class HostingFrameworkEnvvarCreateCtrl {

        /**
         * @constructs HostingFrameworkEnvvarCreateCtrl
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
         * Initialize HostingFrameworkEnvvarCreateCtrl
         */
        $onInit () {
            this.isLoading = true;

            const actionData = angular.copy(this.$scope.currentActionData) || {};
            this.entryToSave = actionData.envvar;

            this.title = this.translator.tr("hosting_tab_FRAMEWORK_envvar_create_title");

            if (this.entryToSave) {
                this.title = this.translator.tr("hosting_tab_FRAMEWORK_envvar_edit_title");

                this.entryToSave.isEdition = true;
            }

            this.$scope.save = () => this.save();
            this.$scope.isValid = () => this.isValid();

            this.isLoading = false;
        }

        /**
         * Verify if current form is valid
         * @returns {boolean}
         */
        isValid () {
            return this.entryToSave.key && this.entryToSave.type && this.entryToSave.value;
        }

        /**
         * Called on envvar create/edit popover
         */
        save () {
            this.isLoading = true;

            if (this.entryToSave.isEdition) {
                this.HostingFrameworkEnvvar.edit(this.$stateParams.productId, this.entryToSave.key, this.entryToSave)
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
            } else {
                this.HostingFrameworkEnvvar.create(this.$stateParams.productId, this.entryToSave)
                    .then(() => {
                        this.Alerter.success(this.$scope.tr("hosting_tab_FRAMEWORK_envvar_save_success"), this.$scope.alerts.main);
                    })
                    .catch((err) => {
                        this.Alerter.error(this.$scope.tr("hosting_tab_FRAMEWORK_envvar_save_error") + err.message, this.$scope.alerts.main);
                    })
                    .finally(() => {
                        this.$scope.resetAction();
                    })
                ;
            }
        }
    }
);
