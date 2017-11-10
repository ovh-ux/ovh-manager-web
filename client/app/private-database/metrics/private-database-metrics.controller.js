angular.module("App").controller(
    "PrivateDatabaseMetricsCtrl",
    class PrivateDatabaseMetricsCtrl {
        constructor (Alerter, PrivateDatabase, $scope, ChartjsFactory, PRIVATE_DATABASE_METRICS) {
            this.alerter = Alerter;
            this.privateDatabaseService = PrivateDatabase;
            this.$scope = $scope;
            this.ChartjsFactory = ChartjsFactory;
            this.constant = { PRIVATE_DATABASE_METRICS };
        }

        $onInit () {
            this.timeRange = ["DAY", "WEEK", "MONTH"];
            this.timeRangeSelected = this.timeRange[0];

            this.loaders = {
                metrics: false
            };

            this.chart = {
                memory: null,
                connections: null,
                time: null
            };

            const wrongVersion = [
                "mysql_55"
            ];
            this.wrongVersionTrad = _.trim(_.map(wrongVersion, (version) => ` ${this.$scope.tr(`privateDatabase_dashboard_version_${version}`)}`));
            this.isWrongVersion = _.indexOf(wrongVersion, this.$scope.database.version) !== -1;

            this.loadMetrics();

            this.getMetrics = (range) => this.getMetrics(range);
        }

        getMetrics (range) {
            this.timeRangeSelected = range;
            this.loadMetrics();
        }

        loadMetrics () {
            this.loaders.metrics = true;

            return this.privateDatabaseService
                .getGraphData({
                    graphEndpoint: this.$scope.database.graphEndpoint,
                    range: this.timeRangeSelected
                })
                .then((data) => {
                    if (_.isArray(data)) {

                        const graphs = {
                            memory: _.get(data, ["0"]),
                            connections: _.get(data, ["1"]),
                            time: _.get(data, ["2"])
                        };

                        _.each(_.pairs(graphs), (graph) => {
                            const key = graph[0];
                            const value = graph[1];

                            if (!value) {
                                return;
                            }

                            this.chart[key] = new this.ChartjsFactory(angular.copy(this.constant.PRIVATE_DATABASE_METRICS.chart));
                            this.chart[key].setAxisOptions("yAxes", {
                                type: "linear"
                            });
                            this.chart[key].addSerie(
                                this.$scope.tr(`privateDatabase_metrics_${key}_graph_${value.metric.replace(/\./g, "_")}`),
                                this.constructor.getChartSeries(value),
                                {
                                    dataset: {
                                        fill: true,
                                        borderWidth: 1
                                    }
                                }
                            );
                        });
                    }
                })
                .catch((err) => {
                    this.alerter.alertFromSWS(this.$scope.tr("privateDatabase_metrics_loading_error"), err, this.$scope.alerts.main);
                })
                .finally(() => {
                    this.loaders.metrics = false;
                });
        }

        static getChartSeries (data) {
            return _(data.dps).keys().map((key) => ({
                x: key * 1000,
                y: data.dps[key]
            })).value();
        }
    }
);
