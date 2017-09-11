angular.module("App").controller(
    "PrivateDatabaseDeleteWhitelistCtrl",
    class PrivateDatabaseDeleteWhitelistCtrl {
        constructor (Alerter, WhitelistService, $rootScope, $scope, $stateParams) {
            this.alerter = Alerter;
            this.whitelistService = WhitelistService;
            this.$rootScope = $rootScope;
            this.$scope = $scope;
            this.$stateParams = $stateParams;
        }

        $onInit () {
            this.productId = this.$stateParams.productId;

            this.whitelistToDelete = this.$scope.currentActionData;

            this.$scope.deleteWhitelist = () => {
                this.whitelistService
                    .deleteWhitelist(this.productId, this.whitelistToDelete.ip)
                    .then(() => {
                        this.alerter.success(this.$scope.tr("privateDatabase_modale_whitelist_delete_success"), "privateDataBase.alerts.whitelist");
                    })
                    .catch(() => {
                        this.alerter.error(this.$scope.tr("privateDatabase_modale_whitelist_delete_fail"), "privateDataBase.alerts.whitelist");
                    })
                    .finally(() => this.$scope.resetAction());
            };
        }
    }
);
