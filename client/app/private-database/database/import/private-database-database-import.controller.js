angular
    .module("App")
    .controller("PrivateDatabaseImportCtrl", class PrivateDatabaseImportCtrl {

        constructor ($rootScope, $scope, $stateParams, Alerter, PrivateDatabase, User) {
            this.$rootScope = $rootScope;
            this.$scope = $scope;
            this.$stateParams = $stateParams;
            this.alerter = Alerter;
            this.privateDatabaseService = PrivateDatabase;
            this.userService = User;
        }

        $onInit () {
            this.productId = this.$stateParams.productId;

            this.importScriptTag = {
                key: "WEB_HOSTING_DATABASE_IMPORT_SCRIPT",
                value: "true"
            };

            this.loading = {
                documents: false
            };

            this.model = {
                database: angular.copy(this.$scope.currentActionData),
                document: {
                    id: null
                },
                flushDatabase: false,
                sendEmail: true,
                newFileUploaded: false,
                actions: {
                    IMPORT_FROM_NEW: "IMPORT_FROM_NEW",
                    IMPORT_FROM_EXISTING: "IMPORT_FROM_EXISTING"
                }
            };

            this.file = {
                data: ""
            };

            this.selected = {
                action: null
            };

            this.$scope.importDatabase = () => this.importDatabase();
            this.$scope.getDocuments = () => this.getDocuments();
            this.$scope.resetDocumentSelection = () => this.resetDocumentSelection();
        }

        submit () {
            const file = this.file.data.meta;
            const filename = this.model.uploadFileName;
            this.isSendingFile = true;

            this.userService.uploadFile(filename, file, [this.importScriptTag])
                .then((id) => {
                    this.model.document.id = id;
                    this.atLeastOneFileHasBeenSend = true;
                })
                .finally(() => {
                    this.isSendingFile = false;
                });
        }

        getDocuments () {
            if (this.selected.action === this.model.actions.IMPORT_FROM_EXISTING) {
                this.loading.documents = true;
                this.userService.getDocuments()
                    .then((data) => {
                        const onlyImportScripts = [];

                        _.forEach(data, (document) => {
                            if (_.find(document.tags, { key: this.importScriptTag.key, value: this.importScriptTag.value })) {
                                onlyImportScripts.push(document);
                            }
                        });
                        this.model.documents = onlyImportScripts;
                    })
                    .catch((err) => {
                        this.alerter.alertFromSWS(this.$scope.tr("hosting_tab_DATABASES_table_popover_import_step1_load_documents_error"), _.get(err, "data", err), this.$scope.alerts.main);
                    })
                    .finally(() => {
                        this.loading.documents = false;
                    });
            }
        }

        importDatabase () {
            this.$scope.resetAction();

            this.privateDatabaseService.importDatabase(this.productId, this.model.database, this.model.document.id, this.model.flushDatabase, this.model.sendEmail)
                .then(() => {
                    this.alerter.success(this.$scope.tr("hosting_tab_DATABASES_table_popover_import_step3_succes"), this.$scope.alerts.main);
                })
                .catch((err) => {
                    this.alerter.alertFromSWS(this.$scope.tr("hosting_tab_DATABASES_table_popover_import_step3_fail"), _.get(err, "data", err), this.$scope.alerts.main);
                }
            );
        }

        isActionSelected () {
            return _.get(this.selected, "action", false);
        }

        isDocumentsValid () {
            return this.model.document.id != null;
        }

        resetDocumentSelection () {
            this.model.document.id = null;
            this.model.uploadFileName = null;
            this.file.data = "";
            this.atLeastOneFileHasBeenSend = false;
        }

        fileAsBeenSelected () {
            return this.file.data != null && !_.isEmpty(this.model.uploadFileName);
        }

        setFileName () {
            if (this.file.data.meta != null) {
                this.model.uploadFileName = this.file.data.meta.name;
            }
        }
});
