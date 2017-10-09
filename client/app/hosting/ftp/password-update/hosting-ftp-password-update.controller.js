angular.module("App").controller("HostingFtpUserUpdatePasswordCtrl", ($scope, $stateParams, Hosting, HostingUser, Alerter) => {
    "use strict";

    $scope.login = $scope.currentActionData;
    $scope.password = {
        value: null,
        confirmation: null
    };

    $scope.condition = Hosting.constructor.getPasswordConditions();

    $scope.isPasswordValid = () => $scope.password.value && $scope.password.confirmation && $scope.password.value === $scope.password.confirmation && Hosting.constructor.isPasswordValid($scope.password.value);

    $scope.getPasswordInvalidClass = () => !Hosting.constructor.isPasswordValid(_.get($scope.password, "value"));

    $scope.getPasswordConfirmationInvalidClass = () => $scope.password.value !== $scope.password.confirmation;

    $scope.updatePassword = function () {
        $scope.resetAction();
        HostingUser.changePassword($stateParams.productId, $scope.login, $scope.password.value).then(
            () => {
                Alerter.success($scope.tr("hosting_tab_FTP_configuration_change_password_success"), $scope.alerts.dashboard);
            },
            (data) => {
                Alerter.alertFromSWS($scope.tr("hosting_tab_FTP_configuration_change_password_fail", [$scope.login]), data.data, $scope.alerts.dashboard);
            }
        );
    };
});
