angular.module('services').service('Polling', [
  '$http',
  '$q',
  '$timeout',
  function pollingService($http, $q, $timeout) {
    let to = true;
    let tofast = true;
    let watchedTasksPromise = [];
    const resolveState = 'resolve';
    const notifyState = 'notify';
    const notifyExist = 'alreadyExist';
    const defaultElapse = 15000;
    let elapse = defaultElapse;
    let isRun = false;
    let watchedTasks = [];
    let killedScope = [];
    const defaultElapseFast = 5000;
    let elapsefast = defaultElapseFast;
    let isFastRun = false;
    let watchedTasksFast = [];
    let killedScopeFast = [];

    this.setElapse = (newElapse) => {
      elapse = newElapse;
    };

    function idtask(taskId) {
      return `t${taskId}`;
    }

    function taskHandling(task, watchedTasksList) {
      const taskId = task.data.id;

      switch (task.data.status.toUpperCase()) {
        case 'DOING':
        case 'INIT':
        case 'TODO':
        case 'PAUSED':
        case 'WAITINGACK':
          angular.forEach(watchedTasksPromise[idtask(taskId)], (value) => {
            value.pollPromise.resolve({
              state: notifyState,
              task: task.data,
            });
          });
          break;

        case 'CANCELLED':
        case 'DONE':
          angular.forEach(watchedTasksPromise[idtask(taskId)], (value) => {
            value.pollPromise.resolve({
              state: resolveState,
              task: task.data,
            });
          });
          break;

        case 'CUSTOMER_ERROR':
        case 'OVH_ERROR':
        case 'ERROR':
        case 'BLOCKED':
          angular.forEach(watchedTasksPromise[idtask(taskId)], (value) => {
            value.pollPromise.reject({
              type: 'ERROR',
              message: task.data.comment,
              task: task.data,
            });
          });
          break;

        default:
          angular.forEach(watchedTasksPromise[idtask(taskId)], (value) => {
            value.pollPromise.resolve({
              state: notifyState,
              task: task.data,
            });
          });
          break;
      }

      delete watchedTasksPromise[idtask(taskId)];
      delete watchedTasksList[idtask(taskId)]; // eslint-disable-line no-param-reassign
    }

    // Because if q.all reject, it don't sent fail task id
    function cleanFailTask(eachTask, watchedTasksList) {
      const idTask = idtask(watchedTasksList[eachTask].task.id);

      $http.get(watchedTasksList[eachTask].url).then(
        (task) => {
          taskHandling(task, watchedTasksList);
        },
        (error) => {
          angular.forEach(watchedTasksPromise[idTask], (value) => {
            value.pollPromise.reject(error.data);
          });
          delete watchedTasksPromise[idTask];
          delete watchedTasksList[idTask]; // eslint-disable-line no-param-reassign
        },
      );
    }

    function clean() {
      elapse = defaultElapse;
      watchedTasks = [];
      killedScope = [];
    }

    function cleanFast() {
      elapsefast = defaultElapseFast;
      watchedTasksFast = [];
      killedScopeFast = [];
    }

    function stop() {
      to = $timeout.cancel(to);
      isRun = false;
      clean();
    }

    function stopfast() {
      tofast = $timeout.cancel(tofast);
      isFastRun = false;
      cleanFast();
    }

    function stopPoll(fast) {
      if (fast) {
        stopfast();
      } else {
        stop();
      }
    }

    function poll(fast) {
      const resultsTasks = [];
      let watchedTasksList = [];
      let killedScopeList = [];
      let hasElements = false;

      if (fast) {
        watchedTasksList = watchedTasksFast;
        killedScopeList = killedScopeFast;
      } else {
        watchedTasksList = watchedTasks;
        killedScopeList = killedScope;
      }

      watchedTasksList.forEach((eachTask) => {
        // Delete polling of dead scope
        if (killedScopeList[watchedTasksList[eachTask].scopeId]) {
          // Delete promise of dead scope
          watchedTasksPromise[eachTask].forEach((eachPromise) => {
            if (
              killedScopeList[
                watchedTasksPromise[eachTask][eachPromise].scopeId
              ]
            ) {
              delete watchedTasksPromise[eachTask][eachPromise];
            }
          });

          // Delete taskid of dead scope if promise = 0
          if (
            !watchedTasksPromise[eachTask]
            || _.isEmpty(watchedTasksPromise[eachTask])
          ) {
            delete watchedTasksPromise[eachTask];
            delete watchedTasksList[eachTask];
          } else {
            resultsTasks.push($http.get(watchedTasksList[eachTask].url));
            hasElements = true;
          }
        } else {
          resultsTasks.push($http.get(watchedTasksList[eachTask].url));
          hasElements = true;
        }
      });

      killedScopeList = [];

      // STOP if no elements
      if (!hasElements) {
        stopPoll(fast);
      } else {
        $q.all(resultsTasks)
          .then((tasks) => {
            angular.forEach(tasks, (task) => {
              taskHandling(task, watchedTasksList);
            });
          })
          .catch(() => {
            watchedTasksList.forEach((eachTask2) => {
              cleanFailTask(eachTask2, watchedTasksList);
            });
          })
          .finally(() => {
            run(fast); // eslint-disable-line no-use-before-define
          });
      }
    }

    function run(fast) {
      if (fast) {
        if (!isFastRun) {
          isFastRun = true;
          poll(true);
        } else {
          tofast = $timeout(() => {
            poll(true);
          }, elapsefast);
        }
      } else if (!isRun) {
        isRun = true;
        poll(false);
      } else {
        to = $timeout(() => {
          poll(false);
        }, elapse);
      }
    }

    this.setElapseFast = (newElapse) => {
      elapsefast = newElapse;
    };

    /*
            poll after 5 sec
            taskUrl : url to get task status
            task : task object (java model)
            scopeId : the scope calling polling
            cancelIfExist : no watch if task id is already in poll
        */
    this.addTaskFast = (taskUrl, task, scopeId, cancelIfExist) => {
      const deferPromise = $q.defer();
      if (cancelIfExist && watchedTasksPromise[idtask(task.id)]) {
        deferPromise.resolve({ state: notifyExist });
      } else {
        if (!watchedTasksPromise[idtask(task.id)]) {
          watchedTasksPromise[idtask(task.id)] = [];
        }
        watchedTasksPromise[idtask(task.id)].push({
          pollPromise: deferPromise,
          scopeId,
        });
        watchedTasksFast[idtask(task.id)] = {
          url: taskUrl,
          task,
          scopeId,
        };
        if (!isFastRun) {
          run(true);
        }
      }
      return deferPromise.promise;
    };

    /*
            poll after 15 sec
            taskUrl : url to get task status
            task : task object (java model)
            scopeId : the scope calling polling
            cancelIfExist : no watch if task id is already in poll
        */
    this.addTask = (taskUrl, task, scopeId, cancelIfExist) => {
      const deferPromise = $q.defer();
      if (cancelIfExist && watchedTasksPromise[idtask(task.id)]) {
        deferPromise.resolve({ state: notifyExist });
      } else {
        if (!watchedTasksPromise[idtask(task.id)]) {
          watchedTasksPromise[idtask(task.id)] = [];
        }
        watchedTasksPromise[idtask(task.id)].push({
          pollPromise: deferPromise,
          scopeId,
        });
        watchedTasks[idtask(task.id)] = {
          url: taskUrl,
          task,
          scopeId,
        };
        if (!isRun) {
          run(false);
        }
      }
      return deferPromise.promise;
    };

    /*
            kill all tasks poll from scope id parameter
        */
    this.addKilledScope = (scopeId) => {
      if (scopeId) {
        killedScope[scopeId] = true;
        killedScopeFast[scopeId] = true;
      } else {
        stopfast();
        stop();
        watchedTasksPromise = [];
      }
    };

    /* test state of polling return */
    this.isResolve = state => state.state === resolveState;

    this.isNotify = state => state.state === notifyState;

    this.isAlreadyExist = state => state.state === notifyExist;

    this.isDone = state => state.task && state.task.status.toUpperCase() === 'DONE';
  },
]);
