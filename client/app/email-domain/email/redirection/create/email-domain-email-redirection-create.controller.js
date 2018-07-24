angular.module('App').controller(
  'EmailsCreateRedirectionCtrl',
  class EmailsCreateRedirectionCtrl {
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
      this.constants = {
        nameMaxLength: 32,
        nameMinLength: 2,
        nameRegexPattern: /^\w+[\w.-]+\w*$/,
      };
      this.copyChoices = ['local', 'none'];
      this.domain = this.$stateParams.productId;
      this.loading = false;
      this.model = {
        redirectionFrom: '',
        redirectionKeepCopy: null,
        redirectionSubdomainFrom: '',
        redirectionTo: '',
      };

      this.$scope.createRedirection = () => this.createRedirection();
    }

    isAccountNameValid(name) {
      return (
        !name
        || (name.length >= this.constants.nameMinLength
          && name.length <= this.constants.nameMaxLength
          && this.constants.nameRegexPattern.test(name))
      );
    }

    redirectionToCheck(input) {
      input.$setValidity(
        'redirectionTo',
        validator.isEmail(this.model.redirectionTo),
      );
    }

    createRedirection() {
      return this.Emails.createRedirection(this.$stateParams.productId, {
        from: `${_.trim(this.model.redirectionFrom)}@${_.trim(this.model.redirectionSubdomainFrom)}${this.model.redirectionSubdomainFrom && '.'}${this.domain}`,
        localCopy: this.model.redirectionKeepCopy === 'local',
        to: this.model.redirectionTo,
      })
        .then(() => this.Alerter.success(
          this.$scope.tr('email_tab_modal_create_redirection_success'),
          this.$scope.alerts.main,
        ))
        .catch(err => this.Alerter.alertFromSWS(
          this.$scope.tr('email_tab_modal_create_redirection_error'),
          err,
          this.$scope.alerts.main,
        ))
        .finally(() => this.$scope.resetAction());
    }
  },
);
