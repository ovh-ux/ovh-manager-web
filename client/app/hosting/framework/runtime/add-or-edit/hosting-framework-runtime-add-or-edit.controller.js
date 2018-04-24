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
            this.entryToSave = {
                name: null,
                type: null,
                publicDir: null,
                appEnv: null,
                appBootstrap: null
            };

            this.title = this.translator.tr("hosting_tab_FRAMEWORK_runtime_create_title");

            const actionData = angular.copy(this.$scope.currentActionData);
            if (actionData) {
                this.entryToSave = actionData;
                this.entryToSave.isEdition = true;

                this.title = this.translator.tr("hosting_tab_FRAMEWORK_runtime_edit_title");
            }

            this.$scope.save = () => this.save();
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
            if (this.this.entryToSave && this.entryToSave.type && this.entryToSave.type.indexOf("nodejs") !== -1) {
                return this.entryToSave && this.entryToSave.name && this.entryToSave.publicDir && this.entryToSave.appEnv && this.entryToSave.appBootstrap;
            }

            return this.entryToSave && this.entryToSave.name && this.entryToSave.type;
        }

        /**
         * Called on runtime create/edit popover
         */
        save () {
            this.isLoading = true;

            if (this.entryToSave.isEdition) {
                this.HostingFrameworkRuntime.edit(this.$stateParams.productId, this.entryToSave.id, this.entryToSave)
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
            } else {
                this.HostingFrameworkRuntime.create(this.$stateParams.productId, this.entryToSave)
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
    }
);
