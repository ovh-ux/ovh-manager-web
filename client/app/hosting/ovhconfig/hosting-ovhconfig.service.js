function OvhConfig(data) {
  this._setData(data);
}

Object.defineProperties(OvhConfig.prototype, {
  _patterns: {
    writable: false,
    configurable: false,
    value: {
      phpEngine: /php/i,
    },
  },
  _setData: {
    writable: false,
    configurable: false,
    value(data) {
      let keys;

      if (_.isObject(data)) {
        keys = Object.keys(data);

        for (let i = 0, imax = keys.length; i < imax; i++) {
          this[keys[i]] = data[keys[i]];
        }
      }
    },
  },
  isPhpEngine: {
    configurable: false,
    set() {
      throw new Error('OvhConfig.isPhpEngine is a read only property');
    },
    get() {
      return this.engineName && this._patterns.phpEngine.test(this.engineName);
    },
  },
  label: {
    configurable: false,
    set() {
      throw new Error('OvhConfig.label is a read only property');
    },
    get() {
      let label = '';

      if (this.creationDate) {
        this.creationDateHr = moment(this.creationDate).format('ll');
      }

      angular.forEach(['engineName', 'engineVersion', 'environment', 'creationDateHr'], function (key) {
        if (this[key]) {
          if (label.length > 0) {
            label += ' ';
          }

          label += this[key];
        }
      }, this);

      return label;
    },
  },
});

angular
  .module('services')
  .service('HostingOvhConfig', class HostingOvhConfig {
    constructor($q, OvhHttp) {
      this.$q = $q;
      this.OvhHttp = OvhHttp;

      this.cache = 'UNIVERS_WEB_HOSTING_OVHCONFIG';
      this.events = {
        ovhConfigNeedRefresh: 'hosting.ovhConfig.needRefresh',
      };
    }

    /**
         * Sync the api with the host, in case of manual modification (ftp, ...)
         * @param {string} serviceName
         */
    ovhConfigRefresh(serviceName) {
      return this.OvhHttp.post(`/hosting/web/${serviceName}/ovhConfigRefresh`, {
        rootPath: 'apiv6',
        clearAllCache: this.cache,
      });
    }

    /**
         * Get config Ids
         * @param {string} serviceName
         * @param {boolean} getHistory
         * @param {string} path
         */
    getIds(serviceName, getHistory, path = '') {
      return this.OvhHttp.get(`/hosting/web/${serviceName}/ovhConfig`, {
        rootPath: 'apiv6',
        params: {
          historical: getHistory ? true : getHistory === false ? false : undefined,
          path,
        },
      });
    }

    /**
         * Get config by Id
         * @param {string} serviceName
         * @param {string} id
         */
    getFromId(serviceName, id) {
      return this.OvhHttp.get(`/hosting/web/${serviceName}/ovhConfig/${id}`, {
        rootPath: 'apiv6',
        cache: this.cache,
      }).then(data => new OvhConfig(data));
    }

    /**
         *
         * @param {string} serviceName
         * @param {array} ids
         * @returns {Promise}
         */
    getDatasFromIds(serviceName, ids) {
      const queue = _.map(ids, id => this.getFromId(serviceName, id));
      return this.$q.all(queue);
    }

    /**
         * Get current config
         * @param {string} serviceName
         */
    getCurrent(serviceName) {
      return this
        .getIds(serviceName, false)
        .then(ids => this.getFromId(serviceName, ids.pop()));
    }

    /**
         *
         * @param {string} serviceName
         */
    getAll(serviceName) {
      return this
        .getIds(serviceName, false)
        .then(ids => this.getDatasFromIds(serviceName, ids));
    }

    /**
         *
         * @param {string} serviceName
         */
    getHistoric(serviceName) {
      return this
        .getIds(serviceName, true)
        .then(ids => this.getDatasFromIds(serviceName, ids));
    }

    /**
         * Change configuration
         * @param {string} serviceName
         * @param {object} data
         */
    changeConfiguration(serviceName, data) {
      const id = data.id;
      delete data.id;

      return this.OvhHttp.post(`/hosting/web/${serviceName}/ovhConfig/${id}/changeConfiguration`, {
        rootPath: 'apiv6',
        clearAllCache: this.cache,
        data,
      });
    }

    /**
         * Rollback to previous config
         * @param {string} serviceName
         * @param {string} id
         * @param {string} idToRollback
         */
    rollbackConfig(serviceName, id, idToRollback) {
      return this.OvhHttp.post(`/hosting/web/${serviceName}/ovhConfig/${id}/rollback`, {
        rootPath: 'apiv6',
        clearAllCache: this.cache,
        data: {
          rollbackId: idToRollback,
        },
      });
    }
  });
