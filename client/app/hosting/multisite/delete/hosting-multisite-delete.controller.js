angular.module("App").controller("HostingRemoveDomainCtrl", ($scope, $stateParams, HostingDomain, Alerter) => {
    "use strict";

    $scope.selected = {
        autoconfigure: true,
        domain: $scope.currentActionData,
        wwwNeeded: false
    };
    $scope.model = {
        domains: null
    };

    $scope.loadHosting = function () {
        HostingDomain.getExistingDomains($stateParams.productId, false).then(
            (data) => {
                $scope.model.domains = data.existingDomains;
            },
            (failure) => {
                $scope.resetAction();
                Alerter.alertFromSWS($scope.tr("hosting_tab_DOMAINS_configuration_remove_step1_loading_error"), failure.data, $scope.alerts.dashboard);
            }
        );
    };

    const resultMessages = {
        OK: $scope.tr("hosting_tab_DOMAINS_configuration_remove_!success"),
        PARTIAL: $scope.tr("hosting_tab_DOMAINS_configuration_remove_partial"),
        ERROR: $scope.tr("hosting_tab_DOMAINS_configuration_remove_failure")
    };

    $scope.submit = function () {
        $scope.resetAction();
        HostingDomain.removeDomain($stateParams.productId, $scope.selected.domain.name, $scope.selected.wwwNeeded, $scope.selected.autoconfigure).then(
            (data) => {
                Alerter.alertFromSWSBatchResult(resultMessages, data, $scope.alerts.dashboard);
                $scope.selected.domain.isUpdating = true;
            },
            (failure) => {
                Alerter.alertFromSWS($scope.tr("hosting_tab_DOMAINS_configuration_remove_failure"), failure.data, $scope.alerts.dashboard);
            }
        );
    };

    $scope.domainsWwwExists = function () {
        if ($scope.model.domains && $scope.model.domains.indexOf(`www.${$scope.selected.domain.name}`) !== -1) {
            return true;
        }
        return false;
    };
});
