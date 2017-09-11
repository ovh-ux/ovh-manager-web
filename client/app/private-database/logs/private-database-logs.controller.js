angular
    .module("App")
    .controller("PrivateDatabaseTabLogsCtrl", class PrivateDatabaseTabLogsCtrl {

        constructor ($scope) {
            this.$scope = $scope;
        }

        $onInit () {
            this.$scope.goToList = () => {
                this.$scope.logs = null;
                this.$scope.logsView = "private-database/logs/list/private-database-logs-list.html";
            };

            this.$scope.goToList();
        }
});
