angular.module('services').service(
  'EmailDomain',
  class EmailDomain {
    /**
     * Constructor
     * @param OvhApiEmailDomain
     */
    constructor(
      OvhApiEmailDomain,
    ) {
      this.OvhApiEmailDomain = OvhApiEmailDomain;
    }

    /**
     * Get email domain service infos
     * @param {string} serviceName
     */
    getServiceInfo(serviceName) {
      return this.OvhApiEmailDomain.v6().serviceInfos({ serviceName }).$promise;
    }
  },
);
