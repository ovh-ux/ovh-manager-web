angular.module("App").controller("HostingDatabaseImportCtrl", function ($scope, $rootScope, $stateParams, HostingDatabase, User, Alerter) {
    "use strict";

    const self = this;
    this.importScriptTag = {
        key: "WEB_HOSTING_DATABASE_IMPORT_SCRIPT",
        value: "true"
    };

    $scope.model = {
        database: angular.copy($scope.currentActionData),
        document: {
            id: null
        },
        flushDatabase: false,
        sendEmail: true,
        newFileUploaded: false,
        uploadFileName: null,
        actions: {
            IMPORT_FROM_NEW: "IMPORT_FROM_NEW",
            IMPORT_FROM_EXISTING: "IMPORT_FROM_EXISTING"
        }
    };

    $scope.isSendingFile = false;

    $scope.file = {
        data: null
    };

    $scope.selected = {
        action: null
    };

    $scope.init = function () {
        // TODO: Optimization of request with apiv7 beacause we only need document name and id for populating the list
        // instead of getting all documents and apply a filter afterward.
        User.getDocuments().then(
            (data) => {
                const onlyImportScripts = [];

                data.forEach((document) => {
                    if (_.find(document.tags, { key: self.importScriptTag.key, value: self.importScriptTag.value })) {
                        onlyImportScripts.push(document);
                    }
                });

                $scope.model.documents = onlyImportScripts;
            },
            (data) => {
                Alerter.alertFromSWS($scope.tr("hosting_tab_DATABASES_table_popover_import_step1_load_documents_error"), data.data, $scope.alerts.dashboard);
            }
        );
    };

    $scope.fileAsBeenSelected = function () {
        return $scope.file.data != null && !_.isEmpty($scope.model.uploadFileName);
    };

    $scope.setFileName = function () {
        if ($scope.file.data.meta != null) {
            $scope.model.uploadFileName = $scope.file.data.meta.name;
        }
    };

    $scope.submit = function () {
        const tags = [{ key: "WEB_HOSTING_DATABASE_IMPORT_SCRIPT", value: "true" }];
        const file = $scope.file.data.meta;
        const filename = $scope.model.uploadFileName;
        $scope.isSendingFile = true;

        User.uploadFile(filename, file, tags)
            .then((id) => {
                if ($scope.model.document == null) {
                    $scope.model.document = {};
                }

                $scope.model.document.id = id;
                $scope.atLeastOneFileHasBeenSend = true;
            })
            .finally(() => {
                $scope.isSendingFile = false;
            });
    };

    $scope.isStep2Ok = function () {
        return $scope.model.document.id != null;
    };


    $scope.importDatabase = function () {
        $scope.resetAction();

        HostingDatabase.importDatabase($stateParams.productId, $scope.model.database, $scope.model.document.id, $scope.model.flushDatabase, $scope.model.sendEmail).then(
            () => {
                Alerter.success($scope.tr("hosting_tab_DATABASES_table_popover_import_step3_succes"), $scope.alerts.dashboard);
            },
            (data) => {
                Alerter.alertFromSWS($scope.tr("hosting_tab_DATABASES_table_popover_import_step3_fail"), data.data, $scope.alerts.dashboard);
            }
        );
    };

    $scope.resetDocumentSelection = function () {
        $scope.model.document = null;
    };
});
