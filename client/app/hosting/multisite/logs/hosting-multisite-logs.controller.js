angular.module("App").controller("HostingTabDomainsMultisiteLogs", ($scope, $stateParams, Hosting, constants) => {
    "use strict";

    function generateLogHref (domain) {
        domain.logUrlGenerated = true;
        if (!domain.ownLogToken) {
            domain.logUrlError = false;
            Hosting.getUserLogsToken($stateParams.productId, { params: { attachedDomain: domain.name, remoteCheck: true } }).then(
                (result) => {
                    if ($scope.hostingProxy.datacenter.indexOf("gra") === 0) {
                        domain.logUrl = `${URI.expand(constants.stats_logs_gra, {
                            cluster: $scope.hostingProxy.cluster,
                            serviceName: domain.ownLog
                        }).toString()}?token=${result}`;
                    } else {
                        domain.logUrl = `${URI.expand(constants.stats_logs, {
                            serviceName: domain.ownLog
                        }).toString()}?token=${result}`;
                    }
                },
                () => {
                    domain.logUrlError = true;
                }
            );
        }
        return false;
    }

    $scope.$on("popover.show", (evt, elm) => {
        const domain = $scope.domains.list.results[elm["0"].dataset.domainIndex];
        if (!domain.logUrlGenerated) {
            generateLogHref(domain);
        }
    });
});
