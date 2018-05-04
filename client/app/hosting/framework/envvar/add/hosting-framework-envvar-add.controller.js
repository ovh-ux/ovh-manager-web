angular.module("App").controller(
    "controllers.Hosting.Framework.Envvar.create",
    class HostingFrameworkEnvvarCreateCtrl {
        constructor ($scope, $stateParams, Alerter, HostingFrameworkEnvvar, translator) {
            this.$scope = $scope;
            this.$stateParams = $stateParams;

            this.Alerter = Alerter;
            this.HostingFrameworkEnvvar = HostingFrameworkEnvvar;
            this.translator = translator;
        }

        $onInit () {
            this.isLoading = true;
            this.entryToCreate = {
                key: null,
                type: "string",
                value: null
            };

            this.$scope.create = () => this.create();
            this.$scope.isValid = () => this.isValid();
        }

        isValid () {
            return this.addEnvvarForm.$dirty && this.addEnvvarForm.$valid;
        }

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
