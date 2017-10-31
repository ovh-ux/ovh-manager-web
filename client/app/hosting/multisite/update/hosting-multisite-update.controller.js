angular.module("App").controller("HostingDomainModifyCtrl", ($scope, $stateParams, HostingDomain, Hosting, Alerter, Domain, User, $q) => {
    "use strict";

    $scope.selectedOptions = {};

    $scope.selected = {
        domain: angular.copy($scope.currentActionData),
        domainWwwNeeded: false,
        domainWww: null,
        pathFinal: null,
        ipv6: $scope.currentActionData.ipV6Enabled,
        ssl: $scope.currentActionData.rawSsl
    };

    if ($scope.selected.domain.ownLog) {
        $scope.selected.ownLogDomain = {
            name: $scope.selected.domain.ownLog
        };

        $scope.selected.domain.ownLog = "ACTIVE";
    } else {
        $scope.selected.domain.ownLog = "NONE";
    }

    $scope.model = {
        domains: null
    };

    $scope.classes = {
        homeInvalid: ""
    };

    $scope.$watch("selected.domain.path", () => {
        if ($scope.selected.domain.path) {
            $scope.classes.homeInvalid = $scope.isPathValid() ? "" : "error";
        } else {
            $scope.classes.homeInvalid = "";
        }
    });

    $scope.domainsAlreadyExists = function () {
        if ($scope.model.domains && $scope.model.domains.indexOf(`www.${$scope.selected.domain.name}`) !== -1) {
            return true;
        }
        return false;
    };

    $scope.isPathValid = function () {
        return Hosting.constructor.isPathValid($scope.selected.domain.path);
    };

    function isCountryIp (countryIps, recordIdsData) {
        let target = "FR";

        if (_.find(countryIps, (countryIp) => countryIp.country === $scope.userInfos.ovhSubsidiary)) {
            target = $scope.userInfos.ovhSubsidiary;
        }

        _.forEach(countryIps, (country) => {
            const countryFound = _.find(recordIdsData, (record) => country.ip === record.target && country.country !== target);

            if (countryFound) {
                $scope.selected.domain.ipLocation = country;

                if ($scope.selected.domain.ipLocation !== "") {
                    $scope.selectedOptions.ipLocation = true;
                }
            }
        });
    }

    $scope.loadStep1 = function () {
        const subDomainName = $scope.getSelectedDomainToDisplay().replace(`.${$scope.hosting.serviceName}`, "");

        if ($scope.getSelectedDomainToDisplay().match(/^www\..*/)) {
            $scope.selected.domainWww = $scope.selected.domain.displayName;
        } else {
            $scope.selected.domainWww = ["www", $scope.selected.domain.displayName].join(".");
        }

        HostingDomain.getExistingDomains(false, $stateParams.productId)
            .then((data) => {
                $scope.model.domains = data.existingDomains;
            })
            .catch((err) => {
                $scope.resetAction();
                Alerter.alertFromSWS($scope.tr("hosting_tab_DOMAINS_configuration_add_loading_error"), _.get(err, "data", err), $scope.alerts.main);
            }
        );

        $q.all({
            user: User.getUser(),
            recordIds: Domain.getRecordsIds($stateParams.productId, {
                fieldType: "A",
                subDomain: subDomainName
            })
        })
            .then((response) => {
                const recordsPromises = _.map(response.recordIds, (recordId) => Domain.getRecord($stateParams.productId, recordId));
                $scope.userInfos = response.user;

                $q.all(recordsPromises)
                    .then((recordIdsData) => {
                        $scope.selected.domain.ipLocation = null;
                        isCountryIp($scope.hosting.countriesIp, recordIdsData);

                        // Check IPv6
                        HostingDomain.getIPv6Configuration($scope.hosting.serviceName, $scope.selected.domain.name.replace(`.${$scope.hosting.serviceName}`, ""))
                            .then((records) => {
                                $scope.selected.domain.ipV6Enabled = _.some(records, (record) => $scope.hosting.clusterIpv6 === record.target);

                                if ($scope.selected.domain.ipV6Enabled) {
                                    $scope.selected.domain.ipLocation = "";
                                    $scope.selected.domain.ipV6Enabled = true;
                                }
                            })
                            .catch((err) => {
                                $scope.resetAction();
                                Alerter.alertFromSWS($scope.tr("hosting_tab_DOMAINS_configuration_add_loading_error"), _.get(err, "data", err), $scope.alerts.main);
                            });
                    })
                    .catch((err) => {
                        $scope.resetAction();
                        Alerter.alertFromSWS($scope.tr("hosting_tab_DOMAINS_configuration_add_loading_error"), _.get(err, "data", err), $scope.alerts.main);
                    }
                    )
                    .then(() => {
                        if ($scope.hosting.hasCdn && $scope.selected.domain.cdn !== "NONE") {
                            $scope.selected.domain.cdn = "ACTIVE";
                        }
                    });
            })
            .catch((err) => {
                $scope.resetAction();
                Alerter.alertFromSWS($scope.tr("hosting_tab_DOMAINS_configuration_add_loading_error"), _.get(err, "data", err), $scope.alerts.main);
            })
            .finally(() => {
                if ($scope.selected.ssl) {
                    $scope.selected.domain.ssl = true;
                }
            });

        HostingDomain.getAddDomainOptions($stateParams.productId)
            .then((options) => {
                $scope.availableDomains = options.availableDomains;
            })
            .catch((err) => {
                $scope.resetAction();
                Alerter.alertFromSWS($scope.tr("hosting_tab_DOMAINS_configuration_add_loading_error"), _.get(err, "data", err), $scope.alerts.main);
            });
    };

    $scope.getSelectedDomain = function (wwwNeeded) {
        let result = "";
        if (wwwNeeded) {
            result = $scope.selected.domainWww;
        } else {
            result = $scope.selected.domain.name;
        }
        return result;
    };

    $scope.getSelectedDomainToDisplay = function (wwwNeeded) {
        let result = "";
        if (wwwNeeded) {
            result = $scope.selected.domainWww;
        } else {
            result = $scope.selected.domain.displayName;
        }
        return result;
    };

    $scope.needWwwDomain = function () {
        return $scope.selected.domainWwwNeeded && $scope.selected.domain.name !== $scope.selected.domainWww && $scope.domainsAlreadyExists();
    };

    $scope.loadStep2 = function () {
        $scope.selected.pathFinal = $scope.getSelectedPath();
    };

    $scope.getSelectedPath = function () {
        let home;
        if ($scope.selected.domain.path !== null) {
            if (/^\/.*/.test($scope.selected.domain.path) || /^\.\/.*/.test($scope.selected.domain.path)) {
                home = $scope.selected.domain.path;
            } else {
                home = `./${$scope.selected.domain.path}`;
            }
        }
        return home;
    };

    const resultMessages = {
        OK: $scope.tr("hosting_tab_DOMAINS_configuration_modify_success"),
        PARTIAL: $scope.tr("hosting_tab_DOMAINS_configuration_modify_partial"),
        ERROR: $scope.tr("hosting_tab_DOMAINS_configuration_modify_failure")
    };

    $scope.submit = function () {
        $scope.resetAction();

        HostingDomain.modifyDomain(
            $scope.selected.domain.name,
            $scope.selected.pathFinal,
            $scope.selected.domainWwwNeeded,
            $scope.selected.domain.ipV6Enabled,
            $scope.selected.domain.cdn,
            $scope.selected.domain.ipLocation,
            $scope.selected.domain.firewall,
            $scope.selected.domain.ownLog === "ACTIVE" ? $scope.selected.ownLogDomain.name : null,
            !!$scope.selected.domain.ssl, // mandatory because it could be 0, 1, 2 or true/false
            $stateParams.productId
        )
            .then((data) => {
                Alerter.alertFromSWSBatchResult(resultMessages, data, $scope.alerts.main);
            })
            .catch((err) => {
                _.set(err, "type", err.type || "ERROR");
                Alerter.alertFromSWS($scope.tr("hosting_tab_DOMAINS_configuration_modify_failure"), _.get(err, "data", err), $scope.alerts.main);
            });
    };
});
