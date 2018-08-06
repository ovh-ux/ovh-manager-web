angular.module('App').controller(
  'HostingTabLocalSeoCtrl',
  class HostingTabLocalSeoCtrl {
    constructor($scope, $stateParams, $q, $window, HostingLocalSeo) {
      this.$scope = $scope;
      this.$stateParams = $stateParams;
      this.$q = $q;
      this.$window = $window;
      this.HostingLocalSeo = HostingLocalSeo;
    }

    $onInit() {
      this.loading = {
        accounts: true,
        locations: false,
      };
      this.productId = this.$stateParams.productId;

      this.accounts = null;
      this.locations = null;
      this.locationDetails = null;

      this.loadAccountsAndLocations();
    }

    loadAccountsAndLocations() {
      this.loading.accounts = true;
      return this.getAccounts()
        .then((accounts) => {
          this.accounts = accounts;
          if (!_.isEmpty(accounts)) {
            return this.getLocations().then((locations) => {
              this.locations = locations;
            });
          }
        })
        .finally(() => {
          this.loading.accounts = false;
        });
    }

    getAccounts() {
      return this.HostingLocalSeo.getAccounts(this.productId)
        .then(accounts => this.$q.all(_.map(accounts, account => this.HostingLocalSeo.getAccount(this.productId, account))));
    }

    getLocations() {
      return this.HostingLocalSeo.getLocations(this.productId);
    }

    hasAccounts() {
      return !_.isEmpty(this.accounts);
    }

    hasLocations() {
      return !_.isEmpty(this.locations);
    }

    transformItem(locationId) {
      this.loading.locations = true;
      return this.HostingLocalSeo.getLocation(this.productId, locationId)
        .then((location) => {
          const accountId = _.get(location, 'accountId');
          if (accountId) {
            const account = _.find(this.accounts, { id: accountId });
            if (account) {
              location.account = account;
            }
          }
          return location;
        });
    }

    transformItemDone(locations) {
      this.loading.locations = false;
    }

    refreshLocations() {
      this.loadAccountsAndLocations();
    }

    goToInterface(location) {
      if (!location.accountId) {
        return;
      }

      this.HostingLocalSeo.login(this.productId, location.accountId)
        .then((token) => {
          this.$window.open(`https://localseo.ovh.net/?access_token=${token}`, '_blank');
        });
    }
  },
);
