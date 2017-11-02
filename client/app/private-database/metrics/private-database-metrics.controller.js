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

                        // memory
                        this.chart.memory = new this.ChartjsFactory(angular.copy(this.constant.PRIVATE_DATABASE_METRICS.chart));
                        this.chart.memory.setAxisOptions("yAxes", {
                            type: "linear"
                        });
                        this.chart.memory.addSerie(
                            this.$scope.tr(`privateDatabase_metrics_memory_graph_${data[0].metric.replace(/\./g, "_")}`),
                            this.constructor.getChartSeries(data[0]),
                            {
                                dataset: {
                                    fill: true,
                                    borderWidth: 1
                                }
                            }
                        );

                        // connections
                        if (data.length > 1) {
                            this.chart.connections = new this.ChartjsFactory(angular.copy(this.constant.PRIVATE_DATABASE_METRICS.chart));
                            this.chart.connections.setAxisOptions("yAxes", {
                                type: "linear"
                            });
                            this.chart.connections.addSerie(
                                this.$scope.tr(`privateDatabase_metrics_connections_graph_${data[1].metric.replace(/\./g, "_")}`),
                                this.constructor.getChartSeries(data[1]),
                                {
                                    dataset: {
                                        fill: true,
                                        borderWidth: 1
                                    }
                                }
                            );
                        }

                        // time
                        if (data.length > 2) {
                            this.chart.time = new this.ChartjsFactory(angular.copy(this.constant.PRIVATE_DATABASE_METRICS.chart));
                            this.chart.time.setAxisOptions("yAxes", {
                                type: "linear"
                            });
                            this.chart.time.addSerie(
                                this.$scope.tr(`privateDatabase_metrics_time_graph_${data[2].metric.replace(/\./g, "_")}`),
                                this.constructor.getChartSeries(data[2]),
                                {
                                    dataset: {
                                        fill: true,
                                        borderWidth: 1
                                    }
                                }
                            );
                        }
                    }
                })
                .catch((err) => {
                    _.set(err, "type", err.type || "ERROR");
                    this.alerter.alertFromSWS(this.$scope.tr("privateDatabase_dashboard_loading_error"), err, this.$scope.alerts.main);
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
