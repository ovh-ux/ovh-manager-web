angular.module('App').controller(
  'HostingTabLocalSeoCtrl',
  class HostingTabLocalSeoCtrl {
    constructor($q, $stateParams, $window, HostingLocalSeo) {
      this.$q = $q;
      this.$stateParams = $stateParams;
      this.$window = $window;
      this.HostingLocalSeo = HostingLocalSeo;
    }

    $onInit() {
      this.datagridId = 'localSeoDatagrid';
      this.loading = {
        locations: false,
      };
      this.productId = this.$stateParams.productId;
      this.accounts = null;

      this.HostingLocalSeo.getVisibilityCheckerURL().then((url) => {
        this.visibilityCheckerURL = url;
      });
    }

    refresh() {
      return this.loadAccounts().then(() => this.loadLocations());
    }

    loadAccounts() {
      return this.getAccounts()
        .then((accounts) => {
          this.accounts = accounts;
        });
    }

    getAccounts() {
      return this.HostingLocalSeo.getAccounts(this.productId)
        .then(accounts => this.$q.all(
          _.map(accounts, account => this.HostingLocalSeo.getAccount(this.productId, account)),
        ));
    }

    loadLocations() {
      this.loading.locations = true;
      return this.$q.when().then(() => {
        if (!_.isEmpty(this.accounts)) {
          return this.getLocations();
        }
        return { data: [], meta: { totalCount: 0 } };
      }).finally(() => {
        this.loading.locations = false;
      });
    }

    getLocations() {
      return this.HostingLocalSeo.getLocations(this.productId)
        .then(locationIds => ({
          data: _.map(locationIds, id => ({ id })),
          meta: {
            totalCount: locationIds.length,
          },
        }));
    }

    hasAccounts() {
      return !_.isEmpty(this.accounts);
    }

    hasLocations() {
      return !_.isEmpty(this.locations);
    }

    transformItem(row) {
      this.loading.locations = true;
      return this.HostingLocalSeo.getLocation(this.productId, row.id)
        .then((result) => {
          const location = angular.copy(result);
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

    goToInterface(location) {
      if (!location.accountId) {
        return;
      }

      /*
        Opening the window first then setting the location prevents browsers
        from blocking it as a popup.
      */
      const win = this.$window.open('', '_blank');
      this.HostingLocalSeo.login(this.productId, location.accountId)
        .then((token) => {
          win.location = `https://localseo.ovh.net/?access_token=${token}`;
        });
    }
  },
);
