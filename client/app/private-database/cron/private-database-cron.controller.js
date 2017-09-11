angular.module("App").controller(
    "PrivateDatabaseCronCtrl",
    class PrivateDatabaseCronCtrl {
        constructor ($scope, $stateParams, PrivateDatabaseCron) {
            this.$scope = $scope;
            this.$stateParams = $stateParams;
            this.PrivateDatabaseCron = PrivateDatabaseCron;
        }

        $onInit () {
            this.cronDetails = [];
            this.loaders = {
                cron: true
            };

            this.$scope.$on(this.PrivateDatabaseCron.events.tabCronRefresh, () => {
                this.getCronIds();
            });

            this.getCronIds();
        }

        getCronIds () {
            this.loaders.cron = true;
            this.cronIds = null;

            return this.PrivateDatabaseCron.getCronIds(this.$stateParams.productId)
                .then((ids) => {
                    this.cronIds = ids;
                })
                .finally(() => {
                    if (_.isEmpty(this.cronIds)) {
                        this.loaders.cron = false;
                    }
                });
        }

        getCronDetails (id) {
            return this.PrivateDatabaseCron.getCronDetails(this.$stateParams.productId, id);
        }

        onTransformItemsDone () {
            this.loaders.cron = false;
        }

        modifyCron (cron) {
            this.$scope.addCron({ cron });
        }

        deleteCron (cron) {
            this.$scope.setAction("cron/delete/private-database-cron-delete", cron);
        }

        trEmail (email) {
            return email === "no" ? this.$scope.tr(`common_${email}`) : email;
        }
    }
);
