angular.module('App').controller(
  'EmailsChangePasswordAccountCtrl',
  class EmailsChangePasswordAccountCtrl {
    /**
     * Constructor
     * @param $scope
     * @param $stateParams
     * @param Alerter
     * @param Emails
     */
    constructor($scope, $stateParams, Alerter, Emails) {
      this.$scope = $scope;
      this.$stateParams = $stateParams;
      this.Alerter = Alerter;
      this.Emails = Emails;
    }

    $onInit() {
      this.currentAccount = null;
      this.constants = {
        passwordMaxLength: 30,
        passwordMinLength: 9,
      };
      this.model = { password: '' };
      this.validation = { password: '' };

      if (_.get(this.$scope.currentActionData, 'delegate', false)) {
        this.currentAccount = this.$scope.currentActionData.account;
      } else {
        this.currentAccount = this.$scope.currentActionData;
      }

      this.$scope.changePasswordAccount = () => this.changePasswordAccount();
    }

    accountPasswordCheck(input) {
      input.$setValidity(
        'passwordCheck',
        !!this.model.password &&
          !/^\s/.test(this.model.password) &&
          !/\s$/.test(this.model.password) &&
          !this.model.password.match(/[ÂÃÄÀÁÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿ]/),
      );
    }

    isPasswordMatches() {
      return this.model.password === this.validation.password;
    }

    isPasswordDefined() {
      return this.model.password && this.validation.password;
    }

    changePasswordAccount() {
      let passwordPromise = null;
      if (_.get(this.$scope.currentActionData, 'delegate', false)) {
        passwordPromise = this.Emails.changePasswordDelegatedAccount(
          this.currentAccount.email,
          this.model,
        );
      } else {
        passwordPromise = this.Emails.changePasswordAccount(
          this.$stateParams.productId,
          this.currentAccount.accountName,
          this.model,
        );
      }

      passwordPromise
        .then(() =>
          this.Alerter.success(
            this.$scope.tr('email_tab_modal_change_account_password_success'),
            this.$scope.alerts.main,
          ))
        .catch(err =>
          this.Alerter.alertFromSWS(
            this.$scope.tr('email_tab_modal_change_account_password_error'),
            err,
            this.$scope.alerts.main,
          ))
        .finally(() => this.$scope.resetAction());
    }
  },
);
