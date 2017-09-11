/* global angular, moment*/
angular.module("App").controller("HostingTabAutomatedEmailsCtrl", ($scope, $stateParams, $timeout, HostingAutomatedEmails, Alerter, $filter, User, ChartjsFactory, HOSTING_AUTOMATED_EMAILS) => {
    "use strict";

    $scope.automatedEmails = null;
    $scope.bounces = [];
    $scope.volumesLimit = 20;
    $scope.bouncesLimit = 20;
    $scope.currentView = "INFORMATIONS_VIEW";

    $scope.loaders = {
        loading: false,
        volumes: false,
        bounces: false
    };

    $scope.stats = {};

    $scope.thereAreEmailsInError = true;
    $scope.isPurging = false;
    $scope.hasBeenPurge = false;

    //---------------------------------------------
    // INIT
    //---------------------------------------------
    let poll;

    function polling () {
        HostingAutomatedEmails.getAutomatedEmails($stateParams.productId).then((data) => {
            if (data.state === "purging") {
                $scope.isPurging = true;
                poll = $timeout(polling, 3000);
            } else {
                $scope.isPurging = false;
                $scope.hasBeenPurge = true;
                $timeout.cancel(poll);
                init();
            }
        });
    }

    function init () {
        $scope.loaders.loading = true;
        Alerter.resetMessage($scope.alerts.dashboard);

        HostingAutomatedEmails.getAutomatedEmails($stateParams.productId)
            .then(
                (data) => {
                    if (!_.isEmpty($scope.automatedEmails) && $scope.automatedEmails.state !== data.state && data.state === "purging") {
                        polling();
                    }

                    $scope.automatedEmails = data;
                    $scope.getVolumes();
                },
                (err) => {
                    Alerter.alertFromSWS($scope.tr("hosting_tab_AUTOMATED_EMAILS_error"), err, $scope.alerts.dashboard);
                }
            )
            .finally(() => {
                $scope.loaders.loading = false;
            });

        User.getUrlOf("guides").then((guides) => {
            if (guides && guides.hostingScriptEmail) {
                $scope.guide = guides.hostingScriptEmail;
            }
        });
    }

    $scope.getVolumes = () => {
        $scope.loaders.volumes = true;
        return HostingAutomatedEmails.getVolumes($stateParams.productId, { limit: $scope.volumesLimit })
            .then(
                (data) => {
                    $scope.stats.chart = new ChartjsFactory(angular.copy(HOSTING_AUTOMATED_EMAILS.chart));
                    $scope.stats.chart.setAxisOptions("yAxes", {
                        type: "linear"
                    });
                    $scope.stats.chart.addSerie(
                        $scope.tr("hosting_tab_AUTOMATED_EMAILS_emails_sent"),
                        data.data.reverse().map((d) => ({
                            x: moment.utc(new Date(d.date)).valueOf(),
                            y: d.volume
                        })),
                        {
                            dataset: {
                                fill: true,
                                borderWidth: 1
                            }
                        }
                    );
                },
                (err) => {
                    if (err.status !== 404) {
                        Alerter.alertFromSWS($scope.tr("hosting_tab_AUTOMATED_EMAILS_error"), err.data, $scope.alerts.dashboard);
                    }
                }
            )
            .finally(() => {
                $scope.loaders.volumes = false;
            });
    };

    $scope.$watch("volumesLimit", () => {
        if (!$scope.volumesLimit) {
            return;
        }
        $scope.getVolumes();
    });

    $scope.getBounces = () => {
        $scope.loaders.bounces = true;
        return HostingAutomatedEmails.getBounces($stateParams.productId, { limit: $scope.bouncesLimit })
            .then(
                (data) => {
                    $scope.thereAreEmailsInError = false;
                    $scope.bounces = data.data;
                },
                (err) => {
                    if (err.status !== 404) {
                        Alerter.alertFromSWS($scope.tr("hosting_tab_AUTOMATED_EMAILS_error"), err.data, $scope.alerts.dashboard);
                    } else {
                        $scope.thereAreEmailsInError = true;
                    }
                }
            )
            .finally(() => {
                $scope.loaders.bounces = false;
            });
    };

    $scope.$watch("bouncesLimit", () => {
        if (!$scope.bouncesLimit) {
            return;
        }
        $scope.getBounces();
    });

    $scope.purge = () => {
        if ($scope.automatedEmails.state !== "ko" && $scope.automatedEmails.state !== "spam" && $scope.automatedEmails.state !== "bounce") {
            return;
        }
        $scope.setAction("automated-emails/request/hosting-automated-emails-request", { automatedEmails: $scope.automatedEmails, action: "PURGE" });
    };

    $scope.$on("hosting.automatedEmails.request.changed", init);

    init();
});
