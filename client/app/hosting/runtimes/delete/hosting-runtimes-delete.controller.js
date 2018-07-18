angular.module('App').controller(
  'controllers.Hosting.Runtimes.delete',
  class HostingRuntimesDeleteCtrl {
    constructor($scope, $stateParams, Alerter, HostingRuntimes, translator) {
      this.$scope = $scope;
      this.$stateParams = $stateParams;

      this.Alerter = Alerter;
      this.HostingRuntimes = HostingRuntimes;
      this.translator = translator;
    }

    $onInit() {
      const actionData = angular.copy(this.$scope.currentActionData);
      this.entryToDelete = actionData.runtime;

      this.$scope.delete = () => this.delete();
    }

    delete() {
      this.HostingRuntimes.delete(
        this.$stateParams.productId,
        this.entryToDelete.id,
      )
        .then(() => {
          this.Alerter.success(
            this.translator.tr('hosting_tab_RUNTIMES_delete_success'),
            this.$scope.alerts.main,
          );
        })
        .catch((err) => {
          this.Alerter.error(
            this.translator.tr('hosting_tab_RUNTIMES_delete_error')
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
