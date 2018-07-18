angular.module('App').controller(
  'DomainDynHostLoginDeleteCtrl',
  class DomainDynHostLoginDeleteCtrl {
    constructor($scope, Alerter, Domain) {
      this.$scope = $scope;
      this.Alerter = Alerter;
      this.Domain = Domain;
    }

    $onInit() {
      this.login = angular.copy(this.$scope.currentActionData.login);
      this.zoneName = angular.copy(this.$scope.currentActionData.zoneName);

      this.loading = false;

      this.$scope.deleteLogin = () => this.deleteLogin();
    }

    deleteLogin() {
      this.loading = true;
      return this.Domain.deleteDynHostLogin(this.zoneName, this.login)
        .then(() => this.Domain.refreshZoneState(this.zoneName).then(() => this.Alerter.success(
          this.$scope.tr('domain_tab_DYNHOSTLOGIN_delete_success'),
          this.$scope.alerts.main,
        )))
        .catch(err => this.Alerter.alertFromSWS(
          this.$scope.tr('domain_tab_DYNHOST_error'),
          err,
          this.$scope.alerts.main,
        ))
        .finally(() => {
          this.loading = false;
          this.$scope.resetAction();
        });
    }
  },
);
