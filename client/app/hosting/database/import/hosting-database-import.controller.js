angular.module("App").controller(
    "HostingDatabaseImportCtrl",
    class HostingDatabaseImportCtrl {
        constructor ($scope, $rootScope, $stateParams, Alerter, HostingDatabase, User) {
            this.$scope = $scope;
            this.$rootScope = $rootScope;
            this.$stateParams = $stateParams;
            this.Alerter = Alerter;
            this.HostingDatabase = HostingDatabase;
            this.User = User;
        }

        $onInit () {
            this.file = {
                data: null
            };
            this.importScriptTag = {
                key: "WEB_HOSTING_DATABASE_IMPORT_SCRIPT",
                value: "true"
            };
            this.isSendingFile = false;
            this.model = {
                database: angular.copy(this.$scope.currentActionData),
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
            this.selected = {
                action: null
            };

            this.$scope.importDatabase = () => this.importDatabase();
            this.$scope.getDocuments = () => this.getDocuments();
            this.$scope.resetDocumentSelection = () => this.resetDocumentSelection();
        }

        getDocuments () {
            if (this.selected.action === this.model.actions.IMPORT_FROM_EXISTING) {
                // TODO: Optimization of request with apiv7 beacause we only need document name and id for populating the list
                // instead of getting all documents and apply a filter afterward.
                this.User.getDocuments()
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
                        this.Alerter.alertFromSWS(this.$scope.tr("hosting_tab_DATABASES_table_popover_import_step1_load_documents_error"), _.get(err, "data", err), this.$scope.alerts.main);
                    });
            }
        }

        resetDocumentSelection () {
            const elt = angular.element("input[type='file'][name='file']")[0];
            angular.element(elt).val(null);

            _.set(this.model, "document", null);
            _.set(this.model, "uploadFileName", null);
            _.set(this.file, "data", null);
            this.atLeastOneFileHasBeenSend = false;
        }

        setFileName () {
            this.model.uploadFileName = _.get(this.file, "data.meta.name");
        }

        fileAsBeenSelected () {
            return _.get(this.file, "data") != null && !_.isEmpty(this.model.uploadFileName);
        }

        isStep2Ok () {
            return _.get(this.model, "document.id") != null;
        }

        submit () {
            const tags = [{ key: "WEB_HOSTING_DATABASE_IMPORT_SCRIPT", value: "true" }];
            const file = this.file.data.meta;
            const filename = this.model.uploadFileName;
            this.isSendingFile = true;

            return this.User.uploadFile(filename, file, tags)
                .then((id) => {
                    _.set(this.model, "document.id", id);
                    this.atLeastOneFileHasBeenSend = true;
                })
                .finally(() => {
                    this.isSendingFile = false;
                });
        }

        importDatabase () {
            this.$scope.resetAction();

            return this.HostingDatabase.importDatabase(this.$stateParams.productId, this.model.database, this.model.document.id, this.model.flushDatabase, this.model.sendEmail)
                .then(() => {
                    this.Alerter.success(this.$scope.tr("hosting_tab_DATABASES_table_popover_import_step3_succes"), this.$scope.alerts.main);
                })
                .catch((err) => {
                    this.Alerter.alertFromSWS(this.$scope.tr("hosting_tab_DATABASES_table_popover_import_step3_fail"), _.get(err, "data", err), this.$scope.alerts.main);
                });
        }
    }
);
