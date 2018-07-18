angular.module('App').controller(
  'EmailsUpdateAccountCtrl',
  class EmailsUpdateAccountCtrl {
    /**
     * Constructor
     * @param $scope
     * @param $stateParams
     * @param Alerter
     * @param Emails
     * @param User
     */
    constructor($scope, $stateParams, Alerter, Emails, User) {
      this.$scope = $scope;
      this.$stateParams = $stateParams;
      this.Alerter = Alerter;
      this.Emails = Emails;
      this.User = User;
    }

    $onInit() {
      this.isDelegate = _.get(this.$scope.currentActionData, 'delegate', false);
      this.account = angular.copy(this.isDelegate
        ? this.$scope.currentActionData.account
        : this.$scope.currentActionData);
      this.accountSize = [];
      this.constants = {
        descMaxLength: 32,
        descRegexPattern: /^[^:§⁼]*$/,
      };
      this.loading = false;

      this.$scope.updateAccount = () => this.updateAccount();

      this.User.getUrlOf('exchangeOrder')
        .then((exchangeOrder) => {
          this.exchangeOrderUrl = exchangeOrder;
        })
        .catch(() => {
          this.exchangeOrderUrl = null;
        });
      this.User.getUrlOf('guides')
        .then((guides) => {
          this.guideMigrate = _.get(guides, 'emailsMigrateToExchange');
        })
        .catch(() => {
          this.guideMigrate = null;
        });

      this.getAccountSize();
    }

    accountDescriptionCheck(input) {
      input.$setValidity(
        'descriptionCheck',
        !this.account.description
          || punycode.toASCII(this.account.description).length
            <= this.constants.descMaxLength,
      );
    }

    getAccountSize() {
      this.loading = true;
      let accountSizePromise;

      if (this.isDelegate) {
        accountSizePromise = this.Emails.getDelegatedEmail(this.account.email);
      } else {
        accountSizePromise = this.Emails.getDomain(this.$stateParams.productId);
      }

      return accountSizePromise
        .then((data) => {
          this.accountSize = data.allowedAccountSize;
        })
        .catch(err => this.Alerter.alertFromSWS(
          this.$scope.tr('email_tab_error'),
          _.get(err, 'data', err),
          this.$scope.alerts.main,
        ))
        .finally(() => {
          this.loading = false;
        });
    }

    updateAccount() {
      this.loading = true;
      const data = {
        description: this.account.description
          ? punycode.toASCII(this.account.description)
          : '',
        size: this.account.size,
      };

      let accountPromise;
      if (this.isDelegate) {
        accountPromise = this.Emails.updateDelegatedAccount(
          this.account.email,
          data,
        );
      } else {
        accountPromise = this.Emails.updateAccount(
          this.$stateParams.productId,
          this.account.accountName,
          data,
        );
      }

      return accountPromise
        .then(() => this.Alerter.success(
          this.$scope.tr('email_tab_modal_update_account_success'),
          this.$scope.alerts.main,
        ))
        .catch(err => this.Alerter.alertFromSWS(
          this.$scope.tr('email_tab_modal_update_account_error'),
          _.get(err, 'data', err),
          this.$scope.alerts.main,
        ))
        .finally(() => {
          this.loading = false;
          this.$scope.resetAction();
        });
    }
  },
);
