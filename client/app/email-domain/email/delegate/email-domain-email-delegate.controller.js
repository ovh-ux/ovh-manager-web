angular.module('App').controller(
  'EmailsDelegateCtrl',
  class EmailsDelegateCtrl {
    /**
     * Constructor
     * @param $scope
     * @param $stateParams
     * @param $translate
     * @param Alerter
     * @param WucEmails
     * @param constants
     */
    constructor($scope, $stateParams, $translate, Alerter, WucEmails, constants) {
      this.$scope = $scope;
      this.$stateParams = $stateParams;
      this.$translate = $translate;
      this.Alerter = Alerter;
      this.WucEmails = WucEmails;
      this.constants = constants;
    }

    $onInit() {
      this.addDelegateShown = false;
      this.createNicUrl = this.constants.WEBSITE_URLS.new_nic[
        this.$translate.use()
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
      return this.WucEmails.getDelegationList(
        this.$stateParams.productId,
        this.currentAccount,
      )
        .then((list) => {
          this.delegationAccountList = list;
        })
        .catch(err => this.Alerter.alertFromSWS(
          this.$translate.instant('email_tab_error'),
          _.get(err, 'data', err),
          this.$scope.alerts.main,
        ))
        .finally(() => {
          this.loading = false;
        });
    }

    addDelegate() {
      this.loading = true;
      return this.WucEmails.addDelegation(
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
            this.$translate.instant('email_tab_error'),
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
      return this.WucEmails.removeDelegation(
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
            this.$translate.instant('email_tab_error'),
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
