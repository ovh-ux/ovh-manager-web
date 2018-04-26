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
            this.entryToCreate = {
                key: null,
                type: null,
                value: null
            };

            this.$scope.create = () => this.create();
            this.$scope.isValid = () => this.isValid();

            this.isLoading = false;
        }

        /**
         * Verify if current form key entry does not contain any spaces
         * @returns {boolean}
         */
        isKeyValid () {
            return this.entryToCreate && this.entryToCreate.key && this.entryToCreate.key.indexOf(" ") === -1;
        }

        /**
         * Verify if current form is valid
         * @returns {boolean}
         */
        isValid () {
            return this.entryToCreate && this.isKeyValid() && this.entryToCreate.type && this.entryToCreate.value;
        }

        /**
         * Called on envvar create/edit popover
         */
        create () {
            this.isLoading = true;

            this.HostingFrameworkEnvvar.create(this.$stateParams.productId, this.entryToCreate)
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
);
