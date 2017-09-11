angular.module("App").controller(
    "PrivateDatabaseArchiveListCtrl",
    class PrivateDatabaseArchiveListCtrl {
        constructor ($scope, $stateParams, $q, $window, Alerter, PrivateDatabase) {
            this.$scope = $scope;
            this.$stateParams = $stateParams;
            this.$q = $q;
            this.$window = $window;
            this.alerter = Alerter;
            this.privateDatabase = PrivateDatabase;

            this.$scope.itemsPerPage = 10;
            this.$scope.nbDayToDelete = this.privateDatabase.NBDAYTODELETE;
        }

        $onInit () {
            this.productId = this.$stateParams.productId;
            this.archivelistLoader = true;
            this.dumpsId = null;
            this.deletedBdds = [];
            this.$scope.goTo = (page, target) => {
                this.$window.open(page, target);
            };

            this.getDumps()
                .then((dumpsId) => this.$q.all(_.map(dumpsId, (dumpId) => this.getDeletedBdd(dumpId))))
                .catch((err) => this.alerter.error(err))
                .finally(() => {
                    this.archivelistLoader = false;
                });
        }

        onTransformItemDone () {
            this.archivelistLoader = false;
        }

        getDeletedBdd (dumpId) {
            return this.privateDatabase
                .getDump(this.productId, dumpId)
                .then((dump) => {
                    const deletedDatabase = _(this.deletedBdds).find({ name: dump.databaseName });

                    if (deletedDatabase != null) {
                        deletedDatabase.dumps.push(dump);
                    } else {
                        this.deletedBdds.push({
                            name: dump.databaseName,
                            dumps: []
                        });

                        _(this.deletedBdds).last().dumps.push(dump);
                    }
                    return dump;
                })
                .catch((err) => this.alerter.error(err));
        }

        getDumps () {
            return this.privateDatabase
                .getDumps(this.productId, true)
                .then((dumpsId) => {
                    this.dumpsId = dumpsId.reverse();
                    return this.dumpsId;
                })
                .catch((err) => this.alerter.error(err));
        }
    }
);
