angular.module("App").controller("HostingUserLogsCreateCtrl", ($scope, $stateParams, Alerter, Hosting) => {
    "use strict";

    $scope.model = {
        maxUserLength: 200,
        minUserLength: 1,
        selected: {
            login: null,
            description: "",
            password: {
                value: null,
                confirmation: null
            }
        }
    };

    $scope.classes = {
        descInvalid: ""
    };

    $scope.isUserValid = function () {
        return $scope.model.selected.login && $scope.model.selected.login.length >= $scope.model.minUserLength && $scope.model.selected.login.length <= $scope.model.maxUserLength && $scope.model.selected.login.match(/^[a-z-]+$/);
    };

    $scope.isStep1Valid = function () {
        return $scope.isUserValid();
    };

    $scope.isPasswordValid = function () {
        return (
            $scope.model.selected.password.value && $scope.model.selected.password.confirmation && $scope.model.selected.password.value === $scope.model.selected.password.confirmation && Hosting.constructor.isPasswordValid($scope.model.selected.password.value)
        );
    };

    $scope.shouldDisplayDifferentPasswordMessage = function () {
        return $scope.model.selected.password.value && $scope.model.selected.password.confirmation && $scope.model.selected.password.value !== $scope.model.selected.password.confirmation;
    };

    $scope.condition = Hosting.constructor.getPasswordConditions();

    $scope.isPasswordInvalid = function () {
        return !Hosting.constructor.isPasswordValid(_.get($scope.model, "selected.password.value", ""));
    };

    $scope.isPasswordConfirmationInvalid = function () {
        return $scope.model.selected.password.value !== $scope.model.selected.password.confirmation;
    };

    $scope.createUser = function () {
        $scope.resetAction();
        Hosting.userLogsCreate($stateParams.productId, $scope.model.selected.description, $scope.model.selected.login, $scope.model.selected.password.value).then(
            () => {
                Alerter.success($scope.tr("hosting_tab_USER_LOGS_configuration_user_create_success"), $scope.alerts.dashboard);
            },
            (data) => {
                Alerter.alertFromSWS($scope.tr("hosting_tab_USER_LOGS_configuration_user_create_fail"), data.data, $scope.alerts.dashboard);
            }
        );
    };
});
