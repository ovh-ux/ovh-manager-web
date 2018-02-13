angular.module("App").controller(
    "HostingTabUserLogsCtrl",
    class HostingTabUserLogsCtrl {
        constructor ($scope, $q, $filter, $stateParams, Alerter, constants, Hosting, User) {
            this.$scope = $scope;
            this.$q = $q;
            this.$filter = $filter;
            this.$stateParams = $stateParams;
            this.Alerter = Alerter;
            this.constants = constants;
            this.Hosting = Hosting;
            this.User = User;
        }

        $onInit () {
            this.hosting = this.$scope.hosting;
            this.userLogs = {};
            this.userLogsToken = null;

            this.$scope.itemsPerPage = 10;
            this.$scope.nbPages = 1;

            this.$scope.$on("hosting.userLogs.refresh", () => {
                this.refreshTableUserLogs();
            });

            this.Hosting.getUserLogsToken(this.$stateParams.productId, {
                params: {
                    remoteCheck: true,
                    ttl: 3600
                }
            }).then((token) => {
                this.userLogsToken = token;
            });

            this.User.getUrlOf("guides")
                .then((guides) => {
                    this.guide = _.get(guides, "hostingStatsLogs");
                });

            if (parseInt(this.$scope.hostingProxy.cluster.split("cluster")[1], 10) >= 20) {
                // FOR GRAVELINE
                this.urlUrchin = URI.expand(this.constants.urchin_gra, {
                    serviceName: this.$stateParams.productId,
                    cluster: this.$scope.hostingProxy.cluster
                }).toString();

                this.urlLogs = URI.expand(this.constants.stats_logs_gra, {
                    serviceName: this.$stateParams.productId,
                    cluster: this.$scope.hostingProxy.cluster
                }).toString();
            } else {
                this.urlUrchin = URI.expand(this.constants.urchin, {
                    serviceName: this.$stateParams.productId,
                    cluster: this.$scope.hostingProxy.cluster
                }).toString();

                this.urlLogs = URI.expand(this.constants.stats_logs, {
                    serviceName: this.$stateParams.productId,
                    cluster: this.$scope.hostingProxy.cluster
                }).toString();
            }

            this.refreshTableUserLogs();
        }

        refreshTableUserLogs () {
            this.userLogs.ids = null;

            return this.Hosting.getUserLogs(this.$stateParams.productId)
                .then((data) => data.sort())
                .then((ids) => {
                    this.userLogs.ids = ids.map((id) => ({ id }));
                    return this.userLogs.ids;
                })
                .catch((err) => {
                    this.Alerter.alertFromSWS(err);
                });
        }

        transformItem (item) {
            if (item.transformed) {
                return this.$q((resolve) => resolve(item));
            }
            return this.Hosting.getUserLogsEntry(this.$stateParams.productId, item.id)
                .then((logEntry) => {
                    logEntry.id = item.id;
                    logEntry.transformed = true;
                    return logEntry;
                })
                .catch(() => ({
                    id: item.id,
                    login: item.id,
                    transformed: true
                }));
        }
    }
);
