angular.module("App").controller(
    "HostingTabDomainsMultisiteLogs",
    class HostingTabDomainsMultisiteLogs {
        constructor ($scope, $stateParams, Alerter, Hosting, constants) {
            this.$scope = $scope;
            this.$stateParams = $stateParams;
            this.Alerter = Alerter;
            this.Hosting = Hosting;
            this.constants = constants;
        }

        $onInit () {
            this.$scope.$on("popover.show", (evt, elm) => {
                const domain = this.$scope.domains.list.results[elm["0"].dataset.domainIndex];
                if (!domain.logUrlGenerated) {
                    this.generateLogHref(domain);
                }
            });
        }

        generateLogHref (domain) {
            domain.logUrlGenerated = true;
            if (!domain.ownLogToken) {
                domain.logsLoading = true;
                this.Hosting.getUserLogsToken(this.$stateParams.productId, { params: { attachedDomain: domain.name, remoteCheck: true } })
                    .then((result) => {
                        if (_.indexOf(this.$scope.hostingProxy.datacenter, "gra") === 0) {
                            domain.logUrl = `${URI.expand(this.constants.stats_logs_gra, {
                                cluster: this.$scope.hostingProxy.cluster,
                                serviceName: domain.ownLog
                            }).toString()}?token=${result}`;
                        } else {
                            domain.logUrl = `${URI.expand(this.constants.stats_logs, {
                                serviceName: domain.ownLog
                            }).toString()}?token=${result}`;
                        }
                    })
                    .catch(() => {
                        this.Alerter.error(this.$scope.tr("hosting_tab_DOMAINS_multisite_logs_generation_error"), this.$scope.alerts.main);
                    })
                    .finally(() => {
                        domain.logsLoading = false;
                    });
            }
            return false;
        }
    }
);
