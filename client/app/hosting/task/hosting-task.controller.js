angular.module("App").controller("HostingTabTasksCtrl", ($scope, $stateParams, Hosting, Alerter) => {
    "use strict";

    $scope.tasksList = null;
    $scope.tableLoading = false;

    $scope.states = {
        DOING: "DOING",
        ERROR: "ERROR",
        DONE: "DONE",
        CANCELLED: "CANCELLED",
        TODO: "TODO",
        INIT: "INIT"
    };

    $scope.loadPaginated = function (count, offset) {
        $scope.tableLoading = true;
        Hosting.getTasksList($stateParams.productId, count, offset).then(
            (tasks) => {
                $scope.tableLoading = false;
                $scope.tasksList = tasks;
            },
            (failure) => {
                $scope.tableLoading = false;
                Alerter.alertFromSWS($scope.tr("hosting_tab_TASKS_error_message"), failure.data, $scope.alerts.dashboard);
            }
        );
    };

    $scope.getTaskStateIconClass = function (status) {
        switch (status) {
        case $scope.states.DOING:
        case $scope.states.TODO:
        case $scope.states.INIT:
            return "state-pending";
        case $scope.states.ERROR:
            return "state-error";
        case $scope.states.CANCELLED:
            return "state-cancel";
        default:
            return null;
        }
    };

    $scope.$on(Hosting.events.tasksChanged, () => {
        $scope.$broadcast("paginationServerSide.reload", "tasksTable");
    });

    $scope.refreshTable = function () {
        $scope.$broadcast("paginationServerSide.reload", "tasksTable");
    };
});
