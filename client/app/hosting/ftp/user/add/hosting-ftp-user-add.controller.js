angular.module('App').controller(
  'HostingFtpUserCreateCtrl',
  class HostingFtpUserCreateCtrl {
    constructor($scope, $stateParams, Alerter, Hosting, HostingUser) {
      this.$scope = $scope;
      this.$stateParams = $stateParams;
      this.Alerter = Alerter;
      this.Hosting = Hosting;
      this.HostingUser = HostingUser;
    }

    $onInit() {
      this.condition = this.Hosting.constructor.getPasswordConditions();
      this.model = {
        os: {
          LINUX: 'linux',
          WINDOWS: 'windows',
        },
        capabilities: null,
        maxUserLength: 20 - this.$scope.currentActionData.primaryLogin.length - 1,
        minUserLength: 1,
        operatingSystem: this.$scope.currentActionData.operatingSystem,
        primaryLogin: this.$scope.currentActionData.primaryLogin,
        selected: {
          login: null,
          home: null,
          password: {
            value: null,
            confirmation: null,
          },
        },
      };

      this.$scope.createUser = () => this.createUser();

      this.HostingUser.getUserCreationCapabilities()
        .then((capabilities) => {
          this.model.capabilities = capabilities;
        })
        .catch((err) => {
          this.Alerter.alertFromSWS(this.$scope.tr('hosting_tab_FTP_configuration_user_create_step1_loading_error'), _.get(err, 'data', err), this.$scope.alerts.main);
        });
    }

    isUserValid() {
      return this.model.selected.login != null &&
                this.model.selected.login.length >= this.model.minUserLength &&
                this.model.selected.login.length <= this.model.maxUserLength &&
                this.model.selected.login.match(/^[\w]+$/);
    }

    isPasswordValid() {
      return this.model.selected.password.value && this.model.selected.password.confirmation &&
                this.model.selected.password.value === this.model.selected.password.confirmation &&
                this.Hosting.constructor.isPasswordValid(this.model.selected.password.value);
    }

    isPasswordInvalid() {
      return !this.Hosting.constructor.isPasswordValid(_.get(this.model, 'selected.password.value'));
    }

    isPasswordConfirmationInvalid() {
      return this.model.selected.password.value !== this.model.selected.password.confirmation;
    }

    isPathValid() {
      return this.Hosting.constructor.isPathValid(this.model.selected.home);
    }

    isStep1Valid() {
      return this.isUserValid() && this.isPathValid();
    }

    getSelectedHome() {
      let home = '/';
      if (this.model.selected.home !== null) {
        if (/^\/.*/.test(this.model.selected.home || '') || /^\.\/.*/.test(this.model.selected.home || '')) {
          home = this.model.selected.home;
        } else {
          home = `./${this.model.selected.home}`;
        }
      }
      return home;
    }

    createUser() {
      this.$scope.resetAction();
      return this.HostingUser.addUser(this.$stateParams.productId, `${this.model.primaryLogin}-${this.model.selected.login}`, this.model.selected.password.value || '', this.getSelectedHome())
        .then(() => {
          this.Alerter.success(this.$scope.tr('hosting_tab_FTP_configuration_user_create_success'), this.$scope.alerts.main);
        })
        .catch((err) => {
          this.Alerter.alertFromSWS(this.$scope.tr('hosting_tab_FTP_configuration_user_create_fail'), err, this.$scope.alerts.main);
        });
    }
  },
);
