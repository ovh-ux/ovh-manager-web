angular.module('App').controller(
  'HostingUserLogsCreateCtrl',
  class HostingUserLogsCreateCtrl {
    constructor($scope, $stateParams, Alerter, Hosting) {
      this.$scope = $scope;
      this.$stateParams = $stateParams;
      this.Alerter = Alerter;
      this.Hosting = Hosting;
    }

    $onInit() {
      this.condition = this.Hosting.constructor.getPasswordConditions();
      this.model = {
        maxUserLength: 200,
        minUserLength: 1,
        selected: {
          login: null,
          description: '',
          password: {
            value: null,
            confirmation: null,
          },
        },
      };

      this.$scope.createUser = () => this.createUser();
    }

    isPasswordInvalid() {
      return !this.Hosting.constructor.isPasswordValid(_.get(this.model, 'selected.password.value', ''));
    }

    isPasswordConfirmationInvalid() {
      return (
        this.model.selected.password.value
        !== this.model.selected.password.confirmation
      );
    }

    isPasswordValid() {
      return (
        this.model.selected.password.value
        && this.model.selected.password.confirmation
        && this.model.selected.password.value
          === this.model.selected.password.confirmation
        && this.Hosting.constructor.isPasswordValid(this.model.selected.password.value)
      );
    }

    isUserValid() {
      return (
        this.model.selected.login
        && this.model.selected.login.length >= this.model.minUserLength
        && this.model.selected.login.length <= this.model.maxUserLength
        && this.model.selected.login.match(/^[a-z-]+$/)
      );
    }

    shouldDisplayDifferentPasswordMessage() {
      return (
        this.model.selected.password.value
        && this.model.selected.password.confirmation
        && this.model.selected.password.value
          !== this.model.selected.password.confirmation
      );
    }

    createUser() {
      this.$scope.resetAction();
      return this.Hosting.userLogsCreate(
        this.$stateParams.productId,
        this.model.selected.description,
        this.model.selected.login,
        this.model.selected.password.value,
      )
        .then(() => {
          this.Alerter.success(
            this.$scope.tr('hosting_tab_USER_LOGS_configuration_user_create_success'),
            this.$scope.alerts.main,
          );
        })
        .catch((err) => {
          this.Alerter.alertFromSWS(
            this.$scope.tr('hosting_tab_USER_LOGS_configuration_user_create_fail'),
            _.get(err, 'data', err),
            this.$scope.alerts.main,
          );
        });
    }
  },
);
