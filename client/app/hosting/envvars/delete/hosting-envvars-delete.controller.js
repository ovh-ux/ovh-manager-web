angular.module('App').controller(
  'controllers.Hosting.Envvars.delete',
  class HostingEnvvarsDeleteCtrl {
    constructor($scope, $stateParams, Alerter, HostingEnvvars, translator) {
      this.$scope = $scope;
      this.$stateParams = $stateParams;

      this.Alerter = Alerter;
      this.HostingEnvvars = HostingEnvvars;
      this.translator = translator;
    }

    $onInit() {
      this.entryToDelete = angular.copy(this.$scope.currentActionData).envvar;

      this.$scope.delete = () => this.delete();
    }

    delete() {
      return this.HostingEnvvars.delete(
        this.$stateParams.productId,
        this.entryToDelete.key,
      )
        .then(() => {
          this.Alerter.success(
            this.translator.tr('hosting_tab_ENVVARS_delete_success'),
            this.$scope.alerts.main,
          );
        })
        .catch((err) => {
          this.Alerter.error(
            this.translator.tr('hosting_tab_ENVVARS_delete_error')
              + err.message,
            this.$scope.alerts.main,
          );
        })
        .finally(() => {
          this.$scope.resetAction();
        });
    }
  },
);
