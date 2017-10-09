angular.module("App").controller("HostingFtpUserModifyCtrl", ($scope, $stateParams, Alerter, Hosting, HostingUser) => {
    "use strict";

    $scope.model = {
        user: $scope.currentActionData.user,
        userLogin: $scope.currentActionData.user.login,
        os: {
            LINUX: "linux",
            WINDOWS: "windows"
        },
        capabilities: null,
        operatingSystem: $scope.currentActionData.ftpInformations.operatingSystem
    };

    $scope.classes = {
        homeInvalid: ""
    };

    $scope.load = function () {
        HostingUser.getUserCreationCapabilities().then(
            (capabilities) => {
                $scope.model.capabilities = capabilities;
            },
            (data) => {
                Alerter.alertFromSWS($scope.tr("hosting_tab_FTP_configuration_user_modify_step1_loading_error"), data.data, $scope.alerts.dashboard);
            }
        );
    };

    $scope.isPathValid = function () {
        return Hosting.constructor.isPathValid($scope.model.user.home);
    };

    $scope.isStep1Valid = function () {
        return $scope.model.user.state !== null && $scope.isPathValid();
    };

    $scope.$watch("model.user.home", () => {
        if ($scope.model.user.home) {
            $scope.classes.homeInvalid = $scope.isPathValid() ? "" : "error";
        } else {
            $scope.classes.homeInvalid = "";
        }
    });

    $scope.$watch("model.user.state", () => {
        if ($scope.model.user.state && $scope.model.user.state === "off") {
            $scope.model.user.sshState = "none";
        }
    });

    $scope.getSelectedHome = function () {
        let home;
        if ($scope.model.user.home !== null) {
            if (/^\/.*/.test($scope.model.user.home) || $scope.model.user.isPrimaryAccount) {
                home = $scope.model.user.home;
            } else {
                home = `./${$scope.model.user.home}`;
            }
        }
        return home;
    };

    $scope.modifyUser = function () {
        $scope.resetAction();
        const user = angular.copy($scope.model.user);
        delete user.isPrimaryAccount;

        HostingUser.updateUser($stateParams.productId, { login: $scope.model.userLogin, data: user }).then(
            () => {
                Alerter.success($scope.tr("hosting_tab_FTP_configuration_user_modify_success"), $scope.alerts.dashboard);
            },
            (err) => {
                Alerter.alertFromSWS($scope.tr("hosting_tab_FTP_configuration_user_modify_fail"), err, $scope.alerts.dashboard);
            }
        );
    };
});
