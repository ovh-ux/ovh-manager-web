angular.module('controllers').controller(
  'controllers.Domain.Options.Delete',
  class DomainDnsLockCtrl {
    constructor($scope, $rootScope, $translate, Alerter, Domain) {
      this.$scope = $scope;
      this.$rootScope = $rootScope;
      this.$translate = $translate;
      this.Alerter = Alerter;
      this.Domain = Domain;
    }

    $onInit() {
      this.loading = false;
      this.domain = this.$scope.currentActionData.domain;
      this.option = this.$scope.currentActionData.option;
    }

    closeModal() {
      this.$scope.resetAction();
    }

    deleteDomain() {
      this.loading = true;
      return this.Domain.deleteOption(
        this.domain.name,
        this.option.option,
      )
        .then(() => this.Alerter.success(
          this.$translate.instant('domain_tab_options_delete_success'),
          this.$scope.alerts.main,
        ))
        .catch((err) => {
          this.Alerter.alertFromSWS(
            this.$translate.instant('domain_tab_options_delete_error'),
            Object.assign({}, err, { type: err.type || 'ERROR' }),
            this.$scope.alerts.main,
          );
        })
        .finally(() => {
          this.loading = false;
          this.$rootScope.$broadcast('Domain.Options.Delete');
          this.$scope.resetAction();
        });
    }
  },
);
