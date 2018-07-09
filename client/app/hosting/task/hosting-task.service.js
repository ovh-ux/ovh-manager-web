angular.module('services').service('HostingTask', function (OvhHttp, $q, $timeout, $log) {
  const self = this;
  const deferred = {};
  const ticOfPoll = 1000;
  const usedTaskFunction = ['ovhConfig/rollback', 'ovhConfig/update', 'ovhConfig/refresh'];
  const usedTaskStatusForPending = ['doing', 'init', 'todo'];
  const usedTaskStatusForError = ['error'];
  let isPolling = false;

  function resolve(id, task) {
    deferred[id].resolve(task);
    delete deferred[id];
  }

  function reject(id, err) {
    deferred[id].reject(err);
    delete deferred[id];
  }

  function notify(id, task) {
    deferred[id].notify(task);
  }

  function resolveOrNot(id, task, err) {
    if (!id) {
      $log.error('Unable to treat a task, missing id.');
      return reject(id, task);
    }

    if (!deferred[id]) {
      $log.error(`The task id ${id} is not managed.`);
      return reject(id, task);
    }

    if (task) {
      if (task.status === 'done') {
        return resolve(id, task);
      }

      if (task.status === 'cancelled' || task.status === 'error') {
        return reject(id, task);
      }
    }

    if (err) {
      if (err.status === 404) {
        return resolve(id, null);
      }

      return reject(id, err);
    }

    return notify(id, task);
  }

  function pollDeferred(serviceName) {
    const setToPoll = [];
    angular.forEach(deferred, (defer, id) => {
      if (defer) {
        setToPoll.push(self.getFromId(serviceName, id).then(
          (task) => {
            resolveOrNot(id, task);
          },
          (err) => {
            resolveOrNot(id, null, err);
          },
        ));
      }
    });

    if (setToPoll.length > 0) {
      $q.all(setToPoll).finally(() => {
        isPolling = $timeout(() => {
          pollDeferred(serviceName);
        }, ticOfPoll);
      });
    } else {
      isPolling = false;
    }
  }

  function startPollDeferred(serviceName) {
    if (isPolling) {
      return;
    }

    pollDeferred(serviceName);
  }

  this.getFromId = function (serviceName, id) {
    return OvhHttp.get('/hosting/web/{serviceName}/tasks/{id}', {
      rootPath: 'apiv6',
      urlParams: {
        serviceName,
        id,
      },
      returnSuccessKey: '',
    }).then(
      response => response.data,
      (err) => {
        const data = err.data;
        data.status = err.status;
        return $q.reject(data);
      },
    );
  };

  function getFromFunctionAndStatus(serviceName, fncName, fncStatus) {
    return OvhHttp.get('/hosting/web/{serviceName}/tasks/', {
      rootPath: 'apiv6',
      urlParams: {
        serviceName,
      },
      params: {
        function: fncName,
        status: fncStatus,
      },
    });
  }

  function getTasksInState(serviceName, inError) {
    const queue = [];
    let usedTaskStatus;

    if (inError) {
      usedTaskStatus = usedTaskStatusForError;
    } else {
      usedTaskStatus = usedTaskStatusForPending;
    }

    angular.forEach(usedTaskFunction, (fncName) => {
      angular.forEach(usedTaskStatus, (fncStatus) => {
        queue.push(getFromFunctionAndStatus(serviceName, fncName, fncStatus));
      });
    });

    return $q.all(queue).then((results) => {
      const ids = _.flatten(results);
      return $q.all(_.map(ids, id => self.getFromId(serviceName, id)));
    });
  }

  this.getPending = function (serviceName) {
    return getTasksInState(serviceName, false);
  };

  this.getError = function (serviceName) {
    return getTasksInState(serviceName, true);
  };

  this.poll = function (serviceName, task) {
    if (!task || !task.id) {
      return $q.reject('missing a hostingTask data');
    }

    if (!deferred[task.id]) {
      deferred[task.id] = $q.defer();
    }

    startPollDeferred(serviceName);

    return deferred[task.id].promise;
  };
});
