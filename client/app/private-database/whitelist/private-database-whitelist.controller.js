angular.module("App").controller(
    "PrivateDatabaseWhitelistCtrl",
    class PrivateDatabaseWhitelistCtrl {
        constructor ($scope) {
            this.$scope = $scope;
        }

        $onInit () {
            this.$scope.goToList = () => {
                this.$scope.whitelist = null;
                this.$scope.whitelistView = "private-database/whitelist/list/private-database-whitelist-list.html";
            };

            this.$scope.goToList();
        }
    }
);
