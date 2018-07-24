angular
  .module('App')
  .controller(
    'HostingStatisticsCtrl',
    (
      $scope,
      $stateParams,
      HostingStatistics,
      HostingDatabase,
      $q,
      ChartjsFactory,
      HOSTING_STATISTICS,
    ) => {
      $scope.selected = {
        period: null,
        type: null,
        db: null,
        aggregateMode: null,
        httpMeanResponseTime: false,
        haveDataToDisplay: false,
        typeIsDb() {
          const condition = v => $scope.selected.type === v;
          return (
            $scope.model.db
            && !!_.find($scope.model.constants.dbTypes, condition)
          );
        },
      };

      $scope.model = {
        constants: null,
        data: null,
        db: null,
        yUnit: null,
        seriesColors: {
          '5xx': '#DA3B3A',
          500: '#EF4339',
          501: '#B3245A',
          502: '#820233',
          503: '#CA293E',
          '4xx': '#F4BA4D',
          400: '#F4BA4D',
          401: '#DD923B',
          403: '#FA8A42',
          404: '#DDB53B',
          '2xx/3xx': '#00748E',
          200: '#00748E',
          206: '#00A9CE',
          301: '#006A82',
          302: '#00758F',
          mitigation: '#000000',
          'mitigation.blacklist': '#000000',
          'mitigation.replay': '#666666',
        },
      };

      $scope.stats = {};

      function refreshChart() {
        $scope.stats.chart = new ChartjsFactory(angular.copy(HOSTING_STATISTICS.chart));
        $scope.stats.chart.setAxisOptions('yAxes', {
          type: 'linear',
        });

        if ($scope.model.datas && $scope.model.datas.length > 0) {
          angular.forEach($scope.model.datas, (data) => {
            if (
              data
              && data.state === 'OK'
              && data.series
              && data.series.length > 0
            ) {
              $scope.selected.haveDataToDisplay = true;
              $scope.stats.chart.setYLabel(data.series[0].unit);
              angular.forEach(data.series, (serie) => {
                $scope.stats.chart.addSerie(
                  $scope.i18n[
                    `hosting_tab_STATISTICS_series_${serie.serieName}`
                  ] || serie.serieName,
                  _.map(serie.points, point => ({
                    x: point.x,
                    y: point.y,
                  })),
                  {
                    dataset: {
                      fill: true,
                      borderWidth: 1,
                    },
                  },
                );
              });
            }
          });
        }
      }

      $scope.getStatistics = () => {
        const getStatsPromises = [];
        $scope.model.datas = null;
        $scope.selected.haveDataToDisplay = false;

        if (!$scope.selected.typeIsDb()) {
          getStatsPromises.push(HostingStatistics.getStatistics(
            $stateParams.productId,
            $scope.selected.period,
            $scope.selected.type,
            $scope.selected.aggregateMode,
          ));

          if ($scope.selected.httpMeanResponseTime) {
            getStatsPromises.push(HostingStatistics.getStatistics(
              $stateParams.productId,
              $scope.selected.period,
              'IN_HTTP_MEAN_RESPONSE_TIME',
              $scope.selected.aggregateMode,
            ));
          }
        } else if ($scope.selected.db) {
          getStatsPromises.push(HostingDatabase.databaseStatistics(
            $stateParams.productId,
            $scope.selected.db,
            $scope.selected.period,
            $scope.selected.type,
            $scope.selected.aggregateMode,
          ));
        }

        $q.all(getStatsPromises).then((results) => {
          $scope.model.datas = results;
          refreshChart();
        });
      };

      function removeSqlStatistics() {
        $scope.model.constants.types = _.difference(
          $scope.model.constants.types,
          $scope.model.constants.dbTypes,
        );
      }

      function getDbList() {
        HostingDatabase.databaseList($stateParams.productId).then((data) => {
          $scope.model.db = data;
          if ($scope.model.db && $scope.model.db.length > 0) {
            [$scope.selected.db] = $scope.model.db;
          } else {
            removeSqlStatistics();
          }
        }, removeSqlStatistics);
      }

      function init() {
        HostingStatistics.getStatisticsConstants().then((data) => {
          $scope.model.constants = data;
          $scope.model.constants.types = $scope.model.constants.types
            .concat($scope.model.constants.dbTypes);
          _.remove(
            $scope.model.constants.types,
            value => value === 'IN_HTTP_MEAN_RESPONSE_TIME',
          );
          $scope.selected.type = data.defaultType;
          $scope.selected.period = data.defaultPeriod;
          $scope.selected.aggregateMode = data.defaultAggregateMode;
          $scope.getStatistics();
          getDbList();
          setTimeout(() => {
            $(window).resize();
          }, 1000);
        });
      }

      init();
    },
  );
