angular.module('App').controller(
  'HostingDatabaseChangePasswordCtrl',
  class HostingDatabaseChangePasswordCtrl {
    constructor($scope, $stateParams, Alerter, Hosting, HostingDatabase) {
      this.$scope = $scope;
      this.$stateParams = $stateParams;
      this.Alerter = Alerter;
      this.Hosting = Hosting;
      this.HostingDatabase = HostingDatabase;
    }

    $onInit() {
      this.condition = this.Hosting.constructor.getPasswordConditions();
      this.databaseName = this.$scope.currentActionData;
      this.password = {
        value: null,
        confirmation: null,
      };

      this.$scope.updatePassword = () => this.updatePassword();
    }

    shouldDisplayDifferentPasswordMessage() {
      return (
        this.password.value &&
        this.password.confirmation &&
        this.password.value !== this.password.confirmation
      );
    }

    validPassword(password, confirmation) {
      const validPassword = this.Hosting.constructor.isPasswordValid(_.get(this.password, 'value'));
      const validConfirmation =
        this.password.value &&
        this.password.value === this.password.confirmation;
      password.$setValidity('password', validPassword);
      confirmation.$setValidity('confirm', validConfirmation);
    }

    updatePassword() {
      this.$scope.resetAction();
      return this.HostingDatabase.changePassword(
        this.$stateParams.productId,
        this.databaseName,
        this.password.value,
      )
        .then(() => {
          this.Alerter.success(
            this.$scope.tr('hosting_tab_DATABASES_configuration_update_password_success'),
            this.$scope.alerts.main,
          );
        })
        .catch((err) => {
          _.set(err, 'type', err.type || 'ERROR');
          this.Alerter.alertFromSWS(
            this.$scope.tr(
              'hosting_tab_DATABASES_configuration_update_password_fail',
              [this.databaseName],
            ),
            _.get(err, 'data', err),
            this.$scope.alerts.main,
          );
        });
    }
  },
);
