angular.module("App").controller(
    "HostingTabTasksCtrl",
    class HostingTabTasksCtrl {
        constructor ($scope, $stateParams, Alerter, Hosting) {
            this.$scope = $scope;
            this.$stateParams = $stateParams;
            this.Alerter = Alerter;
            this.Hosting = Hosting;
        }

        $onInit () {
            this.states = {
                DOING: "DOING",
                ERROR: "ERROR",
                DONE: "DONE",
                CANCELLED: "CANCELLED",
                TODO: "TODO",
                INIT: "INIT"
            };
            this.tasksList = undefined;

            this.loadPaginated = this.loadPaginated.bind(this);

            this.$scope.$on(this.Hosting.events.tasksChanged, () => {
                this.$scope.$broadcast("paginationServerSide.reload", "tasksTable");
            });
        }

        loadPaginated (config) {
            return this.Hosting.getTasksList(this.$stateParams.productId, config.pageSize, config.offset - 1)
                .then((tasks) => {
                    this.tasksList = tasks;
                    return {
                        data: tasks.list.results,
                        meta: {
                            currentOffset: config.offset,
                            pageCount: tasks.pagination.length,
                            totalCount: tasks.count,
                            pageSize: config.pageSize
                        }
                    };
                })
                .catch((err) => {
                    this.Alerter.alertFromSWS(this.$scope.tr("hosting_tab_TASKS_error_message"), _.get(err, "data", err), this.$scope.alerts.main);
                });
        }

        refreshTable () {
            this.$scope.$broadcast("paginationServerSide.reload", "tasksTable");
        }
    }
);
