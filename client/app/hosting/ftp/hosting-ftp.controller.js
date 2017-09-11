angular.module("App").controller("HostingTabFTPCtrl", ($scope, $stateParams, Hosting, HostingUser, Alerter) => {
    "use strict";

    $scope.ftpInformations = null;
    $scope.primaryUserEnabled = null;
    $scope.allowUpdateState = true;
    $scope.displayRestoreFtp = true;
    $scope.hasResult = false;
    $scope.search = {
        text: null
    };
    $scope.edit = {
        active: false
    };
    $scope.loading = {
        ftp: false,
        init: true
    };

    function loadTab (count, offset, needUsers) {
        Hosting.getTabFTP($stateParams.productId, count, offset, needUsers, $scope.search.text)
            .then((ftpInformations) => {
                if (!_.isEmpty(ftpInformations.list.results)) {
                    const firstUserCredentials = ftpInformations.list.results[0].serviceManagementCredentials;
                    $scope.hasResult = true;
                    $scope.firstUser = {
                        ftp: firstUserCredentials.ftp,
                        ftpUrl: `ftp://${firstUserCredentials.ftp.user}@${firstUserCredentials.ftp.url}:${firstUserCredentials.ftp.port}/`,
                        ssh: firstUserCredentials.ssh,
                        sshUrl: `ssh://${firstUserCredentials.ssh.user}@${firstUserCredentials.ssh.url}:${firstUserCredentials.ssh.port}/`
                    };
                }

                for (const user of ftpInformations.list.results) {
                    user.ftp = user.serviceManagementCredentials.ftp;
                    user.ftpUrl = `ftp://${user.serviceManagementCredentials.ftp.user}@${user.serviceManagementCredentials.ftp.url}:${user.serviceManagementCredentials.ftp.port}/`;
                    user.ssh = user.serviceManagementCredentials.ssh;
                    user.sshUrl = `ssh://${user.serviceManagementCredentials.ssh.user}@${user.serviceManagementCredentials.ssh.url}:${user.serviceManagementCredentials.ssh.port}/`;
                }

                $scope.primaryUserEnabled = ftpInformations.list.results.length && ftpInformations.list.results[0].isPrimaryAccount ? ftpInformations.list.results[0].state === "RW" : null;
                $scope.ftpInformations = ftpInformations;
            }).finally(() => {
                $scope.loading.init = false;
                $scope.loading.ftp = false;
            });

        Hosting.getSelected($stateParams.productId).then((hosting) => {
            // backup snapshots are made at least one day after service creation, so hide backup option in the meantime
            if (moment(hosting.creation).isAfter(moment().subtract(1, "days"))) {
                $scope.displayRestoreFtp = false;
            }
        });
    }

    function startPolling () {
        HostingUser.getTasks($stateParams.productId, {
            params: { "function": "user/update" }
        }).then((tasks) => {
            HostingUser.pollState($stateParams.productId, {
                id: tasks[0],
                successSates: ["done", "cancelled"],
                namespace: "hosting.web.ftp.user.poll"
            });
        });

        HostingUser.getTasks($stateParams.productId, {
            params: { "function": "web/restoreSnapshot" }
        }).then((tasks) => {
            if (tasks.length > 0) {
                $scope.disableRestoreFtp = true;
            }
        });
    }

    $scope.loadFtpInformations = (count, offset) => {
        $scope.loading.ftp = true;
        loadTab(count, offset, true);
    };

    $scope.openFtpExplorer = () => {
        window.open($scope.ftpInformations.ftpExplorer, "_blank");
    };

    $scope.$on(Hosting.events.tabFtpRefresh, () => {
        $scope.loading.init = true;
        $scope.hasResult = false;
        $scope.$broadcast("paginationServerSide.reload");
    });

    $scope.$on(Hosting.events.tasksChanged, () => {
        $scope.disableRestoreFtp = true;
    });

    $scope.refreshTable = () => {
        $scope.$broadcast("paginationServerSide.reload");
    };

    $scope.deleteUser = (user) => {
        if (user.login !== $scope.ftpInformations.primaryLogin) {
            $scope.setAction("ftp/user/delete/hosting-ftp-user-delete", user.login);
        }
    };

    $scope.modifyUser = (user) => {
        $scope.setAction("ftp/user/update/hosting-ftp-user-update", { user: _.omit(user, "ssh", "ftp", "ftpUrl", "sshUrl"), ftpInformations: $scope.ftpInformations });
    };

    $scope.updateUserPassword = (user) => {
        $scope.setAction("ftp/password-update/hosting-ftp-password-update", user.login);
    };

    $scope.updatePrimaryLoginState = (element, prev) => {
        const user = angular.copy(element);
        delete user.isPrimaryAccount;

        HostingUser.updateUser($stateParams.productId, { login: user.login, data: _.omit(user, "ssh", "ftp", "ftpUrl", "sshUrl") }).then(
            () => {
                Alerter.success($scope.tr("hosting_tab_FTP_configuration_user_modify_success"), $scope.alerts.dashboard);
                startPolling();
            },
            (err) => {
                const idx = _.indexOf($scope.ftpInformations.list.result, element);
                $scope.ftpInformations.list.result[idx] = _.assign(element, prev);
                Alerter.alertFromSWS($scope.tr("hosting_tab_FTP_configuration_user_modify_fail"), err, $scope.alerts.dashboard);
            }
        );
    };

    $scope.$on("hosting.web.ftp.user.poll.start", () => {
        $scope.allowUpdateState = false;
    });

    $scope.$on("hosting.web.ftp.user.poll.done", () => {
        $scope.allowUpdateState = true;
        Alerter.resetMessage($scope.alerts.dashboard);
    });

    loadTab(10, 0, false);

    function reloadCurrentPage () {
        if (!$scope.loading.ftp) {
            $scope.$broadcast("paginationServerSide.reload");
        }
    }

    $scope.$watch(
        "search.text",
        (newValue) => {
            if ($scope.search.text !== null) {
                if ($scope.search.text === "") {
                    reloadCurrentPage();
                } else if ($scope.search.text === newValue) {
                    reloadCurrentPage();
                }
            }
        },
        true
    );

    $scope.password = { value: null };
    $scope.condition = Hosting.getPasswordConditions();
    $scope.changePassword = () => {
        HostingUser.changePassword($stateParams.productId, $scope.ftpInformations.primaryLogin, $scope.password.value)
            .then(
                () => {
                    Alerter.success($scope.tr("hosting_tab_FTP_configuration_change_password_success"), $scope.alerts.dashboard);
                },
                (err) => {
                    Alerter.alertFromSWS($scope.tr("hosting_tab_FTP_configuration_change_password_fail", [$scope.login]), err.data, $scope.alerts.dashboard);
                }
            )
            .finally(() => {
                $scope.password.value = null;
            });
    };

    $scope.isPasswordValid = () => Hosting.isPasswordValid($scope.password.value);

    $scope.$on("$destroy", () => {
        HostingUser.killAllPolling({
            namespace: "hosting.web.ftp.user.poll"
        });
    });

    startPolling();
});
