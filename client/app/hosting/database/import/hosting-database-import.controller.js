angular.module('App').controller(
  'HostingDatabaseImportCtrl',
  class HostingDatabaseImportCtrl {
    constructor(
      $scope,
      $rootScope,
      $stateParams,
      Alerter,
      HostingDatabase,
      User,
    ) {
      this.$scope = $scope;
      this.$rootScope = $rootScope;
      this.$stateParams = $stateParams;
      this.Alerter = Alerter;
      this.HostingDatabase = HostingDatabase;
      this.User = User;
    }

    $onInit() {
      this.file = null;
      this.importScriptTag = {
        key: 'WEB_HOSTING_DATABASE_IMPORT_SCRIPT',
        value: 'true',
      };
      this.isSendingFile = false;
      this.model = {
        database: angular.copy(this.$scope.currentActionData),
        document: {
          id: null,
        },
        flushDatabase: false,
        sendEmail: true,
        newFileUploaded: false,
        uploadFileName: null,
        actions: {
          IMPORT_FROM_NEW: 'IMPORT_FROM_NEW',
          IMPORT_FROM_EXISTING: 'IMPORT_FROM_EXISTING',
        },
      };
      this.selected = {
        action: null,
      };

      this.$scope.importDatabase = () => this.importDatabase();
      this.$scope.getDocuments = () => this.getDocuments();
      this.$scope.resetDocumentSelection = () => this.resetDocumentSelection();
    }

    getDocuments() {
      if (this.selected.action === this.model.actions.IMPORT_FROM_EXISTING) {
        this.User.getDocuments()
          .then((data) => {
            const onlyImportScripts = [];

            _.forEach(data, (document) => {
              if (
                _.find(document.tags, {
                  key: this.importScriptTag.key,
                  value: this.importScriptTag.value,
                })
              ) {
                onlyImportScripts.push(document);
              }
            });

            this.model.documents = onlyImportScripts;
          })
          .catch((err) => {
            this.Alerter.alertFromSWS(
              this.$scope.tr('hosting_tab_DATABASES_table_popover_import_step1_load_documents_error'),
              _.get(err, 'data', err),
              this.$scope.alerts.main,
            );
          });
      }
    }

    resetDocumentSelection() {
      const elt = angular.element("input[type='file'][name='file']")[0];
      angular.element(elt).val(null);
      this.formFileUpload.$setPristine();

      _.set(this.model, 'document', null);
      _.set(this.model, 'uploadFileName', null);
      this.file = null;
      this.atLeastOneFileHasBeenSend = false;
    }

    onFileChange(input) {
      const filename = _.get(_.head(this.file), 'name', '');
      const ext = _.last(filename.split('.'));
      const validFormat = filename === ext || /gz|sql|txt/i.test(ext);

      this.model.uploadFileName = filename;
      input.$setValidity('format', validFormat);
    }

    isStep2Ok() {
      return _.get(this.model, 'document.id') != null;
    }

    submit() {
      const tags = [
        { key: 'WEB_HOSTING_DATABASE_IMPORT_SCRIPT', value: 'true' },
      ];
      const file = _.head(this.file);
      const filename = this.model.uploadFileName;
      this.isSendingFile = true;

      return this.User.uploadFile(filename, file, tags)
        .then((id) => {
          _.set(this.model, 'document.id', id);
          this.atLeastOneFileHasBeenSend = true;
        })
        .finally(() => {
          this.isSendingFile = false;
        });
    }

    importDatabase() {
      this.$scope.resetAction();

      return this.HostingDatabase.importDatabase(
        this.$stateParams.productId,
        this.model.database,
        this.model.document.id,
        this.model.flushDatabase,
        this.model.sendEmail,
      )
        .then(() => {
          this.Alerter.success(
            this.$scope.tr('hosting_tab_DATABASES_table_popover_import_step3_succes'),
            this.$scope.alerts.main,
          );
        })
        .catch((err) => {
          this.Alerter.alertFromSWS(
            this.$scope.tr('hosting_tab_DATABASES_table_popover_import_step3_fail'),
            _.get(err, 'data', err),
            this.$scope.alerts.main,
          );
        });
    }
  },
);
