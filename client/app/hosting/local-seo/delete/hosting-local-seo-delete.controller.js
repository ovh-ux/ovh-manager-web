angular.module('App').controller(
  'HostingLocalSeoDeleteCtrl',
  class HostingLocalSeoDeleteCtrl {
    constructor($scope, Alerter, HostingLocalSeo) {
      this.$scope = $scope;
      this.Alerter = Alerter;
      this.HostingLocalSeo = HostingLocalSeo;
    }

    $onInit() {
      this.location = angular.copy(this.$scope.currentActionData);
      this.loading = false;
    }

    deleteLocation() {
      this.loading = true;
      return this.HostingLocalSeo
        .deleteLocation(this.location)
        .then(() => this.Alerter.success(this.$scope.tr('hosting_tab_LOCAL_SEO_delete_success'), this.$scope.alerts.main))
        .catch(err => this.Alerter.alertFromSWS(this.$scope.tr('hosting_tab_LOCAL_SEO_delete_error'), err, this.$scope.alerts.main))
        .finally(() => {
          this.loading = false;
          this.$scope.resetAction();
        });
    }
  },
);
