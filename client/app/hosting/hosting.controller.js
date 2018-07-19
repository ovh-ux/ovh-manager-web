angular
  .module('App')
  .controller(
    'HostingCtrl',
    (
      $scope,
      $rootScope,
      $q,
      $timeout,
      ConverterService,
      Hosting,
      Screenshot,
      Alerter,
      Navigator,
      constants,
      User,
      HostingOvhConfig,
      HostingTask,
      HostingDatabase,
      HostingDomain,
      PrivateDatabase,
      $stateParams,
    ) => {
      $scope.loadingHostingInformations = true;
      $scope.loadingHostingError = false;
      $scope.loadingScreenshot = true;
      $scope.urls = {
        hosting: '',
      };
      $scope.edit = {
        active: false,
      };
      $scope.screenshot = null;

      $scope.stepPath = '';
      $scope.currentAction = null;
      $scope.currentActionData = null;
      $scope.newDisplayName = {
        value: '',
      };
      $scope.displayMore = {
        value: false,
      };

      $scope.alerts = {
        page: 'app.alerts.page',
        tabs: 'app.alerts.tabs',
        main: 'app.alerts.main',
      };

      $scope.urlDomainOrder = null;

      $scope.ovhConfig = null;

      $scope.$on(Hosting.events.dashboardRefresh, () => {
        $scope.loadHosting();
      });

      $scope.convertBytesSize = (nb, unit, decimalWanted = 0) => {
        const res = filesize(ConverterService.convertToOctet(nb, unit), {
          output: 'object',
          round: decimalWanted,
          base: -1,
        });
        const resUnit = $scope.tr(`unit_size_${res.symbol}`);

        return `${res.value} ${resUnit}`;
      };

      User.getUrlOf('changeOwner').then((link) => {
        $scope.changeOwnerUrl = link;
      });

      Hosting.getUserLogsToken($stateParams.productId, {
        params: {
          remoteCheck: true,
          ttl: 3600,
        },
      }).then((token) => {
        $scope.userLogsToken = token;
      });

      function loadOvhConfig() {
        HostingOvhConfig.getCurrent($stateParams.productId).then((ovhConfig) => {
          $scope.ovhConfig = _.merge(ovhConfig, {
            taskPending: _.get($scope.ovhConfig, 'taskPending', false),
            taskPendingError: _.get($scope.ovhConfig, 'taskPendingError', false),
          });
          $scope.phpVersionSupport = _.find(
            $scope.hosting.phpVersions,
            (version) => {
              if (version.version.indexOf('.') === -1) {
                version.version = `${version.version}.0`; // eslint-disable-line no-param-reassign
              }

              return version.version === $scope.ovhConfig.engineVersion;
            },
          );

          HostingTask.getPending($stateParams.productId)
            .then((tasks) => {
              let queue;
              if (tasks && tasks.length > 0) {
                const taskPendingMessage = $scope.i18n[
                  `hosting_global_php_version_pending_task_${tasks[0].function.replace(
                    /ovhConfig\//,
                    '',
                  )}`
                ];
                _.set(
                  $scope.ovhConfig,
                  'taskPending',
                  taskPendingMessage
                    || $scope.i18n.hosting_global_php_version_pending_task_common,
                );

                queue = _.map(
                  tasks,
                  task => HostingTask
                    .poll($stateParams.productId, task)
                    .catch(() => {
                      _.set($scope.ovhConfig, 'taskPendingError', false);
                    }),
                );

                $q.all(queue).then(() => {
                  loadOvhConfig();
                });
              } else {
                _.set($scope.ovhConfig, 'taskPending', false);
              }
            })
            .catch(() => {
              _.set($scope.ovhConfig, 'taskPending', false);
            });

          HostingTask.getError($stateParams.productId)
            .then((tasks) => {
              if ($scope.ovhConfig) {
                if (tasks && tasks.length > 0) {
                  const taskErrorMessage = $scope.i18n[
                    `hosting_global_php_version_pending_task_error_${tasks[0].function.replace(
                      /ovhConfig\//,
                      '',
                    )}`
                  ];
                  _.set(
                    $scope.ovhConfig,
                    'taskPendingError',
                    taskErrorMessage
                      || $scope.i18n
                        .hosting_global_php_version_pending_task_error_common,
                  );
                } else {
                  _.set($scope.ovhConfig, 'taskPendingError', false);
                }
              }
            })
            .catch(() => {
              _.set($scope.ovhConfig, 'taskPendingError', false);
            });
        });
      }

      $scope.$on(HostingOvhConfig.events.ovhConfigNeedRefresh, () => {
        loadOvhConfig();
      });

      $scope.goToPrivateDb = (privateDb) => {
        $rootScope.$broadcast('leftNavigation.selectProduct.fromName', {
          name: privateDb,
          type: 'PRIVATE_DATABASE',
        });
        Navigator.navigate(`configuration/private_database/${privateDb}`);
      };

      $scope.userInfos = {};

      $scope.getUserInfos = () => User.getUser()
        .then((user) => {
          $scope.userInfos = user;
        })
        .catch(err => $q.reject(err));

      $scope.isAdminPrivateDb = privateDb => $scope
        .getUserInfos()
        .then(() => PrivateDatabase.getServiceInfos(privateDb))
        .then(privateDbInfo => _.some(
          [
            privateDbInfo.contactBilling,
            privateDbInfo.contactTech,
            privateDbInfo.contactAdmin,
          ],
          contactName => $scope.userInfos.nichandle === contactName,
        ))
        .catch((err) => {
          Alerter.alertFromSWS(
            $scope.tr('common_serviceinfos_error', [privateDb]),
            err,
            $scope.alerts.main,
          );
          return false;
        });

      // FLUSH CDN
      function checkFlushCdnState() {
        $scope.flushCdnState = 'check';
        Hosting.checkTaskUnique($stateParams.productId, 'web/flushCache').then((taskIds) => {
          if (taskIds && taskIds.length) {
            $scope.flushCdnState = 'doing';
            $rootScope.$broadcast(Hosting.events.tasksChanged);
            Hosting.pollFlushCdn($stateParams.productId, taskIds).then(() => {
              $rootScope.$broadcast(Hosting.events.tasksChanged);
              $scope.flushCdnState = 'ok';
              Alerter.success(
                $scope.tr('hosting_dashboard_cdn_flush_done_success'),
                $scope.alerts.main,
              );
            });
          } else {
            $scope.flushCdnState = 'ok';
          }
        });
      }

      function checkSqlPriveState() {
        $scope.sqlPriveState = 'check';
        Hosting.checkTaskUnique(
          $stateParams.productId,
          'hosting/activate/privateDatabase',
        ).then((taskIds) => {
          if (taskIds && taskIds.length) {
            $scope.sqlPriveState = 'doing';
            Hosting.pollSqlPrive($stateParams.productId, taskIds).then(() => {
              $scope.sqlPriveState = 'ok';
              Alerter.success($scope.tr('hosting_dashboard_database_active_success_done'));
            });
          } else {
            $scope.sqlPriveState = 'ok';
          }
        });
      }

      $scope.loadHosting = () => {
        Hosting.getSelected($stateParams.productId, true)
          .then(
            (hosting) => {
              $scope.hosting = hosting;
              $scope.hosting.displayName = hosting.displayName || hosting.serviceDisplayName;

              $scope.isAdminPvtDb = false;

              Hosting.getServiceInfos($stateParams.productId)
                .then((serviceInfos) => {
                  $scope.hosting.serviceInfos = serviceInfos;
                })
                .catch((err) => {
                  $scope.hosting.serviceInfos = {};
                  Alerter.error(err);
                });

              Hosting.getHosting($stateParams.productId)
                .then((hostingProxy) => {
                  $scope.hostingProxy = hostingProxy;

                  $scope.ftp = hostingProxy.serviceManagementAccess.ftp;
                  $scope.ftpUrl = `ftp://${
                    hostingProxy.serviceManagementAccess.ftp.url
                  }:${hostingProxy.serviceManagementAccess.ftp.port}/`;
                  $scope.http = hostingProxy.serviceManagementAccess.http;
                  $scope.httpUrl = `http://${
                    hostingProxy.serviceManagementAccess.http.url
                  }:${hostingProxy.serviceManagementAccess.http.port}/`;
                  $scope.ssh = hostingProxy.serviceManagementAccess.ssh;
                  $scope.sshUrl = `ssh://${
                    hostingProxy.serviceManagementAccess.ssh.url
                  }:${hostingProxy.serviceManagementAccess.ssh.port}/`;

                  if (
                    $scope.hostingProxy
                    && $scope.hostingProxy.cluster
                    && parseInt(
                      $scope.hostingProxy.cluster.split('cluster')[1],
                      10,
                    ) >= 20
                  ) {
                    // FOR GRAVELINE
                    $scope.urchin = URI.expand(constants.urchin_gra, {
                      serviceName: hosting.serviceName,
                      cluster: hostingProxy.cluster,
                    }).toString();
                  } else {
                    $scope.urchin = URI.expand(constants.urchin, {
                      serviceName: hosting.serviceName,
                      cluster: hostingProxy.cluster,
                    }).toString();
                  }

                  $scope.loadingHostingInformations = false;

                  return User.getUrlOf('guides');
                })
                .then((guides) => {
                  if (guides) {
                    // GLOBAL ALERT TO UPGRADE APACHE
                    if (_.indexOf(hosting.updates, 'APACHE24') >= 0) {
                      $timeout(() => {
                        Alerter.alertFromSWS(
                          $scope.tr(
                            'hosting_global_php_version_pending_update_apache',
                            [
                              guides.works.apache,
                              'http://travaux.ovh.net/?do=details&id=25601',
                            ],
                          ),
                          null,
                          $scope.alerts.tabs,
                        );
                      }, 100);
                    }

                    switch ($scope.hosting.serviceState) {
                      case 'BLOQUED':
                        if (guides.hostingHackState) {
                          $scope.guideHostingState = guides.hostingHackState;
                        }
                        break;
                      case 'MAINTENANCE':
                        if (guides.hostingDisabledState) {
                          $scope.guideHostingState = guides.hostingDisabledState;
                        }
                        break;
                      default:
                        break;
                    }
                  }
                })
                .finally(() => {
                  $scope.loadingHostingInformations = false;
                });

              User.getUrlOfEndsWithSubsidiary('hosting').then((url) => {
                $scope.urls.hosting = url;
              });

              Hosting.getPrivateDatabasesLinked($stateParams.productId)
                .then(databasesId => $q.all(_.map(
                  databasesId,
                  dbName => $scope.isAdminPrivateDb(dbName).then(isAdmin => ({
                    name: dbName,
                    isAdmin,
                  })),
                )))
                .then((databases) => {
                  $scope.privateDatabasesLinked = databases;
                })
                .catch(err => Alerter.error(err));

              if (hosting.messages.length > 0) {
                Alerter.error(
                  $scope.tr('hosting_dashboard_loading_error'),
                  $scope.alerts.page,
                );
                if (!hosting.name) {
                  $scope.loadingHostingError = true;
                }
              }

              // error 409 and 403 have no matter, they juste saying: "the job is pending"
              // and other ?  I think is a kind of sub treat as "best effort"
              // Anyway, the ovhConfig must be loaded
              HostingOvhConfig.ovhConfigRefresh($stateParams.productId).finally(loadOvhConfig);

              if (!hosting.isExpired) {
                checkFlushCdnState();
                checkSqlPriveState();
                $scope.getOfferPrivateSQLInfo();
                return Screenshot.getScreenshot(hosting.serviceName);
              }
              return null;
            },
            () => {
              $scope.loadingHostingInformations = false;
              $scope.loadingHostingError = true;
            },
          )
          .then((screenshot) => {
            $scope.screenshot = screenshot;
          })
          .finally(() => {
            $scope.loadingScreenshot = false;
          });

        User.getUrlOf('domainOrder').then(
          (link) => {
            $scope.urlDomainOrder = link;
          },
          () => {
            $scope.urlDomainOrder = null;
          },
        );
      };

      $scope.editDisplayName = () => {
        $scope.newDisplayName.value = $scope.hosting.displayName || $scope.hosting.serviceName;
        $scope.edit.active = true;
      };

      $scope.saveDisplayName = () => {
        const displayName = $scope.newDisplayName.value || $scope.hosting.serviceName;
        Hosting.updateHosting($stateParams.productId, {
          body: {
            displayName,
          },
        })
          .then(() => {
            $rootScope.$broadcast('change.displayName', [
              $scope.hosting.serviceName,
              displayName,
            ]);
            $timeout(() => {
              $scope.hosting.displayName = displayName;
            }, 0);
          })
          .catch((err) => {
            _.set(err, 'type', err.type || 'ERROR');
            Alerter.alertFromSWS(
              $scope.tr('hosting_dashboard_loading_error'),
              err,
              $scope.alerts.main,
            );
          })
          .finally(() => {
            $scope.edit.active = false;
          });
      };

      $scope.resetDisplayName = () => {
        $scope.edit.active = false;
      };

      $scope.getStateBadgeClass = () => {
        switch (_.get($scope.hosting, 'serviceState')) {
          case 'ACTIVE':
            return 'label-success';
          case 'MAINTENANCE':
            return 'label-warning';
          case 'BLOQUED':
            return 'label-important';
          default:
            return null;
        }
      };

      $scope.$on('hosting.cdn.flush.refresh', () => {
        checkFlushCdnState();
      });

      $scope.$on('$destroy', () => {
        Hosting.killPollFlushCdn();
        Hosting.killPollSqlPrive();
      });

      $scope.$on('hosting.database.sqlPrive', () => {
        checkSqlPriveState();
      });

      // FLUSH CDN
      $scope.resetAction = () => {
        $scope.setAction(false);
      };

      $scope.$on('$locationChangeStart', () => {
        $scope.resetAction();
      });

      $scope.setAction = (action, data) => {
        $scope.currentAction = action;
        $scope.currentActionData = data;

        if (action) {
          $scope.stepPath = `hosting/${$scope.currentAction}.html`;
          $('#currentAction').modal({
            keyboard: true,
            backdrop: 'static',
          });
        } else {
          $('#currentAction').modal('hide');
          $scope.currentActionData = null;
          $timeout(() => {
            $scope.stepPath = '';
          }, 300);
        }
      };

      $scope.getOfferPrivateSQLInfo = () => {
        $scope.hosting.sqlPriveInfo = {
          nbDataBaseActive: 0,
          nbDataBaseInclude: 0,
          offerCapabilitiesPDB: null,
          databaseCreationCapabilitiesPDB: null,
        };

        HostingDatabase.getPrivateDatabaseCapabilities($stateParams.productId)
          .then((privateDbCapabilities) => {
            $scope.hosting.sqlPriveInfo.nbDataBaseInclude = $scope.hosting
              .offerCapabilities.privateDatabases.length;
            $scope.hosting.sqlPriveInfo.nbDataBaseActive = $scope.hosting
              .sqlPriveInfo.nbDataBaseInclude - privateDbCapabilities.length;
          });
      };

      $scope.loadHosting();

      //---------------------------------------------
      // POLLING
      //---------------------------------------------
      // Add domain
      $scope.$on('hostingDomain.attachDomain.start', () => {
        Alerter.success(
          $scope.tr('hosting_tab_DOMAINS_configuration_add_success_progress'),
          $scope.alerts.main,
        );
      });

      $scope.$on('hostingDomain.attachDomain.done', () => {
        Alerter.success(
          $scope.tr('hosting_tab_DOMAINS_configuration_add_success_finish'),
          $scope.alerts.main,
        );
      });

      $scope.$on('hostingDomain.attachDomain.error', (event, err) => {
        Alerter.alertFromSWS(
          $scope.tr('hosting_tab_DOMAINS_configuration_add_failure'),
          _.get(err, 'data', err),
          $scope.alerts.main,
        );
      });

      // Modify domain
      $scope.$on('hostingDomain.modifyDomain.start', () => {
        Alerter.success(
          $scope.tr('hosting_tab_DOMAINS_configuration_modify_success_progress'),
          $scope.alerts.main,
        );
      });

      $scope.$on('hostingDomain.modifyDomain.done', () => {
        $scope.$broadcast('paginationServerSide.reload');
        Alerter.success(
          $scope.tr('hosting_tab_DOMAINS_configuration_modify_success_finish'),
          $scope.alerts.main,
        );
      });

      $scope.$on('hostingDomain.modifyDomain.error', (err) => {
        $scope.$broadcast('paginationServerSide.reload');
        Alerter.alertFromSWS(
          $scope.tr('hosting_tab_DOMAINS_configuration_modify_failure'),
          _.get(err, 'data', err),
          $scope.alerts.main,
        );
      });

      function startPolling() {
        $q.all([
          HostingDomain.getTaskIds(
            { fn: 'attachedDomain/create' },
            $stateParams.productId,
          ),
          HostingDomain.getTaskIds(
            { fn: 'attachedDomain/update' },
            $stateParams.productId,
          ),
        ]).then((tasks) => {
          const taskIds = _.union(tasks[0], tasks[1]);
          ['attachedDomain/create', 'attachedDomain/update'].forEach((name, key) => {
            if (tasks[key].length > 0) {
              HostingDomain.pollRequest({
                taskIds,
                namespace: name,
                serviceName: $scope.hosting.serviceName,
              });
            }
          });
        });
      }

      $scope.$on('$destroy', () => {
        HostingDomain.killAllPolling();
      });

      startPolling();
    },
  );
