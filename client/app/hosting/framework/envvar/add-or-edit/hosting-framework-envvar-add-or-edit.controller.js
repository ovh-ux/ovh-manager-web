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
            this.entryToSave = {
                key: null,
                type: null,
                value: null
            };

            this.title = this.translator.tr("hosting_tab_FRAMEWORK_envvar_create_title");

            const actionData = angular.copy(this.$scope.currentActionData);
            if (actionData && actionData.envvar) {
                this.entryToSave = actionData.envvar;
                this.entryToSave.isEdition = true;

                this.title = this.translator.tr("hosting_tab_FRAMEWORK_envvar_edit_title");
            }

            this.$scope.save = () => this.save();
            this.$scope.isValid = () => this.isValid();

            this.isLoading = false;
        }

        /**
         * Verify if current form key entry does not contain any spaces
         * @returns {boolean}
         */
        isKeyValid () {
            return this.entryToSave && this.entryToSave.key && this.entryToSave.key.indexOf(" ") === -1;
        }

        /**
         * Verify if current form is valid
         * @returns {boolean}
         */
        isValid () {
            return this.entryToSave && this.isKeyValid() && this.entryToSave.type && this.entryToSave.value;
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
