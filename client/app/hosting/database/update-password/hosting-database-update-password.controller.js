angular.module("App").controller(
    "HostingDatabaseChangePasswordCtrl",
    class HostingDatabaseChangePasswordCtrl {
        constructor ($scope, $stateParams, Alerter, Hosting, HostingDatabase) {
            this.$scope = $scope;
            this.$stateParams = $stateParams;
            this.Alerter = Alerter;
            this.Hosting = Hosting;
            this.HostingDatabase = HostingDatabase;
        }

        $onInit () {
            this.customPasswordConditions = {
                max: 12
            };
            this.databaseName = this.$scope.currentActionData;
            this.password = {
                value: null,
                confirmation: null
            };

            this.condition = this.Hosting.getPasswordConditions(this.customPasswordConditions);

            this.$scope.updatePassword = () => this.updatePassword();
        }

        shouldDisplayDifferentPasswordMessage () {
            return this.password.value && this.password.confirmation && this.password.value !== this.password.confirmation;
        }

        isPasswordValid () {
            return this.password.value && this.password.confirmation && this.password.value === this.password.confirmation && this.Hosting.isPasswordValid(this.password.value, this.customPasswordConditions);
        }

        isPasswordInvalid () {
            return !this.Hosting.isPasswordValid(_.get(this.password, "value"), this.customPasswordConditions);
        }

        isPasswordConfirmationInvalid () {
            return this.password.value !== this.password.confirmation;
        }

        updatePassword () {
            this.$scope.resetAction();
            return this.HostingDatabase.changePassword(this.$stateParams.productId, this.databaseName, this.password.value)
                .then(() => {
                    this.Alerter.success(this.$scope.tr("hosting_tab_DATABASES_configuration_update_password_success"), this.$scope.alerts.databases);
                })
                .catch((err) => {
                    _.set(err, "type", err.type || "ERROR");
                    this.Alerter.alertFromSWS(this.$scope.tr("hosting_tab_DATABASES_configuration_update_password_fail", [this.databaseName]), _.get(err, "data", err), this.$scope.alerts.databases);
                }
            );
        }
    }
);
