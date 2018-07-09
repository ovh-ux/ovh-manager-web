angular.module('App').controller(
  'HostingDatabaseCheckQuotaCtrl',
  class HostingDatabaseCheckQuotaCtrl {
    constructor($scope, $stateParams, Alerter, HostingDatabase) {
      this.$scope = $scope;
      this.$stateParams = $stateParams;
      this.alerter = Alerter;
      this.hostingDatabaseService = HostingDatabase;
    }

    $onInit() {
      this.bddName = this.$scope.currentActionData.database;
      this.$scope.checkQuota = () => this.checkQuota();
    }

    checkQuota() {
      const completionDeferred = this.$scope.currentActionData.deferred;

      this.$scope.resetAction();
      return this.hostingDatabaseService
        .requestDatabaseQuotaCheck(this.$stateParams.productId, this.bddName)
        .then((data) => {
          this.alerter.success(
            this.$scope.tr(
              'hosting_tab_DATABASES_configuration_check_quota_success',
              [this.bddName],
            ),
            this.$scope.alerts.main,
          );
          completionDeferred.resolve(data);
        })
        .catch((err) => {
          _.set(err, 'type', err.type || 'ERROR');
          this.alerter.alertFromSWS(
            this.$scope.tr('hosting_tab_DATABASES_configuration_check_quota_fail'),
            _.get(err, 'data', err),
            this.$scope.alerts.main,
          );
          completionDeferred.reject(err);
        });
    }
  },
);
