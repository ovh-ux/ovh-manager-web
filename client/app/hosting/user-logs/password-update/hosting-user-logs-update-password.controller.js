angular.module('App').controller(
  'HostingUserLogsUpdatePasswordCtrl',
  class HostingUserLogsUpdatePasswordCtrl {
    constructor($scope, $stateParams, Alerter, Hosting) {
      this.$scope = $scope;
      this.$stateParams = $stateParams;
      this.Alerter = Alerter;
      this.Hosting = Hosting;
    }

    $onInit() {
      this.condition = this.Hosting.constructor.getPasswordConditions();
      this.login = this.$scope.currentActionData;
      this.password = {
        value: null,
        confirmation: null,
      };

      this.$scope.updatePassword = () => this.updatePassword();
    }

    isPasswordInvalid() {
      return !this.Hosting.constructor.isPasswordValid(_.get(this.password, 'value', ''));
    }

    isPasswordConfirmationInvalid() {
      return this.password.value !== this.password.confirmation;
    }

    isPasswordValid() {
      return (
        this.password.value
        && this.password.confirmation
        && this.password.value === this.password.confirmation
        && this.Hosting.constructor.isPasswordValid(this.password.value)
      );
    }

    shouldDisplayDifferentPasswordMessage() {
      return (
        this.password.value
        && this.password.confirmation
        && this.password.value !== this.password.confirmation
      );
    }

    updatePassword() {
      this.$scope.resetAction();
      return this.Hosting.userLogsChangePassword(
        this.$stateParams.productId,
        this.login,
        this.password.value,
      )
        .then(() => {
          this.Alerter.success(
            this.$scope.tr('hosting_tab_USER_LOGS_configuration_change_password_success'),
            this.$scope.alerts.main,
          );
        })
        .catch((err) => {
          this.Alerter.alertFromSWS(
            this.$scope.tr(
              'hosting_tab_USER_LOGS_configuration_change_password_fail',
              [this.login],
            ),
            _.get(err, 'data', err),
            this.$scope.alerts.main,
          );
        });
    }
  },
);
