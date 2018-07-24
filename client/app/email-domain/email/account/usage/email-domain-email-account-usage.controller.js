angular.module('App').controller(
  'EmailsUpdateUsageAccountCtrl',
  class EmailsUpdateUsageAccountCtrl {
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
      this.isDelegate = _.get(this.$scope.currentActionData, 'delegate', false);
      this.account = this.isDelegate
        ? this.$scope.currentActionData.account
        : this.$scope.currentActionData;
      this.lastUpdated = {
        diff: null,
        value: null,
      };
      this.loading = false;

      this.$scope.updateUsageAccount = () => this.updateUsageAccount();

      this.getUsageAccount();
    }

    getUsageAccount() {
      this.loading = true;

      let getUsagePromise;
      if (this.isDelegate) {
        getUsagePromise = this.Emails.getEmailDelegatedUsage(this.account.email);
      } else {
        getUsagePromise = this.Emails.getEmailUsage(
          this.$stateParams.productId,
          this.account.accountName,
        );
      }

      return getUsagePromise
        .then((quota) => {
          this.lastUpdated.value = quota.date;
          this.lastUpdated.diff = parseInt(
            moment().diff(this.lastUpdated.value, 'minutes'),
            10,
          );
        })
        .finally(() => {
          this.loading = false;
        });
    }

    isCheckAuthorized() {
      return !this.lastUpdated.diff || this.lastUpdated.diff > 5;
    }

    isUsageRequestValid() {
      return (
        !this.loading && !this.account.isBlocked && this.isCheckAuthorized()
      );
    }

    updateUsageAccount() {
      this.loading = true;

      let updateUsagePromise;
      if (this.isDelegate) {
        updateUsagePromise = this.Emails.updateDelegatedUsage(this.account.email);
      } else {
        updateUsagePromise = this.Emails.updateUsage(
          this.$stateParams.productId,
          this.account.accountName,
        );
      }

      return updateUsagePromise
        .then(() => this.Alerter.success(
          this.$scope.tr('email_tab_modal_update_usage_success'),
          this.$scope.alerts.main,
        ))
        .catch(err => this.Alerter.alertFromSWS(
          this.$scope.tr('email_tab_modal_update_usage_error'),
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
