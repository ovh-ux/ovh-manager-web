angular.module('services').service('HostingCron', function hostingCron($q, OvhHttp, Hosting) {
  /*
     * Get crons
     */
  this.getCrons = (serviceName, filters) => {
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
  this.getCron = (serviceName, id) => OvhHttp.get(['/hosting/web/{serviceName}/cron', id].join('/'), {
    rootPath: 'apiv6',
    urlParams: {
      serviceName,
    },
  });

  /*
     * Create a new cron
     */
  this.createCron = (serviceName, model) => OvhHttp.post('/hosting/web/{serviceName}/cron', {
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

  /*
     * Delete a cron
     */
  this.deleteCron = (serviceName, cronId) => OvhHttp.delete(['/hosting/web/{serviceName}/cron', cronId].join('/'), {
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

  /*
     * Edit a cron
     */
  this.editCron = (serviceName, cronId, model) => OvhHttp.put(['/hosting/web/{serviceName}/cron', cronId].join('/'), {
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

  this.trEnum = (str) => {
    if (!str) {
      return '';
    }

    return str.replace(/\./g, '_');
  };

  this.getAvailableLanguage = serviceName => OvhHttp.get('/hosting/web/{serviceName}/cronAvailableLanguage', {
    rootPath: 'apiv6',
    urlParams: {
      serviceName,
    },
  });
});
