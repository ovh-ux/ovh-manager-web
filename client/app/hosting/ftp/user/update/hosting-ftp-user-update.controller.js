angular.module('App').controller(
  'HostingFtpUserUpdateCtrl',
  class HostingFtpUserUpdateCtrl {
    constructor($scope, $stateParams, Alerter, Hosting, HostingUser) {
      this.$scope = $scope;
      this.$stateParams = $stateParams;
      this.Alerter = Alerter;
      this.Hosting = Hosting;
      this.HostingUser = HostingUser;
    }

    $onInit() {
      this.classes = {
        homeInvalid: '',
      };
      this.model = {
        user: this.$scope.currentActionData.user,
        userLogin: this.$scope.currentActionData.user.login,
        os: {
          LINUX: 'linux',
          WINDOWS: 'windows',
        },
        capabilities: null,
        operatingSystem: this.$scope.currentActionData.ftpInformations
          .operatingSystem,
      };

      this.$scope.updateUser = () => this.updateUser();

      this.HostingUser.getUserCreationCapabilities()
        .then((capabilities) => {
          this.model.capabilities = capabilities;
        })
        .catch((err) => {
          this.Alerter.alertFromSWS(
            this.$scope.tr('hosting_tab_FTP_configuration_user_modify_step1_loading_error'),
            _.get(err, 'data', err),
            this.$scope.alerts.main,
          );
        });
    }

    isPathValid() {
      return this.Hosting.constructor.isPathValid(this.model.user.home);
    }

    isStep1Valid() {
      return this.model.user.state !== null && this.isPathValid();
    }

    getSelectedHome() {
      let home;
      if (this.model.user.home !== null) {
        if (
          /^\/.*/.test(this.model.user.home)
          || this.model.user.isPrimaryAccount
        ) {
          return this.model.user.home;
        }
        return `./${this.model.user.home}`;
      }
      return home;
    }

    sshStateChange() {
      if (this.model.user.state && this.model.user.state === 'off') {
        this.model.user.sshState = 'none';
      }
    }

    updateUser() {
      this.$scope.resetAction();
      const user = angular.copy(this.model.user);
      delete user.isPrimaryAccount;

      return this.HostingUser.updateUser(this.$stateParams.productId, {
        login: this.model.userLogin,
        data: user,
      })
        .then(() => {
          this.Alerter.success(
            this.$scope.tr('hosting_tab_FTP_configuration_user_modify_success'),
            this.$scope.alerts.main,
          );
        })
        .catch((err) => {
          this.Alerter.alertFromSWS(
            this.$scope.tr('hosting_tab_FTP_configuration_user_modify_fail'),
            err,
            this.$scope.alerts.main,
          );
        });
    }
  },
);
