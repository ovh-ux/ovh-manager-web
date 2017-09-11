angular.module("controllers").controller(
    "controllers.Domain.Tasks",
    class DomainTasksCtrl {
        constructor ($scope, $q, $state, $stateParams, Domain) {
            this.$scope = $scope;
            this.$q = $q;
            this.$state = $state;
            this.$stateParams = $stateParams;
            this.Domain = Domain;
        }

        $onInit () {
            this.loading = false;
            this.tasksDetails = [];
            this.getTasks();
        }

        getTasks () {
            this.loading = true;
            this.tasks = null;

            if (/^\/configuration\/zone.+/.test(this.$state.current.url)) {
                return this.Domain
                    .getZoneDnsTasks(this.$stateParams.productId)
                    .then((tasks) => {
                        this.tasks = this.constructor.getTaskStruct(tasks, true);
                    })
                    .finally(() => {
                        if (_.isEmpty(this.tasks)) {
                            this.loading = false;
                        }
                    });
            }
            return this.$q
                .all({
                    zoneDnsTasks: this.Domain.getZoneDnsTasks(this.$stateParams.productId),
                    tasks: this.Domain.getTasks(this.$stateParams.productId)
                })
                .then(({ zoneDnsTasks, tasks }) => {
                    this.tasks = this.constructor.getTaskStruct(zoneDnsTasks, true).concat(this.constructor.getTaskStruct(tasks, false));
                })
                .finally(() => {
                    if (_.isEmpty(this.tasks)) {
                        this.loading = false;
                    }
                });
        }

        static getTaskStruct (tasks, isZone) {
            return _.map(tasks, (task) => ({ id: task, zone: isZone }));
        }

        transformItem (item) {
            if (item.zone) {
                return this.Domain.getZoneDnsTask(this.$stateParams.productId, item.id)
                    .then((result) => {
                        result.status = result.status.toUpperCase();
                        return result;
                    });
            }
            return this.Domain.getTask(this.$stateParams.productId, item.id);
        }

        onTransformItemNotify (taskDetail) {
            this.tasksDetails.push(taskDetail);
        }

        onTransformItemDone () {
            this.loading = false;
        }
    }
);
