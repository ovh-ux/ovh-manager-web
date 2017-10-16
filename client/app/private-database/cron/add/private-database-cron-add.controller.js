angular.module("App").controller("PrivateDatabaseCronCreateCtrl", [
    "$scope",
    "$rootScope",
    "$stateParams",
    "$q",
    "Alerter",
    "translator",
    "PrivateDatabase",
    "PrivateDatabaseCron",
    "CronValidator",

    function ($scope, $rootScope, $stateParams, $q, Alerter, translator, PrivateDatabase, PrivateDatabaseCron, CronValidator) {
        "use strict";

        const actionData = angular.copy($scope.currentActionData); // For edition

        $scope.loading = {
            init: false
        };

        $scope.model = {
            emailSelect: "no"
        };

        // Object used to communicate with the cronEditor directive. See definition in cronEditor.controller.js.
        $scope.crontabObject = new (CronValidator.makeCrontabObject())();

        $scope.isValid = function (step) {
            switch (step) {
            case 1:
                return $scope.model.command && ($scope.model.emailSelect === "other" ? $scope.model.email : true) && $scope.model.databaseName;
            case 2:
                return $scope.crontabObject.isValid && $scope.crontabObject.isValid();
            default:
                return null;
            }
        };

        /*= =========  Final step  ==========*/

        $scope.generateCron = function () {
            $scope.model.frequency = $scope.crontabObject.getCrontab();
        };

        $scope.getEmailResume = function () {
            let emailSelect = $scope.model.emailSelect;
            if (emailSelect === "no") {
                emailSelect = $scope.tr(`common_${$scope.model.emailSelect}`);
            }
            return $scope.model.emailSelect === "other" ? $scope.model.email : emailSelect;
        };

        function resetCronTab () {
            $rootScope.$broadcast(PrivateDatabaseCron.events.tabCronRefresh);
        }

        $scope.saveCron = function () {
            $scope.loading.validation = true;

            // Set email value
            if ($scope.model.emailSelect !== "other") {
                $scope.model.email = $scope.model.emailSelect;
            }

            // Add or Edit
            if (actionData.cron) {
                PrivateDatabaseCron.editCron($stateParams.productId, actionData.cron.id, $scope.model)
                    .then(() => {
                        Alerter.alertFromSWS(translator.tr("hosting_tab_CRON_edit_success"), { idTask: 42, state: "OK" }, $scope.alerts.main);
                        $scope.resetAction();
                        resetCronTab();
                    })
                    .catch((err) => {
                        Alerter.alertFromSWS(translator.tr("hosting_tab_CRON_edit_error", [actionData.cron.id]), _.get(err, "data", err), $scope.alerts.main);
                        $scope.resetAction();
                    });
            } else {
                PrivateDatabaseCron.createCron($stateParams.productId, $scope.model)
                    .then(() => {
                        Alerter.alertFromSWS(translator.tr("hosting_tab_CRON_save_success"), { idTask: 42, state: "OK" }, $scope.alerts.main);
                        $scope.resetAction();
                        resetCronTab();
                    })
                    .catch((err) => {
                        Alerter.alertFromSWS(translator.tr("hosting_tab_CRON_save_error"), _.get(err, "data", err), $scope.alerts.main);
                        $scope.resetAction();
                    });
            }
        };

        $scope.trEnum = function (str) {
            return PrivateDatabaseCron.constructor.trEnum(str);
        };

        /*= =========  INIT  ==========*/

        function initModel () {
            if (actionData.cron) {
                initEditionMode();
            }
            if (actionData.databaseName) {
                $scope.model.databaseName = actionData.databaseName;
            }
            if ($scope.commandEnum.length === 1) {
                $scope.model.command = $scope.commandEnum[0];
            }
        }

        function initEditionMode () {
            $scope.model.command = actionData.cron.command;
            $scope.model.databaseName = actionData.cron.databaseName;
            $scope.model.description = actionData.cron.description;
            $scope.model.status = actionData.cron.status;
            switch (actionData.cron.email) {
            case "no":
            case "nic-admin":
            case "nic-tech":
                $scope.model.emailSelect = actionData.cron.email;
                break;
            default:
                $scope.model.emailSelect = "other";
                $scope.model.email = actionData.cron.email;
            }

            $scope.crontabObject.setCrontab(actionData.cron.frequency);
        }

        $scope.init = function () {
            $scope.loading.init = true;
            $scope.title = actionData.cron ? translator.tr("hosting_tab_CRON_configuration_edit_title_button") : translator.tr("hosting_tab_CRON_configuration_create_title_button");

            const getBDDSIdPromise = PrivateDatabase.getBDDSId($stateParams.productId).then(
                (databaseNames) => {
                    $scope.databaseNames = databaseNames;
                },
                (err) => {
                    Alerter.alertFromSWS($scope.tr("hosting_tab_CRON_configuration_delete_fail"), _.get(err, "data", err), $scope.alerts.main);
                    $scope.resetAction();
                }
            );

            const getModelsPromise = PrivateDatabase.getModels()
                .then((models) => {
                    $scope.statusEnum = models["hosting.PrivateDatabase.Cron.StatusEnum"].enum;
                    $scope.commandEnum = models["hosting.PrivateDatabase.Cron.CommandEnum"].enum;
                })
                .catch((err) => {
                    Alerter.alertFromSWS($scope.tr("hosting_tab_CRON_configuration_delete_fail"), _.get(err, "data", err), $scope.alerts.main);
                    $scope.resetAction();
                });

            $q.all([getBDDSIdPromise, getModelsPromise]).then(() => {
                initModel();
                $scope.loading.init = false;
            });
        };
    }
]);
