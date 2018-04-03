/* global angular*/
angular.module("App").controller(
    "PrivateDatabaseConfigurationsCtrl",
    class PrivateDatabaseConfigurationsCtrl {
        constructor (Alerter, PrivateDatabase, translator, $q, $scope, $stateParams) {
            this.alerter = Alerter;
            this.privateDatabaseService = PrivateDatabase;
            this.translator = translator;
            this.$q = $q;
            this.$scope = $scope;
            this.$stateParams = $stateParams;
        }

        $onInit () {
            this.productId = this.$stateParams.productId;

            this.database = this.$scope.database;
            this.loading = false;
            this.edit = {
                value: false
            };

            this.getConfigurationDetails();
        }

        getConfigurationDetails () {
            this.loading = true;
            return this.privateDatabaseService
                .getConfigurationDetails(this.productId)
                .then((config) => {
                    this.configurations = config.details.map((field) => this.convertAvailableValues(field));
                })
                .catch((error) => {
                    this.alerter.error(this.translator.tr("privateDatabase_configuration_error"), this.$scope.alerts.main);
                    this.$q.reject(error);
                })
                .finally(() => {
                    this.loading = false;
                });
        }

        convertAvailableValues (field) {
            field.description = this.getFieldDescriptionTranslated(field);
            field.availableValues = field.availableValues.map((value) => ({ id: value, text: value }));
            if (field.key === "autocommit") {
                PrivateDatabaseConfigurationsCtrl.convertFieldAsToggle(field);
                field.availableValues = [{ id: "0", text: " OFF" }, { id: "1", text: "ON" }];
            } else if (field.key === "event_scheduler") {
                PrivateDatabaseConfigurationsCtrl.convertFieldAsToggle(field);
            } else {
                field.type = "select";
                field.selectedValue = field.availableValues.find((value) => value.id === field.value);
            }
            return field;
        }

        static convertFieldAsToggle (field) {
            field.type = "toggle";
            field.selectedValue = { id: field.value };
        }

        getFieldDescriptionTranslated (field) {
            const translationId = `privateDatabase_configuration_field_${field.key}`;
            let description = this.translator.tr(translationId);
            if (_.includes(description, translationId)) {
                description = field.description;
            }
            return description;
        }

        updateConfigurations () {
            if (this.dbConfigurationForm.$invalid) {
                return this.$q.reject();
            }
            this.loading = true;
            this.edit.value = false;
            const parameters = this.configurations.map((conf) => ({ key: conf.key, value: conf.selectedValue.id }));

            return this.privateDatabaseService
                .changeConfigurationDetails(this.productId, { parameters })
                .then(() => {
                    this.alerter.success(this.translator.tr("privateDatabase_configuration_reboot"), this.$scope.alerts.main);
                    return this.privateDatabaseService.pollConfigurationChange(this.productId);
                })
                .then(() => {
                    this.alerter.success(this.translator.tr("privateDatabase_configuration_success"), this.$scope.alerts.main);
                })
                .catch((error) => {
                    this.alerter.error(this.translator.tr("privateDatabase_configuration_error_put"), this.$scope.alerts.main);
                    this.$q.reject(error);
                })
                .finally(() => {
                    this.edit.value = false;
                    this.loading = false;
                    this.getConfigurationDetails();
                });
        }
    }
);
