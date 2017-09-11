angular.module("App").controller(
    "PrivateDatabaseArchiveDumpCtrl",
    class PrivateDatabaseArchiveDumpCtrl {
        constructor ($scope, $q, $window, Alerter, PrivateDatabase) {
            this.$scope = $scope;
            this.$q = $q;
            this.$window = $window;
            this.alerter = Alerter;
            this.privateDatabase = PrivateDatabase;
        }

        $onInit () {
            this.$scope.loader = true;
            this.$scope.itemsPerPage = 10;

            this.$scope.goTo = (page, target) => {
                this.$window.open(page, target);
            };
        }

        callModal (dump) {
            this.$scope.setAction("database/restore-archive/private-database-database-restore-archive", { bdd: dump.databaseName, dump, func: this.$scope });
        }

        onTransformItemDone () {
            this.loader = false;
        }
    }
);
