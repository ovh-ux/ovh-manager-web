angular
    .module("App")
    .controller("PrivateDatabaseChangeVersionCtrl", class PrivateDatabaseChangeVersionCtrl {

        constructor ($scope, $stateParams, Alerter, PrivateDatabase) {
            this.$scope = $scope;
            this.$stateParams = $stateParams;
            this.alerter = Alerter;
            this.privateDatabaseService = PrivateDatabase;
        }

        $onInit () {
            this.productId = this.$stateParams.productId;

            this.privateDBToUpdate = this.$scope.currentActionData;

            this.loading = {
                init: true
            };
            this.model = {
                versions: [],
                choice: null
            };

            this.$scope.updateVersion = () => this.updateVersion();

            this.getAvailableVersions();
        }

        getAvailableVersions () {
            this.loading.init = true;

            this.privateDatabaseService.getAvailableVersions(this.productId)
                .then((versions) => {
                    this.model.versions = versions;

                    _.remove(this.model.versions, (version) => version.replace(/\./g, "") === this.$scope.currentActionData.version);

                    this.loading.init = false;
                })
                .catch((data) => {
                    this.$scope.resetAction();
                    this.alerter.alertFromSWS(this.$scope.tr("privateDatabase_change_version_step1_fail", [this.$scope.entryToDelete]), data.data, this.$scope.alerts.dashboard);
                });
        }

        updateVersion () {
            this.$scope.resetAction();

            this.privateDatabaseService.changeVersion(this.productId, this.model.choice)
                .then((task) => {
                    this.$scope.pollAction(task);
                    this.alerter.success(this.$scope.tr("privateDatabase_change_version_success"), this.$scope.alerts.dashboard);
                })
                .catch((data) => {
                    this.alerter.alertFromSWS(this.$scope.tr("privateDatabase_change_version_fail"), data.data, this.$scope.alerts.dashboard);
                });
        }
});
