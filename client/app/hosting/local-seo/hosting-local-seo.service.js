angular
  .module('services')
  .service('HostingLocalSeo', class HostingDomain {
    constructor($rootScope, $q, Hosting, OvhHttp) {
      this.$rootScope = $rootScope;
      this.$q = $q;
      this.Hosting = Hosting;
      this.OvhHttp = OvhHttp;
    }

    getAccounts(serviceName) {
      return this.OvhHttp.get(`/hosting/web/${serviceName}/localSeo/account`, {
        rootPath: 'apiv6',
      });
    }

    getAccount(serviceName, accountId) {
      return this.OvhHttp.get(`/hosting/web/${serviceName}/localSeo/account/${accountId}`, {
        rootPath: 'apiv6',
      });
    }

    login(serviceName, accountId) {
      return this.OvhHttp.post(`/hosting/web/${serviceName}/localSeo/account/${accountId}/login`, {
        rootPath: 'apiv6',
      });
    }

    getLocations(serviceName) {
      return this.OvhHttp.get(`/hosting/web/${serviceName}/localSeo/location`, {
        rootPath: 'apiv6',
      });
    }

    getLocation(serviceName, locationId) {
      return this.OvhHttp.get(`/hosting/web/${serviceName}/localSeo/location/${locationId}`, {
        rootPath: 'apiv6',
      });
    }
  });
