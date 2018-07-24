angular
  .module('App')
  .controller(
    'HostingTabDomainsCtrl',
    (
      $scope,
      $q,
      $stateParams,
      $location,
      Hosting,
      HostingDomain,
      hostingSSLCertificate,
      $timeout,
      Alerter,
    ) => {
      $scope.domains = null;
      $scope.sslLinked = [];
      $scope.showGuidesStatus = false;
      $scope.search = {
        text: null,
      };
      $scope.hasResult = false;
      $scope.loading = {
        domains: false,
        init: true,
      };

      $scope.loadDomains = function loadDomains(count, offset) {
        $scope.loading.domains = true;

        if ($location.search().domain) {
          $scope.search.text = $location.search().domain;
        }

        $scope.excludeAttachedDomains = [
          $scope.hosting.cluster.replace(/^ftp/, $scope.hosting.primaryLogin),
        ];

        return Hosting.getTabDomains(
          $stateParams.productId,
          count,
          offset,
          $scope.search.text,
        )
          .then((domains) => {
            $scope.domains = domains;
            $scope.hasResult = !_($scope.domains).isEmpty();
          })
          .catch((error) => {
            Alerter.alertFromSWS(
              this.translator.tr('hosting_dashboard_ssl_details_error'),
              error,
              $scope.alerts.main,
            );
          })
          .then(() => hostingSSLCertificate.retrievingLinkedDomains($stateParams.productId))
          .then((sslLinked) => {
            const linkedSSLs = _(sslLinked).isArray() ? sslLinked : [sslLinked];

            $scope.domains.list.results = _($scope.domains.list.results)
              .map((domain) => {
                const newDomain = _(domain).clone();
                newDomain.rawSsl = newDomain.ssl;

                if (_(linkedSSLs).includes(newDomain.name)) {
                  newDomain.ssl = newDomain.ssl ? 2 : 1;
                } else {
                  newDomain.ssl = newDomain.ssl ? 1 : 0;
                }

                return newDomain;
              })
              .value();
          })
          .catch((error) => {
            Alerter.alertFromSWS(
              this.translator.tr('hosting_dashboard_ssl_details_error'),
              error,
              $scope.alerts.main,
            );
          })
          .then(() => Hosting.getSelected($stateParams.productId))
          .then((hosting) => {
            $scope.hosting = hosting;
            $scope.numberOfColumns = 5 + hosting.isCloudWeb + hosting.hasCdn;

            if (hosting.isCloudWeb) {
              const promises = _($scope.domains.list.results)
                .filter(domain => domain.runtimeId)
                .map((originalDomain) => {
                  const domain = _(originalDomain).clone();

                  return HostingDomain.getRuntimeConfiguration(
                    $stateParams.productId,
                    domain.runtimeId,
                  ).then((runtime) => {
                    domain.runtime = runtime;
                  });
                })
                .value();

              return $q.all(promises);
            }

            return null;
          })
          .catch((error) => {
            Alerter.alertFromSWS(
              this.translator.tr('hosting_dashboard_ssl_details_error'),
              error,
              $scope.alerts.main,
            );
          })
          .then(() => this.hostingSSLCertificate.retrievingCertificate(this.$stateParams.productId))
          .then((certificate) => {
            $scope.sslCertificate = certificate;
          })
          .catch((error) => {
            // 404 error means that the user has no SSL certificate
            if (error.status !== 404) {
              Alerter.alertFromSWS(
                this.translator.tr('hosting_dashboard_ssl_details_error'),
                error,
                $scope.alerts.main,
              );
            }
          })
          .finally(() => {
            $location.search('domain', null);

            $scope.loading.domains = false;
            $scope.loading.init = false;
          });
      };

      $scope.detachDomain = (domain) => {
        $scope.setAction('multisite/delete/hosting-multisite-delete', domain);
      };

      $scope.modifyDomain = (domain) => {
        $scope.setAction('multisite/update/hosting-multisite-update', domain);
      };

      $scope.$on(Hosting.events.tabDomainsRefresh, () => {
        $scope.hasResult = false;
        $scope.loading.init = true;
        $scope.$broadcast('paginationServerSide.reload');
      });

      function reloadCurrentPage() {
        if (!$scope.loading.domains) {
          $scope.$broadcast('paginationServerSide.reload');
        }
      }

      $scope.$watch(
        'search.text',
        (newValue) => {
          if ($scope.search.text !== null) {
            if ($scope.search.text === '') {
              reloadCurrentPage();
            } else if ($scope.search.text === newValue) {
              reloadCurrentPage();
            }
          }
        },
        true,
      );

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
        $scope.$broadcast('paginationServerSide.reload');
        Alerter.success(
          $scope.tr('hosting_tab_DOMAINS_configuration_add_success_finish'),
          $scope.alerts.main,
        );
      });

      $scope.$on('hostingDomain.attachDomain.error', (event, err) => {
        $scope.$broadcast('paginationServerSide.reload');
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

      // Remove domain
      $scope.$on('hostingDomain.detachDomain.start', () => {
        Alerter.success(
          $scope.tr('hosting_tab_DOMAINS_configuration_remove_success_progress'),
          $scope.alerts.main,
        );
      });

      $scope.$on('hostingDomain.detachDomain.done', () => {
        $scope.$broadcast('paginationServerSide.reload');
      });

      $scope.$on('hostingDomain.detachDomain.error', (event, err) => {
        $scope.$broadcast('paginationServerSide.reload');
        Alerter.alertFromSWS(
          $scope.tr('hosting_tab_DOMAINS_configuration_remove_failure'),
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
          HostingDomain.getTaskIds(
            { fn: 'web/detachDomain' },
            $stateParams.productId,
          ),
        ]).then((tasks) => {
          const taskIds = _.union(tasks[0], tasks[1], tasks[2]);
          [
            'attachedDomain/create',
            'attachedDomain/update',
            'web/detachDomain',
          ].forEach((name, key) => {
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
