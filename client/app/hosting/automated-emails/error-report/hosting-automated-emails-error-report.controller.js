/* global angular*/
angular.module("App").controller("HostingAutomatedEmailsErrReportsCtrl", ($scope, $stateParams, HostingAutomatedEmails, Alerter) => {
    "use strict";

    $scope.automatedEmails = angular.copy($scope.currentActionData.automatedEmails);

    $scope.loaders = {
        loading: false
    };

    //---------------------------------------------
    // SUBMIT
    //---------------------------------------------
    $scope.submit = function () {
        $scope.loaders.loading = true;

        HostingAutomatedEmails.putEmail($stateParams.productId, $scope.automatedEmails.email)
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
