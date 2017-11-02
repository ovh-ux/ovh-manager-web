angular
    .module("App")
    .controller("PrivateDatabaseBDDsExtensionCtrl", class PrivateDatabaseBDDsExtensionCtrl {

        constructor ($q, $scope, $stateParams, Alerter, PrivateDatabase, PrivateDatabaseExtension) {
            this.$q = $q;
            this.$scope = $scope;
            this.$stateParams = $stateParams;
            this.alerter = Alerter;
            this.privateDatabaseService = PrivateDatabase;
            this.privateDatabaseExtensionService = PrivateDatabaseExtension;
        }

        $onInit () {
            this.productId = this.$stateParams.productId;
            this.bdd = this.$scope.bdd;

            const statusToWatch = ["start", "done", "error"];

            this.loaders = {
                extensions: false
            };

            this.extensionDetails = [];

            this.privateDatabaseService.restartPoll(this.$stateParams.serviceName, ["whitelist/create", "whitelist/delete"]);

            _.forEach(statusToWatch, (state) => {
                this.$scope.$on(`privateDatabase.database.extension.create.${state}`, this[`onExtensionEnable${state}`].bind(this));
                this.$scope.$on(`privateDatabase.database.extension.delete.${state}`, this[`onExtensionDisable${state}`].bind(this));
            });

            _.forEach(["done", "error"], (state) => {
                this.$scope.$on(`privateDatabase.global.actions.${state}`, (e, taskOpt) => {
                    this.$scope.lockAction = taskOpt.lock ? false : this.$scope.lockAction;
                });
            });

            this.$scope.$on("privateDatabase.global.actions.start", (e, taskOpt) => {
                this.$scope.lockAction = taskOpt.lock || this.$scope.lockAction;
            });

            this.getExtensions();
        }

        getExtensions () {
            this.loaders.extensions = true;
            this.extensions = null;

            this.privateDatabaseExtensionService.getExtensions(this.productId, this.bdd.databaseName)
                .then((extensions) => {
                    this.extensions = extensions.sort();
                })
                .catch((err) => {
                    this.alerter.error(this.$scope.tr("privateDatabase_tabs_list_extensions_retrieve_infos"), err);
                })
                .finally(() => {
                    if (_.isEmpty(this.extensions)) {
                        this.loaders.extensions = false;
                    }
                });
        }

        enableExtension (extension) {
            return this.privateDatabaseExtensionService.enableExtension(this.productId, this.bdd.databaseName, extension.extensionName);
        }

        disableExtension (extension) {
            return this.privateDatabaseExtensionService.disableExtension(this.productId, this.bdd.databaseName, extension.extensionName);
        }

        static isStatusChanging (extension) {
            return extension.status && (extension.status === "enabling" || extension.status === "disabling");
        }

        transformItem (item) {
            return this.privateDatabaseExtensionService.getExtension(this.productId, this.bdd.databaseName, item)
                .then((extension) => extension)
                .catch((err) => {
                    this.alerter.error(this.$scope.tr("privateDatabase_tabs_list_extensions_retrieve_infos"), err);
                });
        }

        onTransformItemDone () {
            this.loaders.extensions = false;
        }

        findItemIndex (extensionName) {
            const deferred = this.$q.defer();

            let unregisterWatch = null;

            const todo = () => {
                const idx = _.findIndex(this.extensionDetails, (extension) => extension.extensionName === extensionName);

                if (~idx) {
                    deferred.resolve(idx);

                    if (unregisterWatch) {
                        unregisterWatch();
                    }
                }
            };

            if (!_.isEmpty(this.extensionDetails)) {
                todo();
            } else {
                unregisterWatch = this.$scope.$watch(angular.bind(this, () => this.extensionDetails.length), todo);
            }

            return deferred.promise;
        }

        onExtensionEnablestart (evt, opts) {
            this.findItemIndex(opts.extensionName)
                .then((idx) => {
                    if (~idx) {
                        this.extensionDetails[idx].status = "enabling";
                    }
                });
        }

        onExtensionEnabledone () {
            this.getExtensions();
            this.alerter.success(this.$scope.tr("privateDatabase_tabs_list_extensions_enable_success"), this.$scope.alerts.main);
        }

        onExtensionEnableerror (opts) {
            this.findItemIndex(opts.extensionName).then((idx) => {
                if (~idx) {
                    this.alerter.error(this.$scope.tr("privateDatabase_tabs_list_extensions_enable_error"), this.$scope.alerts.main);
                }
            });
        }

        onExtensionDisablestart (evt, opts) {
            this.findItemIndex(opts.extensionName)
                .then((idx) => {
                    if (~idx) {
                        this.extensionDetails[idx].status = "disabling";
                    }
                });
        }

        onExtensionDisabledone () {
            this.getExtensions();
            this.alerter.success(this.$scope.tr("privateDatabase_tabs_list_extensions_disable_success"), this.$scope.alerts.main);
        }

        onExtensionDisableerror (opts) {
            this.findItemIndex(opts.extensionName).then((idx) => {
                if (~idx) {
                    this.alerter.error(this.$scope.tr("privateDatabase_tabs_list_extensions_disable_error"), this.$scope.alerts.main);
                }
            });
        }
});
