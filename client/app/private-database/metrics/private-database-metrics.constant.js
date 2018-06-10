angular
    .module("App")
    .constant("PRIVATE_DATABASE_METRICS", {
        settingsForAllCharts: {
            type: "line",
            data: {
                datasets: []
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                legend: {
                    position: "bottom",
                    display: true
                },
                elements: {
                    point: {
                        radius: 0
                    }
                }
            }
        },
        settingsForAllSeries: {
            dataset: {
                fill: true,
                borderWidth: 1
            }
        },
        specificDatabaseVersionChartSelection: {
            mysql_55: ["memoryUsages"]
        },
        specificChartSettings: [
            {
                chartName: "memoryUsages",
                dataFromAPIIndex: 0,
                options: {
                    tooltips: {
                        mode: "label",
                        intersect: false,
                        callbacks: {
                            title: (items) => _(items).chain()
                                .first()
                                .get("xLabel")
                                .value(),
                            label: (item) => `${item.yLabel}%`
                        }
                    },
                    scales: {
                        yAxes: [{
                            type: "linear",
                            display: true,
                            position: "left",
                            scaleLabel: {
                                display: true
                            },
                            gridLines: {
                                drawBorder: true,
                                display: true
                            },
                            ticks: {
                                suggestedMin: 0,
                                suggestedMax: 100,
                                callback: (label) => `${label}%`
                            }
                        }],
                        xAxes: [{
                            type: "time",
                            position: "bottom",
                            gridLines: {
                                drawBorder: true,
                                display: false
                            },
                            time: {
                                displayFormats: {
                                    hour: "LT"
                                }
                            }
                        }]
                    }
                }
            },
            {
                chartName: "activeConnections",
                dataFromAPIIndex: 1,
                options: {
                    tooltips: {
                        mode: "label",
                        intersect: false,
                        callbacks: {
                            title: (items) => _(items).chain()
                                .first()
                                .get("xLabel")
                                .value(),
                            label: (item) => `${item.yLabel}`
                        }
                    },
                    scales: {
                        yAxes: [{
                            type: "linear",
                            display: true,
                            position: "left",
                            scaleLabel: {
                                display: true
                            },
                            gridLines: {
                                drawBorder: true,
                                display: true
                            },
                            ticks: {
                                suggestedMin: 0,
                                stepSize: 1
                            }
                        }],
                        xAxes: [{
                            type: "time",
                            position: "bottom",
                            gridLines: {
                                drawBorder: true,
                                display: false
                            },
                            time: {
                                displayFormats: {
                                    hour: "LT"
                                }
                            }
                        }]
                    }
                }
            },
            {
                chartName: "queryExecutionTimes",
                dataFromAPIIndex: 2,
                options: {
                    tooltips: {
                        mode: "label",
                        intersect: false,
                        callbacks: {
                            title: (items) => _(items).chain()
                                .first()
                                .get("xLabel")
                                .value(),
                            label: (item) => `${item.yLabel}ms`
                        }
                    },
                    scales: {
                        yAxes: [{
                            type: "linear",
                            display: true,
                            position: "left",
                            scaleLabel: {
                                display: true
                            },
                            gridLines: {
                                drawBorder: true,
                                display: true
                            },
                            ticks: {
                                suggestedMin: 0,
                                callback: (label) => `${label}ms`
                            }
                        }],
                        xAxes: [{
                            type: "time",
                            position: "bottom",
                            gridLines: {
                                drawBorder: true,
                                display: false
                            },
                            time: {
                                displayFormats: {
                                    hour: "LT"
                                }
                            }
                        }]
                    }
                }
            }
        ]
    });
