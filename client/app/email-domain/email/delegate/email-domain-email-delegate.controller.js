angular.module('App').controller(
  'EmailsDelegateCtrl',
  class EmailsDelegateCtrl {
    /**
     * Constructor
     * @param $scope
     * @param $stateParams
     * @param Alerter
     * @param Emails
     * @param constants
     * @param translator
     */
    constructor($scope, $stateParams, Alerter, Emails, constants, translator) {
      this.$scope = $scope;
      this.$stateParams = $stateParams;
      this.Alerter = Alerter;
      this.Emails = Emails;
      this.constants = constants;
      this.translator = translator;
    }

    $onInit() {
      this.addDelegateShown = false;
      this.createNicUrl = this.constants.WEBSITE_URLS.new_nic[
        this.translator.getSelectedAvailableLanguage().value
      ] || null;
      this.currentAccount = this.$scope.currentActionData.accountName || null;
      this.delegationAccountList = [];
      this.loading = false;
      this.model = { value: '' };
      this.nicPattern = /^\w{1,10}\d{0,8}(-ovh){1}$/i;

      this.initDelegate();
    }

    initDelegate() {
      this.loading = true;
      this.addDelegateShown = false;
      return this.Emails.getDelegationList(
        this.$stateParams.productId,
        this.currentAccount,
      )
        .then((list) => {
          this.delegationAccountList = list;
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

    addDelegate() {
      this.loading = true;
      return this.Emails.addDelegation(
        this.$stateParams.productId,
        this.currentAccount,
        this.model.value,
      )
        .then(() => {
          this.delegationAccountList.push(this.model.value);
          this.model.value = '';
        })
        .catch((err) => {
          this.Alerter.alertFromSWS(
            this.$scope.tr('email_tab_error'),
            _.get(err, 'data', err),
            this.$scope.alerts.main,
          );
          this.$scope.resetAction();
        })
        .finally(() => {
          this.addDelegateShown = false;
          this.loading = false;
        });
    }

    removeDelegate(delegationAccount) {
      this.loading = true;
      return this.Emails.removeDelegation(
        this.$stateParams.productId,
        this.currentAccount,
        delegationAccount,
      )
        .then(() => _.remove(
          this.delegationAccountList,
          name => name === delegationAccount,
        ))
        .catch((err) => {
          this.Alerter.alertFromSWS(
            this.$scope.tr('email_tab_error'),
            _.get(err, 'data', err),
            this.$scope.alerts.main,
          );
          this.$scope.resetAction();
        })
        .finally(() => {
          this.loading = false;
        });
    }
  },
);
