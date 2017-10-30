angular.module("App").controller("HostingEditOvhConfig", ($scope, $stateParams, HostingOvhConfig, $q, Hosting, User) => {
    "use strict";

    let currentConfig;

    $scope.model = {};
    $scope.loading = {
        init: false
    };
    $scope.toggle = {
        configCanBeSaved: false,
        unavailablePhpVersion: false,
        needFirstChoice: true,
        inRollbackProcess: true,
        configFlavour: null,
        process: null
    };
    $scope.apiStruct = null;
    $scope.ovhHistoricalConfigs = null;
    $scope.error = null;
    $scope.currentFlavourIsEdited = false;

    $scope.initWizard = function () {
        const queue = [];

        $scope.loading.init = true;

        User.getUrlOf("guides")
            .then((guides) => {
                $scope.phpAppendicesGuide = guides.phpAppendices;
                $scope.hostingPhpGuide = guides.hostingPhpConfiguration;
            });

        queue.push(
            Hosting.getModels()
                .then((struct) => {
                    $scope.apiStruct = {
                        models: struct.models
                    };
                })
        );

        queue.push(
            HostingOvhConfig.getHistoric($stateParams.productId)
                .then((ovhHistoricalConfigs) => {
                    $scope.ovhHistoricalConfigs = ovhHistoricalConfigs;
                })
        );

        queue.push(
            HostingOvhConfig.get($stateParams.productId)
                .then((conf) => {
                    currentConfig = conf;
                })
        );

        $q.all(queue).finally(() => {
            $scope.loading.init = false;
            if ($scope.ovhHistoricalConfigs && $scope.ovhHistoricalConfigs.length > 0) {
                $scope.toggle.needFirstChoice = true;
                $scope.toggle.configFlavour = $scope.ovhHistoricalConfigs[0];
                $scope.flavourChanged();
            } else {
                $scope.setUpdateProcess();
            }
        });
    };

    $scope.checkCohesion = function () {
        if ($scope.toggle.needFirstChoice) {
            return;
        }

        if ($scope.toggle.inRollbackProcess) {
            $scope.toggle.configCanBeSaved = true;
        } else if ($scope.apiStruct.models["hosting.web.ovhConfig.AvailableEngineVersionEnum"].enum.indexOf($scope.model.engineVersion) !== -1) {
            $scope.toggle.unavailablePhpVersion = false;
            $scope.toggle.configCanBeSaved = true;
        } else {
            $scope.toggle.unavailablePhpVersion = true;
            $scope.toggle.configCanBeSaved = false;
        }
    };

    $scope.flavourChanged = function (ovhConfig = $scope.toggle.configFlavour) {
        clearsDisplayedError();

        $scope.currentFlavourIsEdited = false;
        $scope.model.engineName = ovhConfig.engineName;
        $scope.model.engineVersion = ovhConfig.engineVersion;
        $scope.model.environment = ovhConfig.environment;
        $scope.model.httpFirewall = ovhConfig.httpFirewall;
        $scope.model.container = ovhConfig.container || "stable"; // default value

        $scope.checkCohesion();
    };

    $scope.flavourUpdated = function () {
        clearsDisplayedError();

        $scope.currentFlavourIsEdited = true;
        $scope.checkCohesion();
    };

    $scope.parseLabel = function (label) {
        return label.replace(".", "_");
    };

    function clearsDisplayedError () {
        $scope.toggle.error = null;
        $scope.toggle.notDefinedError = false;
    }

    function displayError (err) {
        clearsDisplayedError();

        if (err && err.message) {
            $scope.toggle.error = err.message;
            $scope.toggle.notDefinedError = false;
        } else {
            $scope.toggle.error = null;
            $scope.toggle.notDefinedError = true;
        }
    }

    function changeConfig (model) {
        return HostingOvhConfig.changeConfiguration($stateParams.productId, model);
    }

    function rollbackConfig (currentId, idToRollback) {
        return HostingOvhConfig.rollbackConfig($stateParams.productId, currentId, idToRollback);
    }

    function closeWizardOnSuccess () {
        $scope.$emit(HostingOvhConfig.events.ovhConfigNeedRefresh);
        $scope.resetAction();
    }

    $scope.saveConfig = function () {
        let model;

        $scope.toggle.configCanBeSaved = true;

        if ($scope.currentFlavourIsEdited) {
            model = angular.copy($scope.model);
            model.id = currentConfig.id;
            changeConfig(model).then(closeWizardOnSuccess, (err) => {
                $scope.checkCohesion();
                displayError(err);
            });
        } else {
            rollbackConfig(currentConfig.id, $scope.toggle.configFlavour.id).then(closeWizardOnSuccess, (err) => {
                $scope.checkCohesion();
                displayError(err);
            });
        }
    };

    $scope.setProcess = function () {
        if ($scope.toggle.process === "rollback") {
            $scope.toggle.inRollbackProcess = true;
            $scope.toggle.needFirstChoice = false;
            $scope.checkCohesion();
        } else {
            $scope.flavourChanged(currentConfig);
            $scope.toggle.inRollbackProcess = false;
            $scope.toggle.needFirstChoice = false;
        }
    };
});
