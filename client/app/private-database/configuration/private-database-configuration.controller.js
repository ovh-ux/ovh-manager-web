/* global angular*/
angular.module("App").controller(
    "PrivateDatabaseConfigurationsCtrl",
    class PrivateDatabaseConfigurationsCtrl {
        constructor (Alerter, PrivateDatabase, $scope, $stateParams) {
            this.alerter = Alerter;
            this.privateDatabaseService = PrivateDatabase;
            this.$scope = $scope;
            this.$stateParams = $stateParams;
        }

        $onInit () {
            this.productId = this.$stateParams.productId;

            this.database = this.$scope.database;
            this.loading = false;
            this.isRebooting = false;
            this.edit = {
                value: false
            };

            this.getConfigurationDetails();
        }

        getConfigurationDetails () {
            this.loading = true;
            this.privateDatabaseService
                .getConfigurationDetails(this.productId)
                .then((config) => {
                    this.configurations = config.details;
                    this.baseConfiguration = angular.copy(config.details);
                })
                .catch((err) => {
                    this.alerter.alertFromSWS(this.$scope.tr("privateDatabase_configuration_error"), err, this.$scope.alerts);
                })
                .finally(() => {
                    this.loading = false;
                });
        }

        updateConfigurations () {
            this.loading = true;
            this.edit.value = false;
            const parameters = _.map(this.configurations, (conf) => ({ key: conf.key, value: conf.value }));

            this.privateDatabaseService
                .changeConfigurationDetails(this.productId, { parameters })
                .then(() => {
                    this.alerter.success(this.$scope.tr("privateDatabase_configuration_reboot"), this.$scope.alerts);
                    return this.privateDatabaseService.pollConfigurationChange(this.productId);
                })
                .then(() => {
                    this.alerter.success(this.$scope.tr("privateDatabase_configuration_success"), this.$scope.alerts);
                })
                .catch((err) => {
                    this.alerter.alertFromSWS(this.$scope.tr("privateDatabase_configuration_error_put"), err, this.$scope.alerts);
                })
                .finally(() => {
                    this.edit.value = false;
                    this.loading = false;
                    this.isRebooting = false;
                    this.getConfigurationDetails();
                });
        }
    }
);
