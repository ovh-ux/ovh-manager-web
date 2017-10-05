angular.module("App").controller("HostingDatabaseChangePasswordCtrl", ($scope, $stateParams, HostingDatabase, Hosting, Alerter) => {
    "use strict";

    $scope.databaseName = $scope.currentActionData;
    $scope.password = {
        value: null,
        confirmation: null
    };
    $scope.customPasswordConditions = {
        max: 12
    };

    $scope.shouldDisplayDifferentPasswordMessage = function () {
        return $scope.password.value && $scope.password.confirmation && $scope.password.value !== $scope.password.confirmation;
    };

    $scope.condition = Hosting.constructor.getPasswordConditions($scope.customPasswordConditions);

    $scope.isPasswordValid = function () {
        return $scope.password.value && $scope.password.confirmation && $scope.password.value === $scope.password.confirmation && Hosting.constructor.isPasswordValid($scope.password.value, $scope.customPasswordConditions);
    };

    $scope.isPasswordInvalid = function () {
        return !Hosting.constructor.isPasswordValid(_.get($scope.password, "value"), $scope.customPasswordConditions);
    };

    $scope.isPasswordConfirmationInvalid = function () {
        return $scope.password.value !== $scope.password.confirmation;
    };

    $scope.updatePassword = function () {
        $scope.resetAction();
        HostingDatabase.changePassword($stateParams.productId, $scope.databaseName, $scope.password.value).then(
            (data) => {
                Alerter.alertFromSWS($scope.tr("hosting_tab_DATABASES_configuration_update_password_success"), data, $scope.alerts.dashboard);
            },
            (data) => {
                Alerter.alertFromSWS($scope.tr("hosting_tab_DATABASES_configuration_update_password_fail", [$scope.databaseName]), data.data, $scope.alerts.dashboard);
            }
        );
    };
});
