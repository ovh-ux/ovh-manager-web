angular.module('services').service(
  'EmailDomain',
  class EmailDomain {
    /* @ngInject */
    constructor(
      OvhApiEmailDomain,
    ) {
      this.OvhApiEmailDomain = OvhApiEmailDomain;
    }

    getServiceInfo(serviceName) {
      return this.OvhApiEmailDomain.v6().serviceInfos({ serviceName }).$promise;
    }
  },
);
