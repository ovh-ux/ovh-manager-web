angular.module('App').controller(
  'DomainDynHostLoginCtrl',
  class DomainDynHostLoginCtrl {
    constructor($scope, Alerter, Domain) {
      this.$scope = $scope;
      this.Alerter = Alerter;
      this.Domain = Domain;
    }

    $onInit() {
      this.loading = {
        init: true,
        login: false,
      };
      this.hasResult = false;
      this.product = this.$scope.ctrlDomainDynHost.product;
      this.search = { login: '' };

      this.$scope.$on('hosting.tabs.dynHostsLogin.refresh', () => {
        this.loading.init = true;
        this.hasResult = false;
        this.refreshTableDynHostsLogin();
      });

      this.refreshTableDynHostsLogin();
    }

    //---------------------------------------------
    // Search
    //---------------------------------------------

    emptySearch() {
      this.search.login = '';
      this.refreshTableDynHostsLogin();
    }

    //---------------------------------------------
    // DynHostLogins
    //---------------------------------------------
    refreshTableDynHostsLogin() {
      this.loading.login = true;
      this.dynHostsLogin = null;
      const login = this.search.login ? punycode.toASCII(this.search.login) : null;

      return this.Domain
        .getDynHostLogin(this.product.name, login)
        .then((data) => {
          this.dynHostsLogin = data;
          if (this.dynHostsLogin.length > 0) {
            this.hasResult = true;
          }
        })
        .catch(err => this.Alerter.alertFromSWS(this.$scope.tr('domain_tab_DYNHOSTLOGIN_table_empty'), err.data || err, this.$scope.alerts.main))
        .finally(() => {
          this.loading.init = false;
          if (_.isEmpty(this.dynHostsLogin)) {
            this.loading.login = false;
          }
        });
    }

    transformItem(item) {
      return this.Domain.getDynHostLoginDetails(this.product.name, item).then(this.constructor.subDomainToPunycode, err => err);
    }

    onTransformItemDone() {
      this.loading.login = false;
    }

    static subDomainToPunycode(item) {
      _.set(item, 'subDomain', punycode.toUnicode(item.subDomain));
      return item;
    }
  },
);
