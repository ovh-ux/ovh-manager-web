angular.module("App").controller(
    "DatabaseDumpsCtrl",
    class DatabaseDumpsCtrl {
        constructor ($scope, $q, $stateParams, $window, Alerter, HostingDatabase) {
            this.$scope = $scope;
            this.$q = $q;
            this.$stateParams = $stateParams;
            this.$window = $window;
            this.alerter = Alerter;
            this.hostingDatabase = HostingDatabase;
        }

        $onInit () {
            this.dumpsDetails = [];
            this.dumpsLoading = false;
            this.statusToWatch = ["start", "doing", "done", "error"];

            _.forEach(this.statusToWatch, (state) => {
                this.$scope.$on(`database.dump.restore.poll.${state}`, this[`onDataBaseDumpRestore${state}`].bind(this));
                this.$scope.$on(`database.dump.delete.poll.${state}`, this[`onDataBaseDumpDelete${state}`].bind(this));
            });

            this.loadDumps();
        }

        loadDumps () {
            this.dumpsLoading = true;
            this.dumpsIds = null;

            return this.hostingDatabase
                .getDumpIds(this.$stateParams.productId, this.$scope.bdd.name)
                .then((dumpIds) => (this.dumpsIds = dumpIds))
                .catch((err) => this.alerter.alertFromSWS(this.$scope.tr("hosting_tab_databases_get_error"), err, this.$scope.alerts.main))
                .finally(() => {
                    if (_.isEmpty(this.dumpsIds)) {
                        this.dumpsLoading = false;
                    }
                });
        }

        transformItem (id) {
            return this.hostingDatabase.getDump(this.$stateParams.productId, this.$scope.bdd.name, id)
                .then((dump) => {
                    dump.snapshotDate = this.constructor.getSnapshotDate(dump);
                    return dump;
                });
        }

        onTransformItemDone () {
            this.dumpsLoading = false;
        }

        goTo (page, target) {
            this.$window.open(page, target);
        }

        static getSnapshotDate (dump) {
            const snapshotDate = moment(new Date(dump.creationDate));

            if (dump.type === "daily.1") {
                snapshotDate.subtract(1, "d");
            } else if (dump.type === "weekly.1") {
                snapshotDate.subtract(1, "w");
            }

            return snapshotDate.format();
        }

        onDataBaseDumpDeletestart (evt, task, dump) {
            this.findItemIndex(dump.id).then((idx) => {
                if (idx >= 0) {
                    this.dumpsDetails[idx].waitDelete = true;
                }
            });

            this.alerter.success(this.$scope.tr("database_tabs_dumps_delete_start"), this.$scope.alerts.main);
        }

        onDataBaseDumpDeletedoing () {
            this.alerter.success(this.$scope.tr("database_tabs_dumps_delete_in_progress"), this.$scope.alerts.main);
        }

        onDataBaseDumpDeletedone () {
            this.loadDumps();
            this.alerter.success(this.$scope.tr("database_tabs_dumps_delete_success"), this.$scope.alerts.main);
        }

        onDataBaseDumpDeleteerror (dump) {
            if (_.get(dump, "id")) {
                this.findItemIndex(dump.id).then((idx) => {
                    if (~idx) {
                        delete this.dumpsDetails[idx].waitDelete;
                        this.alerter.error(this.$scope.tr("database_tabs_dumps_delete_fail"), this.$scope.alerts.main);
                    }
                });
            }
        }

        onDataBaseDumpRestorestart (evt, task, dump) {
            this.$scope.bdd.waitRestore = true;

            this.findItemIndex(dump.id).then((idx) => {
                this.dumpsDetails[idx].waitRestore = true;
                this.alerter.success(this.$scope.tr("database_tabs_dumps_restore_start"), this.$scope.alerts.main);
            });
        }

        onDataBaseDumpRestoredoing () {
            this.alerter.success(this.$scope.tr("database_tabs_dumps_restore_in_progress"), this.$scope.alerts.main);
        }

        onDataBaseDumpRestoredone () {
            delete this.$scope.bdd.waitRestore;

            this.dumpsDetails.forEach((dump) => {
                delete dump.waitRestore;
            });
            this.alerter.success(this.$scope.tr("database_tabs_dumps_restore_success"), this.$scope.alerts.main);
        }

        onDataBaseDumpRestoreerror (dump) {
            this.$scope.bdd.waitRestore = null;

            if (dump && dump.id) {
                this.findItemIndex(dump.id).then((idx) => {
                    this.dumpsDetails[idx].waitRestore = null;
                    this.alerter.error(this.$scope.tr("database_tabs_dumps_restore_fail"), this.$scope.alerts.main);
                });
            }
        }

        findItemIndex (dumpId) {
            const deferred = this.$q.defer();
            let unregisterWatch = null;

            const todo = () => {
                const idx = _.findIndex(this.dumpsDetails, (dump) => dump.id === dumpId);

                if (idx >= 0) {
                    deferred.resolve(idx);

                    if (unregisterWatch) {
                        unregisterWatch();
                    }
                }
            };

            if (!_.isEmpty(this.dumpsDetails)) {
                todo();
            } else {
                unregisterWatch = this.$scope.$watch(angular.bind(this, () => this.dumpsDetails.length), todo);
            }

            return deferred.promise;
        }
    }
);
