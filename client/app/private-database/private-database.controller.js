angular.module('App').controller(
  'PrivateDatabaseCtrl',
  class PrivateDatabaseCtrl {
    constructor(
      $q,
      $rootScope,
      $scope,
      $stateParams,
      $timeout,
      $translate,
      Alerter,
      Hosting,
      PrivateDatabase,
      PrivateDatabaseExtension,
      User,
    ) {
      this.$q = $q;
      this.$rootScope = $rootScope;
      this.$scope = $scope;
      this.$stateParams = $stateParams;
      this.$timeout = $timeout;
      this.$translate = $translate;
      this.alerter = Alerter;
      this.hostingService = Hosting;
      this.privateDatabaseExtensionService = PrivateDatabaseExtension;
      this.privateDatabaseService = PrivateDatabase;
      this.userService = User;
    }

    $onInit() {
      this.productId = this.$stateParams.productId;
      this.isExpired = false;

      this.$scope.alerts = {
        page: 'privateDataBase.alerts.page',
        main: 'privateDataBase.alerts.main',
      };

      this.loaders = {
        details: true,
      };

      this.$scope.taskState = {
        lockAction: false,
        changeRootPassword: false,
        changeFtpPassword: false,
      };

      this.$scope.database = null;

      this.userService.getUrlOf('changeOwner').then((link) => {
        this.$scope.changeOwnerUrl = link;
      });

      _.forEach(['done', 'error'], (state) => {
        this.$scope.$on(
          `privateDatabase.global.actions.${state}`,
          (e, taskOpt) => {
            this.$scope.taskState.lockAction = taskOpt.lock
              ? false
              : this.$scope.taskState.lockAction;

            this.$scope.taskState.changeFtpPassword = false;
            this.$scope.taskState.changeRootPassword = false;
          },
        );
      });

      this.$scope.isDockerDatabase = () => this.$scope.database.infrastructure === 'docker';

      this.$scope.isLegacyDatabase = () => this.$scope.database.infrastructure === 'legacy';

      this.$scope.isConfigSet = () => this.privateDatabaseService
        .getConfigurationDetails(this.productId)
        .then(res => !_.isEmpty(res.details));

      this.$scope.isExtensionSet = () => this.privateDatabaseExtensionService
        .getExtensions(this.productId, this.$scope.database.databaseName)
        .then(res => !_.isEmpty(res));

      this.$scope.isDBaaS = () => this.$scope.database.offer === 'public';

      this.$scope.isRenew = () => this.$scope.database.serviceInfos.renew
        && (this.$scope.database.serviceInfos.renew.forced
          || this.$scope.database.serviceInfos.renew.automatic);

      this.$scope.addCron = (data) => {
        this.$scope.setAction('cron/add/private-database-cron-add', data);
      };

      this.$scope.resetAction = () => {
        this.$scope.setAction(false);
      };

      this.$scope.setAction = (action, data) => {
        this.$scope.currentAction = action;
        this.$scope.currentActionData = data;
        if (action) {
          this.$scope.stepPath = `private-database/${
            this.$scope.currentAction
          }.html`;
          $('#currentAction').modal({
            keyboard: true,
            backdrop: 'static',
          });
        } else {
          $('#currentAction').modal('hide');
          this.$scope.currentActionData = null;
          this.$timeout(() => {
            this.$scope.stepPath = '';
          }, 300);
        }
      };

      this.$scope.pollAction = (task) => {
        switch (task.function) {
          case 'changeVersion':
          case 'start':
          case 'stop':
          case 'restart':
            this.getDetails(true);
            this.runPoll(task, true);
            break;
          case 'refresh':
          case 'changeRootPassword':
          case 'changeFtpPassword':
            this.runPoll(task, false);
            break;
          default:
            break;
        }
      };

      this.$scope.$on('privateDatabase.global.actions.start', (e, taskOpt) => {
        this.$scope.taskState.lockAction = taskOpt.lock || this.$scope.taskState.lockAction;
      });

      this.$scope.$on(
        'privateDataBase.action.change.ftp.password.cancel',
        () => {
          this.$scope.taskState.changeFtpPassword = false;
        },
      );

      this.$scope.$on(
        'privateDataBase.action.change.root.password.cancel',
        () => {
          this.$scope.taskState.changeRootPassword = false;
        },
      );

      this.getDetails(true).then(() => {
        if (!this.isExpired) {
          this.getTasksToPoll();
        }
      });
    }

    $onDestroy() {
      this.privateDatabaseService.killPollAction();
    }

    getDetails(forceRefresh) {
      this.loaders.details = true;
      this.$scope.database = null;

      return this.privateDatabaseService
        .getSelected(this.productId, forceRefresh)
        .then((database) => {
          this.$scope.database = database;
          this.$scope.database.version = database.version.replace('.', '');
          this.isExpired = _.get(database, 'serviceInfos.status') === 'expired';
          this.$scope.guides = [];

          this.userService.getUrlOf('guides').then((guides) => {
            if (this.$scope.database && guides) {
              if (this.$scope.database.offer === 'classic') {
                if (guides.hostingPrivateDatabase) {
                  this.$scope.guides.push({
                    title: 'guide_add_hosting_private_database',
                    url: guides.hostingPrivateDatabase,
                  });
                }
              } else if (this.$scope.database.offer === 'public') {
                if (guides.hostingPrivateDatabaseDBaaS) {
                  this.$scope.guides = _.map(
                    guides.hostingPrivateDatabaseDBaaS,
                    (url, key) => {
                      let returnedObject;
                      if (!_.isEmpty(url)) {
                        returnedObject = {
                          title: `guide_add_hosting_private_database_dbaas_${key}`,
                          url,
                        };
                      }
                      return returnedObject;
                    },
                  );
                }
              }
            }
          });

          this.$scope.database.quotaPercent = {};
          if (database.quotaSize && +database.quotaSize.value) {
            this.$scope.database.quotaPercent = {
              value:
                (database.quotaUsed.value / database.quotaSize.value) * 100,
              unit: database.quotaSize.unit,
            };
          }

          if (!this.$scope.database.hostnameFtp) {
            this.$scope.database.hostnameFtp = this.$scope.database.infrastructure === 'legacy'
              ? 'sqlprive.ovh.net'
              : this.$scope.database.hostname.replace('.ha.', '.');
          }

          if (!this.$scope.database.portFtp) {
            this.$scope.database.portFtp = 21;
          }
        })
        .catch(() => {
          this.alerter.error('Not FOUND', null, this.$scope.alerts.page);
        })
        .finally(() => {
          this.loaders.details = false;
        });
    }

    editDisplayName() {
      this.newDisplayName.value = this.$scope.database.displayName
        || this.$scope.database.serviceName;
      this.editMode = true;
    }

    saveDisplayName() {
      const displayName = this.newDisplayName.value || this.$scope.database.serviceName;
      this.privateDatabaseService
        .updatePrivateDatabase(this.productId, {
          body: {
            displayName,
          },
        })
        .then(() => {
          this.$scope.database.displayName = displayName;
          this.$rootScope.$broadcast('change.displayName', [
            this.$scope.database.serviceName,
            displayName,
          ]);
        })
        .catch((err) => {
          _.set(err, 'type', err.type || 'ERROR');
          this.alerter.alertFromSWS(
            this.$translate.instant('privateDatabase_dashboard_loading_error'),
            err,
            this.$scope.alerts.page,
          );
        })
        .finally(() => {
          this.editMode = false;
        });
    }

    getTasksToPoll() {
      this.privateDatabaseService.getTasksToPoll(this.productId).then((tasks) => {
        _.forEach(tasks, this.$scope.pollAction);
      });
    }

    runPoll(task, lock) {
      this.$scope.taskState[task.function] = true;

      const opt = {
        taskId: task.id,
        namespace: 'privateDatabase.global.actions',
        lock,
      };
      this.privateDatabaseService
        .poll(this.productId, opt)
        .then(() => {
          this.$scope.taskState[task.function] = false;

          if (lock) {
            this.getDetails(true);
          }

          this.$rootScope.$broadcast(
            'privateDatabase.global.actions.done',
            opt,
          );
          this.alerter.success(
            this.$translate.instant(`privateDatabase_global_actions_success_${task.function}`),
            this.$scope.alerts.main,
          );
        })
        .catch(() => {
          this.$rootScope.$broadcast(
            'privateDatabase.global.actions.error',
            opt,
          );
          this.alerter.error(
            this.$translate.instant(`privateDatabase_global_actions_fail_${task.function}`),
            this.$scope.alerts.main,
          );
        });
    }
  },
);
