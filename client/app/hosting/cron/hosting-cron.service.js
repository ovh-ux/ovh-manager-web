angular.module('services').service('HostingCron', function ($q, OvhHttp, Hosting) {
  /*
     * Get crons
     */
  this.getCrons = function (serviceName, filters) {
    const promises = [];

    if (angular.isArray(filters)) {
      filters.forEach((filter) => {
        promises.push(OvhHttp.get(['/hosting/web/{serviceName}/cron'].join('/'), {
          rootPath: 'apiv6',
          urlParams: {
            serviceName,
          },
          params: filter,
        }));
      });
    } else {
      promises.push(OvhHttp.get(['/hosting/web/{serviceName}/cron'].join('/'), {
        rootPath: 'apiv6',
        urlParams: {
          serviceName,
        },
      }));
    }

    return $q.allSettled(promises).then(
      (data) => {
        let result = [];
        data.forEach((res) => {
          result = result.concat(res);
        });
        return _.uniq(result);
      },
      err => $q.reject(err),
    );
  };

  /*
     * Get cron
     */
  this.getCron = function (serviceName, id) {
    return OvhHttp.get(['/hosting/web/{serviceName}/cron', id].join('/'), {
      rootPath: 'apiv6',
      urlParams: {
        serviceName,
      },
    });
  };

  /*
     * Create a new cron
     */
  this.createCron = function (serviceName, model) {
    return OvhHttp.post('/hosting/web/{serviceName}/cron', {
      rootPath: 'apiv6',
      urlParams: {
        serviceName,
      },
      data: {
        command: model.command,
        description: model.description || undefined,
        email: model.email || undefined,
        frequency: model.frequency,
        language: model.language,
        status: model.status,
      },
    }).then(
      (data) => {
        Hosting.resetCrons();
        return data;
      },
      http => $q.reject(http),
    );
  };

  /*
     * Delete a cron
     */
  this.deleteCron = function (serviceName, cronId) {
    return OvhHttp.delete(['/hosting/web/{serviceName}/cron', cronId].join('/'), {
      rootPath: 'apiv6',
      urlParams: {
        serviceName,
      },
    }).then(
      (data) => {
        Hosting.resetCrons();
        return data;
      },
      http => $q.reject(http),
    );
  };

  /*
     * Edit a cron
     */
  this.editCron = function (serviceName, cronId, model) {
    return OvhHttp.put(['/hosting/web/{serviceName}/cron', cronId].join('/'), {
      rootPath: 'apiv6',
      urlParams: {
        serviceName,
      },
      data: {
        command: model.command,
        description: model.description || undefined,
        email: model.email || undefined,
        frequency: model.frequency,
        language: model.language,
        status: model.status,
      },
    }).then((data) => {
      Hosting.resetCrons();
      return data;
    });
  };

  this.trEnum = function (str) {
    if (!str) {
      return '';
    }

    return str.replace(/\./g, '_');
  };

  this.getAvailableLanguage = function (serviceName) {
    return OvhHttp.get('/hosting/web/{serviceName}/cronAvailableLanguage', {
      rootPath: 'apiv6',
      urlParams: {
        serviceName,
      },
    });
  };
});
