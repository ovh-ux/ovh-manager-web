angular
    .module("App")
    .controller("PrivateDatabaseBDDsDumpsCtrl", class PrivateDatabaseBDDsDumpsCtrl {

        constructor ($q, $scope, $stateParams, $window, Alerter, PrivateDatabase) {
            this.$q = $q;
            this.$scope = $scope;
            this.$stateParams = $stateParams;
            this.$window = $window;
            this.alerter = Alerter;
            this.privateDatabaseService = PrivateDatabase;
        }

        $onInit () {
            this.productId = this.$stateParams.productId;
            this.database = this.$scope.bdd;

            this.statusToWatch = ["start", "done", "error"];
            this.dumpIdRestoring = "";

            this.$scope.itemsPerPage = 10;

            this.loaders = {
                dumps: true
            };

            this.dumpsDetails = [];

            _.forEach(this.statusToWatch, (state) => {
                this.$scope.$on(`privateDatabase.database.dump.${state}`, this[`onDataBaseDump${state}`].bind(this));
                this.$scope.$on(`privateDatabase.database.restore.${state}`, this[`onDataBaseRestore${state}`].bind(this));
            });

            this.privateDatabaseService.restartPoll(this.productId, ["database/dump", "database/restore"]);

            this.getDumps();
        }

        $onDestroy () {
            this.privateDatabaseService.killPollRestore();
        }

        getDumps () {
            this.loaders.dumps = true;
            this.dumpsIds = null;

            this.privateDatabaseService.getDumpsBDD(this.productId, this.database.databaseName)
                .then((dumpsIds) => {
                    this.dumpsIds = dumpsIds;
                })
                .catch(() => {
                    this.alerter.error(this.$scope.tr("privateDatabase_tabs_dumps_fail_retrieve_dumps"), this.$scope.alerts.main);
                })
                .finally(() => {
                    if (_.isEmpty(this.dumpsIds)) {
                        this.loaders.dumps = false;
                    }
                });
        }

        goTo (page, target) {
            this.$window.open(page, target);
        }

        getPromise () {
            this.loaders.dumps = true;
        }

        transformItem (dumpId) {
            return this.privateDatabaseService.getDumpBDD(this.productId, this.database.databaseName, dumpId)
                .then((dump) => {
                    if (this.database.waitRestore && dump.id === this.dumpIdRestoring) {
                        dump.waitRestore = true;
                    }

                    return dump;
                });
        }

        onTransformItemDone () {
            this.loaders.dumps = false;
        }

        onDataBaseDumpstart (opts) {
            if (this.database.databaseName === opts.databaseName) {
                this.database.waitDump = true;
            }
        }

        onDataBaseDumpdone (opts) {
            if (this.database.databaseName === opts.databaseName) {
                delete this.database.waitDump;
                this.getDumps();
                this.alerter.success(this.$scope.tr("privateDatabase_dump_bdd_success"), this.$scope.alerts.main);
            }
        }

        onDataBaseDumperror (opts) {
            if (this.database.databaseName === opts.databaseName) {
                delete this.database.waitDump;
                this.alerter.error(this.$scope.tr("privateDatabase_dump_bdd_fail"), this.$scope.alerts.main);
            }
        }

        onDataBaseRestorestart (evt, opts) {
            this.database.waitRestore = true;
            this.dumpIdRestoring = opts.dumpId;

            this.findItemIndex(opts.dumpId)
                .then((idx) => {
                    this.$scope.dumpsDetails[idx].waitRestore = true;
                });
        }

        onDataBaseRestoredone () {
            delete this.database.waitRestore;
            this.dumpIdRestoring = null;

            this.$scope.dumpsDetails.forEach((dump) => {
                delete dump.waitRestore;
            });
            this.alerter.success(this.$scope.tr("privateDatabase_tabs_dumps_restore_success"), this.$scope.alerts.main);
        }

        onDataBaseRestoreerror (opts) {
            delete this.database.waitRestore;
            this.dumpIdRestoring = null;

            this.findItemIndex(opts.dumpId)
                .then((idx) => {
                    delete this.$scope.dumpsDetails[idx].waitRestore;
                    this.alerter.error(this.$scope.tr("privateDatabase_tabs_dumps_restore_fail"), this.$scope.alerts.main);
                });
        }

        findItemIndex (dumpId) {
            const deferred = this.$q.defer();

            let unregisterWatch = null;

            const todo = () => {
                const idx = _.findIndex(this.$scope.dumpsDetails, (dump) => dump.id === dumpId);

                if (~idx) {
                    deferred.resolve(idx);

                    if (unregisterWatch) {
                        unregisterWatch();
                    }
                }
            };

            if (_.isArray(this.$scope.dumpsDetails) && !_.isEmpty(this.$scope.dumpsDetails.length)) {
                todo();
            } else {
                unregisterWatch = this.$scope.$watch("dumpsDetails.length", todo);
            }

            return deferred.promise;
        }
});
