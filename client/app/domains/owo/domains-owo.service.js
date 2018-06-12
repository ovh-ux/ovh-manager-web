angular.module('services').service(
  'DomainsOwo',
  class DomainsOwo {
    /**
     * Constructor
     * @param OvhHttp
     * @param JavaEnum
     */
    constructor(OvhHttp, JavaEnum) {
      this.OvhHttp = OvhHttp;
      this.JavaEnum = JavaEnum;
    }

    /**
     * Get the owo fields
     */
    getOwoFields() {
      return this.OvhHttp.get('/domain.json', {
        rootPath: 'apiv6',
        cache: 'models.domain',
      }).then((models) => {
        const owoEnum = models.models['domain.WhoisObfuscatorFieldsEnum'].enum;
        return owoEnum.map(owo => this.JavaEnum.tr(owo));
      });
    }

    /**
     *
     * @param {string} serviceName
     * @param {string|null} field
     */
    getOwoFieldsSelection(serviceName, field) {
      return this.OvhHttp.get(`/domain/${serviceName}/owo`, {
        rootPath: 'apiv6',
        params: {
          field,
        },
      }).then(fields => fields);
    }

    /**
     * Update the owo fields
     * @param activated
     * @param desactivated
     * @param domains : array of domains names to apply the modification
     */
    updateOwoFields(activated, desactivated, domains) {
      return this.OvhHttp.put('/sws/domains/owo', {
        rootPath: '2api',
        data: {
          domains,
          activated,
          desactivated,
        },
        broadcast: 'domains.list.refresh',
      });
    }
  },
);
