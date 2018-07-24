angular
  .module('App')
  .controller(
    'HostingTabCronsCtrl',
    ($scope, Hosting, $timeout, $stateParams, HostingCron, Alerter, User) => {
      $scope.crons = {
        details: [],
      };
      $scope.guide = null;
      $scope.search = {
        text: null,
      };
      $scope.hasResult = false;
      $scope.loading = {
        cron: false,
        init: true,
      };

      User.getUrlOf('guides').then((guides) => {
        if (guides && guides.hostingCron) {
          $scope.guide = guides.hostingCron;
        }
      });

      $scope.loadCrons = () => {
        $scope.loading.cron = true;
        $scope.crons.ids = null;
        let filters = null;

        if ($scope.search.text) {
          filters = [
            { command: ['%', $scope.search.text, '%'].join('') },
            { description: ['%', $scope.search.text, '%'].join('') },
            { email: ['%', $scope.search.text, '%'].join('') },
          ];
        }
        HostingCron.getCrons($stateParams.productId, filters)
          .then((ids) => {
            $scope.crons.ids = ids;
          })
          .catch((err) => {
            Alerter.alertFromSWS(
              $scope.tr('hosting_tab_CRON_configuration_error'),
              _.get(err, 'data', err),
              $scope.alerts.main,
            );
          })
          .finally(() => {
            if (_.isEmpty($scope.crons.ids)) {
              $scope.loading.init = false;
              $scope.loading.cron = false;
            } else {
              $scope.hasResult = true;
            }
          });
      };

      $scope.transformItem = id => HostingCron.getCron($stateParams.productId, id);

      $scope.onTransformItemDone = () => {
        $scope.loading.cron = false;
        $scope.loading.init = false;
      };

      $scope.trEnum = str => HostingCron.trEnum(str);

      $scope.modifyCron = (cron) => {
        $scope.setAction('cron/add-or-edit/hosting-cron-add-or-edit', { cron });
      };

      $scope.deleteCron = (cron) => {
        $scope.setAction('cron/delete/hosting-cron-delete', cron);
      };

      $scope.$on(Hosting.events.tabCronsRefresh, () => {
        $scope.loading.init = true;
        $scope.hasResult = false;
        $scope.loadCrons();
      });

      const reloadCurrentPage = () => {
        if (!$scope.loading.cron) {
          $scope.loadCrons();
        }
      };

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

      $scope.loadCrons();
    },
  );
