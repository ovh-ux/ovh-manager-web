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
            this.tasksList = null;
            this.loading = false;

            this.loadPaginated = this.loadPaginated.bind(this);

            this.$scope.$on(this.Hosting.events.tasksChanged, () => {
                this.$scope.$broadcast("paginationServerSide.reload", "tasksTable");
            });
        }

        loadPaginated (count, offset) {
            this.loading = true;
            return this.Hosting.getTasksList(this.$stateParams.productId, count, offset)
                .then((tasks) => {
                    this.tasksList = tasks;
                })
                .catch((err) => {
                    this.Alerter.alertFromSWS(this.$scope.tr("hosting_tab_TASKS_error_message"), _.get(err, "data", err), this.$scope.alerts.main);
                })
                .finally(() => {
                    this.loading = false;
                });
        }

        refreshTable () {
            this.$scope.$broadcast("paginationServerSide.reload", "tasksTable");
        }
    }
);
