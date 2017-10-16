angular.module("App").controller(
    "EmailsTabTasksCtrl",
    class EmailsTabTasksCtrl {
        /**
     * Constructor
     * @param $scope
     * @param $stateParams
     * @param Alerter
     * @param Emails
     */
        constructor ($scope, $stateParams, Alerter, Emails) {
            this.$scope = $scope;
            this.$stateParams = $stateParams;
            this.Alerter = Alerter;
            this.Emails = Emails;
        }

        $onInit () {
            this.loading = false;
            this.refreshTasks();
        }

        refreshTasks () {
            this.loading = true;
            this.taskIds = null;

            return this.Emails
                .getAllTaskIds(this.$stateParams.productId)
                .then((ids) => {
                    this.taskIds = [];
                    _.forEach(ids, (type) => {
                        _.forEach(type.ids, (id) => {
                            this.taskIds.push({ action: type.action, id });
                        });
                    });
                })
                .catch((err) => this.Alerter.alertFromSWS(this.$scope.tr("email_tab_table_tasks_error"), _.get(err, "data", err), this.$scope.alerts.main))
                .finally(() => {
                    if (_.isEmpty(this.taskIds)) {
                        this.loading = false;
                    }
                });
        }

        transformItem (item) {
            return this.Emails.getTask(this.$stateParams.productId, item);
        }
        onTransformItemDone () {
            this.loading = false;
        }
    }
);
