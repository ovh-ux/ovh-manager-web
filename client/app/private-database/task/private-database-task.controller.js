angular.module("App").controller(
    "PrivateDatabaseTasksCtrl",
    class PrivateDatabaseTasksCtrl {
        constructor (PrivateDatabase, $scope, $stateParams) {
            this.privateDatabaseService = PrivateDatabase;
            this.$scope = $scope;
            this.$stateParams = $stateParams;
        }

        $onInit () {
            this.productId = this.$stateParams.productId;

            this.taskDetails = [];
            this.loaders = {
                tasks: false
            };

            this.getTasks();
        }

        getTasks () {
            this.loaders.tasks = true;
            this.tasksIds = null;

            return this.privateDatabaseService.getTasks(this.productId)
                .then((ids) => {
                    this.tasksIds = ids;
                })
                .finally(() => {
                    if (_.isEmpty(this.tasksIds)) {
                        this.loaders.tasks = false;
                    }
                });
        }

        getTasksDetails (id) {
            return this.privateDatabaseService.getTaskDetails(this.productId, id);
        }

        onTransformItemsDone () {
            this.loaders.tasks = false;
        }
    }
);
