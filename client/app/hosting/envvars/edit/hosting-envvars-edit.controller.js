angular.module('App').controller(
  'controllers.Hosting.Envvars.edit',
  class HostingEnvvarsEditCtrl {
    constructor($scope, $stateParams, Alerter, HostingEnvvars, translator) {
      this.$scope = $scope;
      this.$stateParams = $stateParams;

      this.Alerter = Alerter;
      this.HostingEnvvars = HostingEnvvars;
      this.translator = translator;
    }

    $onInit() {
      this.entryToEdit = angular.copy(this.$scope.currentActionData).envvar;

      this.$scope.edit = () => this.edit();
      this.$scope.isValid = () => this.isValid();
    }

    isValid() {
      return (
        _(this.editEnvvarForm).isObject()
        && this.editEnvvarForm.$dirty
        && this.editEnvvarForm.$valid
      );
    }

    edit() {
      return this.HostingEnvvars.edit(
        this.$stateParams.productId,
        this.entryToEdit.key,
        this.entryToEdit,
      )
        .then(() => {
          this.Alerter.success(
            this.$scope.tr('hosting_tab_ENVVARS_edit_success'),
            this.$scope.alerts.main,
          );
        })
        .catch((err) => {
          this.Alerter.error(
            this.$scope.tr('hosting_tab_ENVVARS_edit_error') + err.message,
            this.$scope.alerts.main,
          );
        })
        .finally(() => {
          this.$scope.resetAction();
        });
    }
  },
);
