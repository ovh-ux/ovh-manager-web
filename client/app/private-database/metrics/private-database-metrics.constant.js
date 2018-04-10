angular.module("App").constant("PRIVATE_DATABASE_METRICS", {
    chart: {
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
            },
            tooltips: {
                mode: "label",
                intersect: false,
                callbacks: {
                    title (data) {
                        return moment(_.get(_.first(data), "xLabel")).fromNow();
                    }
                }
            },
            pan: {
                enabled: true,
                mode: "xy"
            },
            zoom: {
                enabled: true,
                mode: "xy",
                limits: {
                    max: 10,
                    min: 0.5
                }
            },
            scales: {
                yAxes: [{
                    display: true,
                    position: "left",
                    scaleLabel: {
                        display: true
                    },
                    gridLines: {
                        drawBorder: true,
                        display: true
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
});
