angular.module("App").controller("HostingUserLogsUpdatePasswordCtrl", ($scope, $stateParams, Hosting, Alerter) => {
    "use strict";

    $scope.login = $scope.currentActionData;
    $scope.password = {
        value: null,
        confirmation: null
    };

    $scope.shouldDisplayDifferentPasswordMessage = () => $scope.password.value && $scope.password.confirmation && $scope.password.value !== $scope.password.confirmation;

    $scope.condition = Hosting.constructor.getPasswordConditions();

    $scope.isPasswordValid = () => $scope.password.value && $scope.password.confirmation && $scope.password.value === $scope.password.confirmation && Hosting.constructor.isPasswordValid($scope.password.value);

    $scope.isPasswordInvalid = () => !Hosting.constructor.isPasswordValid(_.get($scope.password, "value", ""));

    $scope.isPasswordConfirmationInvalid = () => $scope.password.value !== $scope.password.confirmation;

    $scope.updatePassword = () => {
        $scope.resetAction();
        Hosting.userLogsChangePassword($stateParams.productId, $scope.login, $scope.password.value).then(
            () => {
                Alerter.success($scope.tr("hosting_tab_USER_LOGS_configuration_change_password_success"), $scope.alerts.dashboard);
            },
            (err) => {
                Alerter.alertFromSWS($scope.tr("hosting_tab_USER_LOGS_configuration_change_password_fail", [$scope.login]), err.data, $scope.alerts.dashboard);
            }
        );
    };
});
