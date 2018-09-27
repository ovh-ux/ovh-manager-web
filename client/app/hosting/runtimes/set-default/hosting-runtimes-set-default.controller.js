angular.module('App').controller(
  'controllers.Hosting.Runtimes.setDefault',
  class HostingRuntimesSetDefaultCtrl {
    constructor($scope, $stateParams, $translate, Alerter, HostingRuntimes) {
      this.$scope = $scope;
      this.$stateParams = $stateParams;
      this.$translate = $translate;

      this.Alerter = Alerter;
      this.HostingRuntimes = HostingRuntimes;
    }

    $onInit() {
      const actionData = angular.copy(this.$scope.currentActionData);
      this.entryToSetup = actionData.runtime;

      this.$scope.setDefault = () => this.setDefault();
    }

    setDefault() {
      return this.HostingRuntimes.setDefault(
        this.$stateParams.productId,
        this.entryToSetup.id,
      )
        .then(() => {
          this.Alerter.success(
            this.$translate.instant('hosting_tab_RUNTIMES_set_default_success'),
            this.$scope.alerts.main,
          );
        })
        .catch((err) => {
          this.Alerter.error(
            this.$translate.instant('hosting_tab_RUNTIMES_set_default_error')
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
