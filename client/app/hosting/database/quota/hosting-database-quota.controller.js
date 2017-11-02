angular.module("App").controller(
    "HostingDatabaseCheckQuotaCtrl",
    class HostingDatabaseCheckQuotaCtrl {
        constructor ($scope, $stateParams, Alerter, HostingDatabase) {
            this.$scope = $scope;
            this.$stateParams = $stateParams;
            this.Alerter = Alerter;
            this.HostingDatabase = HostingDatabase;
        }

        $onInit () {
            this.entryToCheck = this.$scope.currentActionData.database;

            this.$scope.checkQuota = () => this.checkQuota();
        }

        checkQuota () {
            const completionDeferred = this.$scope.currentActionData.deferred;

            this.$scope.resetAction();
            return this.HostingDatabase.requestDatabaseQuotaCheck(this.$stateParams.productId, this.entryToCheck)
                .then((data) => {
                    this.Alerter.success(this.$scope.tr("hosting_tab_DATABASES_configuration_check_quota_success", [this.entryToCheck]), this.$scope.alerts.main);
                    completionDeferred.resolve(data);
                })
                .catch((err) => {
                    _.set(err, "type", err.type || "ERROR");
                    this.Alerter.alertFromSWS(this.$scope.tr("hosting_tab_DATABASES_configuration_check_quota_fail"), _.get(err, "data", err), this.$scope.alerts.main);
                    completionDeferred.reject(err);
                });
        }
    }
);
