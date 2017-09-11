angular.module("App").controller(
    "HostingDatabaseDumpCtrl",
    class HostingDatabaseDumpCtrl {
        constructor ($scope, $stateParams, HostingDatabase, Alerter) {
            this.$scope = $scope;
            this.$stateParams = $stateParams;
            this.hostingDatabase = HostingDatabase;
            this.alerter = Alerter;

            this.$scope.model = {};
            this.$scope.entryToDump = this.$scope.currentActionData;

            this.$onInit();
        }

        $onInit () {
            this.$scope.loadOptions = () =>
                this.hostingDatabase
                    .dumpDatabaseOptions()
                    .then((data) => (this.$scope.model.options = data))
                    .catch((data) => this.alerter.alertFromSWS(this.$scope.tr("hosting_tab_DATABASES_configuration_dump_step1_loaderror"), data.data, this.$scope.alerts.dashboard));

            this.$scope.dumpDatabase = () => {
                this.$scope.resetAction();

                this.hostingDatabase
                    .dumpDatabase(this.$stateParams.productId, this.$scope.entryToDump, this.$scope.model.date, true)
                    .then(() => this.alerter.success(this.$scope.tr("hosting_tab_DATABASES_configuration_dump_success"), this.$scope.alerts.dashboard))
                    .catch((err) => this.alerter.alertFromSWS(this.$scope.tr("hosting_tab_DATABASES_configuration_dump_fail", [this.$scope.entryToDump]), err, this.$scope.alerts.dashboard));
            };

            this.$scope.getDate = (day) => {
                switch (day) {
                case "NOW":
                    return Date.now();
                case "DAILY_1":
                    return Date.now() - (24 * 3600 * 1000);
                case "WEEKLY_1":
                    return Date.now() - (24 * 3600 * 7 * 1000);
                default:
                    return "";
                }
            };
        }
    }
);
