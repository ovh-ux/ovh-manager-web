angular.module('App').controller(
  'HostingEnvvarsCreateCtrl',
  class HostingEnvvarsCreateCtrl {
    constructor($scope, $stateParams, Alerter, HostingEnvvars, translator) {
      this.$scope = $scope;
      this.$stateParams = $stateParams;

      this.Alerter = Alerter;
      this.HostingEnvvars = HostingEnvvars;
      this.translator = translator;
    }

    $onInit() {
      this.entryToCreate = {
        key: null,
        type: 'string',
        value: null,
      };

      this.$scope.create = () => this.create();
      this.$scope.isValid = () => this.isValid();
    }

    isValid() {
      return (
        _(this.addEnvvarForm).isObject()
        && this.addEnvvarForm.$dirty
        && this.addEnvvarForm.$valid
      );
    }

    create() {
      this.HostingEnvvars.create(
        this.$stateParams.productId,
        this.entryToCreate,
      )
        .then(() => {
          this.Alerter.success(
            this.$scope.tr('hosting_tab_ENVVARS_save_success'),
            this.$scope.alerts.main,
          );
        })
        .catch((err) => {
          this.Alerter.error(
            this.$scope.tr('hosting_tab_ENVVARS_save_error') + err.message,
            this.$scope.alerts.main,
          );
        })
        .finally(() => {
          this.$scope.resetAction();
        });
    }
  },
);
