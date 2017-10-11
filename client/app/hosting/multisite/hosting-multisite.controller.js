angular.module("App").controller("HostingTabDomainsCtrl", ($scope, $q, $stateParams, $location, Hosting, HostingDomain, $timeout, Alerter) => {
    "use strict";

    $scope.domains = null;
    $scope.sslLinked = [];
    $scope.showGuidesStatus = false;
    $scope.search = {
        text: null
    };
    $scope.hasResult = false;
    $scope.loading = {
        domains: false,
        init: true
    };

    $scope.loadDomains = function (count, offset) {
        let sslInfos;
        let domainsList;

        $scope.loading.domains = true;
        if ($location.search().domain) {
            $scope.search.text = $location.search().domain;
        }

        Hosting.getTabDomains($stateParams.productId, count, offset, $scope.search.text)
            .then((domains) => {
                if (_.get(domains, "list.results", []).length > 0) {
                    $scope.hasResult = true;
                }
                domainsList = domains;
            })
            .finally(() => {
                Hosting.getAttachDomainSslLinked($stateParams.productId)
                    .then((sslLinked) => {
                        sslInfos = sslLinked;
                    })
                    .finally(() => {
                        _.forEach(_.get(domainsList, "list.results", []), (domain) => {
                            domain.rawSsl = domain.ssl;
                            if (Array.isArray(sslInfos) && sslInfos.indexOf(domain.name) === -1) {
                                domain.ssl = domain.ssl ? 1 : 0;
                            } else {
                                domain.ssl = domain.ssl ? 2 : 1;
                            }

                            return domain;
                        });

                        $scope.domains = domainsList;

                        $location.search("domain", null);

                        $scope.loading.domains = false;
                        $scope.loading.init = false;
                    });
            });

        $scope.excludeAttachedDomains = [$scope.hosting.cluster.replace(/^ftp/, $scope.hosting.primaryLogin)];
    };

    $scope.detachDomain = function (domain) {
        $scope.setAction("multisite/delete/hosting-multisite-delete", domain);
    };

    $scope.modifyDomain = function (domain) {
        $scope.setAction("multisite/update/hosting-multisite-update", domain);
    };

    $scope.$on(Hosting.events.tabDomainsRefresh, () => {
        $scope.hasResult = false;
        $scope.loading.init = true;
        $scope.$broadcast("paginationServerSide.reload");
    });

    function reloadCurrentPage () {
        if (!$scope.loading.domains) {
            $scope.$broadcast("paginationServerSide.reload");
        }
    }

    $scope.$watch(
        "search.text",
        (newValue) => {
            if ($scope.search.text !== null) {
                if ($scope.search.text === "") {
                    reloadCurrentPage();
                } else if ($scope.search.text === newValue) {
                    reloadCurrentPage();
                }
            }
        },
        true
    );

    //---------------------------------------------
    // POLLING
    //---------------------------------------------
    // Add domain
    $scope.$on("hostingDomain.attachDomain.start", () => {
        Alerter.success($scope.tr("hosting_tab_DOMAINS_configuration_add_success_progress"), $scope.alerts.main);
    });

    $scope.$on("hostingDomain.attachDomain.done", () => {
        $scope.$broadcast("paginationServerSide.reload");
        Alerter.success($scope.tr("hosting_tab_DOMAINS_configuration_add_success_finish"), $scope.alerts.main);
    });

    $scope.$on("hostingDomain.attachDomain.error", (event, err) => {
        $scope.$broadcast("paginationServerSide.reload");
        Alerter.alertFromSWS($scope.tr("hosting_tab_DOMAINS_configuration_add_failure"), _.get(err, "data", err), $scope.alerts.main);
    });

    // Modify domain
    $scope.$on("hostingDomain.modifyDomain.start", () => {
        Alerter.success($scope.tr("hosting_tab_DOMAINS_configuration_modify_success_progress"), $scope.alerts.main);
    });

    $scope.$on("hostingDomain.modifyDomain.done", () => {
        $scope.$broadcast("paginationServerSide.reload");
        Alerter.success($scope.tr("hosting_tab_DOMAINS_configuration_modify_success_finish"), $scope.alerts.main);
    });

    $scope.$on("hostingDomain.modifyDomain.error", (err) => {
        $scope.$broadcast("paginationServerSide.reload");
        Alerter.alertFromSWS($scope.tr("hosting_tab_DOMAINS_configuration_modify_failure"), _.get(err, "data", err), $scope.alerts.main);
    });

    // Remove domain
    $scope.$on("hostingDomain.detachDomain.start", () => {
        Alerter.success($scope.tr("hosting_tab_DOMAINS_configuration_remove_success_progress"), $scope.alerts.main);
    });

    $scope.$on("hostingDomain.detachDomain.done", () => {
        $scope.$broadcast("paginationServerSide.reload");
    });

    $scope.$on("hostingDomain.detachDomain.error", (event, err) => {
        $scope.$broadcast("paginationServerSide.reload");
        Alerter.alertFromSWS($scope.tr("hosting_tab_DOMAINS_configuration_remove_failure"), _.get(err, "data", err), $scope.alerts.main);
    });

    function startPolling () {
        $q
            .all([
                HostingDomain.getTaskIds({ fn: "attachedDomain/create" }, $stateParams.productId),
                HostingDomain.getTaskIds({ fn: "attachedDomain/update" }, $stateParams.productId),
                HostingDomain.getTaskIds({ fn: "web/detachDomain" }, $stateParams.productId)
            ])
            .then((tasks) => {
                const taskIds = _.union(tasks[0], tasks[1], tasks[2]);
                ["attachedDomain/create", "attachedDomain/update", "web/detachDomain"].forEach((name, key) => {
                    if (tasks[key].length > 0) {
                        HostingDomain.pollRequest({
                            taskIds,
                            namespace: name,
                            serviceName: $scope.hosting.serviceName
                        });
                    }
                });
            });
    }

    $scope.$on("$destroy", () => {
        HostingDomain.killAllPolling();
    });

    startPolling();
});
