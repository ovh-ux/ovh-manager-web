angular.module('App').controller(
  'EmailsCreateFilterCtrl',
  class EmailsCreateFilterCtrl {
    constructor($scope, $stateParams, Alerter, Emails) {
      this.$scope = $scope;
      this.$stateParams = $stateParams;
      this.Alerter = Alerter;
      this.Emails = Emails;
    }

    $onInit() {
      this.account = this.$scope.currentActionData.account || null;
      this.accounts = _.map(this.$scope.currentActionData.accounts, account => `${account}@${this.account.domain}`);
      this.filters = this.$scope.currentActionData.filterNames || [];
      this.headers = ['From', 'To', 'Subject', 'other'];
      this.loading = false;
      this.model = {
        filterAction: null,
        filterActionParam: '',
        filterActive: true,
        filterName: '',
        filterPriority: '',
        rules: [
          {
            header: '',
            operand: null,
            value: '',
            headerSelect: null,
          },
        ],
      };

      this.$scope.createFilter = () => this.createFilter();

      this.getModels();
    }

    getModels() {
      this.loading = true;
      this.Emails
        .getModels()
        .then((models) => {
          this.actions = models.models['domain.DomainFilterActionEnum'].enum;
          this.operands = models.models['domain.DomainFilterOperandEnum'].enum;
        })
        .catch(() => {
          this.actions = [];
          this.operands = [];
        })
        .finally(() => (this.loading = false));
    }

    addRule() {
      this.model.rules.push({
        header: '', operand: null, value: '', headerSelect: null,
      });
    }

    removeRule(rule) {
      this.model.rules.splice(this.model.rules.indexOf(rule), 1);
    }

    static filterActionRedirectCheck(input) {
      const value = input.$viewValue;
      input.$setValidity('filterActionRedirect', !!value && /^[A-Za-z0-9._\-\+]+@[A-Za-z0-9.\-_]+\.[A-Za-z]{2,}$/.test(value) && !/^\./.test(value));
    }

    filterNameCheck(input) {
      const value = input.$viewValue;
      input.$setValidity('filterName', !!value && /^[\w-._\s]+$/.test(value) && !_.find(this.filters, filter => value === filter));
    }

    static filterPriorityCheck(input) {
      const value = input.$viewValue;
      input.$setValidity('filterPriority', !!value && /^[0-9]+$/.test(value));
    }

    filterRuleCheck() {
      return _.every(this.model.rules, rule => rule.value && rule.operand && ((rule.headerSelect && rule.headerSelect !== 'other') || (rule.headerSelect === 'other' && rule.header)));
    }

    createFilter() {
      this.loading = true;
      const rules = _.map(_.filter(this.model.rules, rule => (rule.headerSelect !== '' || rule.header !== '') && rule.operand !== '' && rule.value !== ''), rule => ({
        operand: rule.operand,
        value: rule.value,
        header: rule.headerSelect === 'other' ? rule.header : rule.headerSelect,
      }));
      const rule = rules.shift();
      const filter = {
        name: this.model.filterName,
        priority: parseInt(this.model.filterPriority, 10),
        active: this.model.filterActive,
        action: this.model.filterAction,
        actionParam: this.model.filterActionParam ? this.model.filterActionParam : '',
        header: rule.header,
        operand: rule.operand,
        value: rule.value,
      };

      let filterPromise;
      if (_.get(this.$scope.currentActionData, 'delegate', false)) {
        filterPromise = this.Emails.createDelegatedFilter(this.account.email, filter, rules);
      } else {
        filterPromise = this.Emails.createFilter(this.$stateParams.productId, this.account.accountName, filter, rules);
      }

      return filterPromise
        .then(() => {
          this.Alerter.success(this.$scope.tr('email_tab_modal_create_filter_success'), this.$scope.alerts.main);
        })
        .catch((err) => {
          this.Alerter.alertFromSWS(this.$scope.tr('email_tab_modal_create_filter_error'), err, this.$scope.alerts.main);
        })
        .finally(() => {
          this.loading = false;
          this.$scope.resetAction();
        });
    }
  },
);
