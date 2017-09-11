/* global angular*/
angular.module("App").controller("HostingAutomatedEmailsRequestCtrl", ($scope, $stateParams, HostingAutomatedEmails, Alerter) => {
    "use strict";

    $scope.automatedEmails = angular.copy($scope.currentActionData.automatedEmails);
    $scope.action = $scope.currentActionData.action;
    $scope.title = {
        BLOCK: $scope.tr("hosting_tab_AUTOMATED_EMAILS_block_title"),
        UNBLOCK: $scope.tr("hosting_tab_AUTOMATED_EMAILS_unblock_title"),
        PURGE: $scope.tr("hosting_tab_AUTOMATED_EMAILS_purge_title")
    };

    $scope.loaders = {
        loading: false
    };

    //---------------------------------------------
    // REQUEST
    //---------------------------------------------
    $scope.request = function () {
        $scope.loaders.loading = true;

        HostingAutomatedEmails.postRequest($stateParams.productId, $scope.action)
            .then(
                () => {
                    Alerter.success($scope.tr("hosting_tab_AUTOMATED_EMAILS_request_success"), $scope.alerts.dashboard);
                },
                (err) => {
                    Alerter.alertFromSWS($scope.tr("hosting_tab_AUTOMATED_EMAILS_request_error"), err, $scope.alerts.dashboard);
                }
            )
            .finally(() => {
                $scope.loaders.loading = false;
                $scope.resetAction();
            });
    };
});
