angular.module('controllers').controller(
  'controllers.Domain.Glue.Delete',
  class DomainGlueDeleteCtrl {
    constructor($scope, $stateParams, Alerter, Domain) {
      this.$scope = $scope;
      this.$stateParams = $stateParams;
      this.Alerter = Alerter;
      this.Domain = Domain;
    }

    $onInit() {
      this.glueRecord = this.$scope.currentActionData;
      this.loading = false;

      this.$scope.deleteGlueRecord = () => this.deleteGlueRecord();
    }

    deleteGlueRecord() {
      this.loading = true;
      return this.Domain.deleteGlueRecord(
        this.$stateParams.productId,
        this.glueRecord.host,
      )
        .then(() => this.Alerter.success(
          this.$scope.tr('domain_tab_GLUE_delete_success'),
          this.$scope.alerts.main,
        ))
        .catch(err => this.Alerter.alertFromSWS(
          this.$scope.tr('domain_tab_GLUE_delete_error'),
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
