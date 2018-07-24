angular
  .module('App')
  .controller('PrivateDatabaseMetricsCtrl', class PrivateDatabaseMetricsCtrl {
    constructor(
      $scope,
      Alerter, ChartjsFactory, PrivateDatabase, translator,
      PRIVATE_DATABASE_METRICS,
    ) {
      this.$scope = $scope;

      this.Alerter = Alerter;
      this.ChartjsFactory = ChartjsFactory;
      this.PrivateDatabase = PrivateDatabase;
      this.translator = translator;

      this.PRIVATE_DATABASE_METRICS = PRIVATE_DATABASE_METRICS;
    }

    $onInit() {
      this.charts = { };

      return this.fetchingMetrics();
    }

    fetchingMetrics() {
      this.isFetchingMetrics = true;

      return this.PrivateDatabase
        .getGraphData({
          graphEndpoint: this.$scope.database.graphEndpoint,
          range: 'DAY',
        })
        .then((chartData) => {
          if (!_(chartData).isArray()) {
            throw new Error(this.translator.tr('common_temporary_error'));
          }

          const chartSettings = this.PRIVATE_DATABASE_METRICS.specificDatabaseVersionChartSelection[
            this.$scope.database.version
          ];
          _(this.PRIVATE_DATABASE_METRICS.specificChartSettings)
            .filter(currentChartSettings => !_(chartSettings).isArray()
                            || _(chartSettings).includes(currentChartSettings.chartName))
            .forEach((currentChartSettings) => {
              const { chartName } = currentChartSettings;
              const currentChartData = chartData[currentChartSettings.dataFromAPIIndex];

              if (!_(currentChartData).isObject()) {
                this.charts[chartName] = {
                  hasData: false,
                  name: chartName,
                };
              } else {
                const settingsForAllCharts = _(this.PRIVATE_DATABASE_METRICS.settingsForAllCharts)
                  .clone(true);
                const settingsForCurrentChart = _(settingsForAllCharts)
                  .merge(currentChartSettings)
                  .value();
                const chart = new this.ChartjsFactory(settingsForCurrentChart);
                const serieName = this.translator.tr(`privateDatabase_metrics_${chartName}_graph_${currentChartData.metric.replace(/\./g, '_')}`);
                const serieValue = this.constructor.getChartSeries(currentChartData);

                chart.addSerie(
                  serieName,
                  serieValue,
                  this.PRIVATE_DATABASE_METRICS.settingsForAllSeries,
                );

                this.charts[chartName] = {
                  hasData: true,
                  data: chart,
                  name: chartName,
                };
              }
            }).value();
        })
        .catch((err) => {
          _.set(err, 'type', err.type || 'ERROR');
          this.Alerter.alertFromSWS(this.$scope.tr('privateDatabase_dashboard_loading_error'), err, this.$scope.alerts.main);
        })
        .finally(() => {
          this.isFetchingMetrics = false;
        });
    }

    static getChartSeries(data) {
      return _(data.dps).keys().map(key => ({
        x: key * 1000,
        y: Math.round(data.dps[key] * 100) / 100,
      })).value();
    }
  });
