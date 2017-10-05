angular.module("App").controller("HostingFtpUserCreateCtrl", ($scope, $stateParams, Alerter, Hosting, HostingUser) => {
    "use strict";

    $scope.model = {
        os: {
            LINUX: "linux",
            WINDOWS: "windows"
        },
        capabilities: null,
        maxUserLength: 20 - $scope.currentActionData.primaryLogin.length - 1,
        minUserLength: 1,
        operatingSystem: $scope.currentActionData.operatingSystem,
        primaryLogin: $scope.currentActionData.primaryLogin,
        selected: {
            login: null,
            home: null,
            password: {
                value: null,
                confirmation: null
            }
        }
    };

    $scope.load = () => {
        HostingUser.getUserCreationCapabilities()
            .then((capabilities) => {
                $scope.model.capabilities = capabilities;
            })
            .catch((err) => {
                Alerter.alertFromSWS($scope.tr("hosting_tab_FTP_configuration_user_create_step1_loading_error"), err.data, $scope.alerts.dashboard);
            });
    };

    $scope.isUserValid = () =>
        $scope.model.selected.login != null && $scope.model.selected.login.length >= $scope.model.minUserLength && $scope.model.selected.login.length <= $scope.model.maxUserLength && $scope.model.selected.login.match(/^[\w]+$/);

    $scope.isStep1Valid = () => $scope.isUserValid() && $scope.isPathValid();

    $scope.isPathValid = () => Hosting.constructor.isPathValid($scope.model.selected.home);

    $scope.isPasswordValid = () =>
        $scope.model.selected.password.value && $scope.model.selected.password.confirmation && $scope.model.selected.password.value === $scope.model.selected.password.confirmation && Hosting.constructor.isPasswordValid($scope.model.selected.password.value);

    $scope.condition = Hosting.constructor.getPasswordConditions();

    $scope.getPasswordInvalidClass = () => !Hosting.constructor.isPasswordValid(_.get($scope.model, "selected.password.value"));

    $scope.getPasswordConfirmationInvalidClass = () => $scope.model.selected.password.value !== $scope.model.selected.password.confirmation;

    $scope.getSelectedHome = () => {
        let home = "/";
        if ($scope.model.selected.home !== null) {
            if (/^\/.*/.test($scope.model.selected.home) || /^\.\/.*/.test($scope.model.selected.home)) {
                home = $scope.model.selected.home;
            } else {
                home = `./${$scope.model.selected.home}`;
            }
        }
        return home;
    };

    $scope.createUser = () => {
        $scope.resetAction();
        HostingUser.addUser($stateParams.productId, `${$scope.model.primaryLogin}-${$scope.model.selected.login}`, $scope.model.selected.password.value, $scope.getSelectedHome())
            .then(() => {
                Alerter.success($scope.tr("hosting_tab_FTP_configuration_user_create_success"), $scope.alerts.dashboard);
            })
            .catch((err) => {
                Alerter.alertFromSWS($scope.tr("hosting_tab_FTP_configuration_user_create_fail"), err, $scope.alerts.dashboard);
            });
    };
});
