angular.module("App").controller(
    "DoubleAuthBackupCodeCtrl",
    ["$scope", "$timeout", "ovh-doubleauth-backupCode.backupCode", class DoubleAuthBackupCodeCtrl {
        /**
         * Constructor
         * @param $scope
         * @param $timeout
         * @param DoubleAuthBackupCodeService
         */
        constructor ($scope, $timeout, DoubleAuthBackupCodeService) {
            this.$scope = $scope;
            this.$timeout = $timeout;
            this.DoubleAuthBackupCodeService = DoubleAuthBackupCodeService;

            this.init();
        }

        init () {
            this.backupCodeStatus = null;

            /**
             * Set Action
             * @param action
             * @param data
             */
            this.$scope.setAction = (action, data) => {
                this.$scope.currentAction = action;
                this.$scope.currentActionData = data;

                if (this.$scope.currentActionData) {
                    this.$scope.stepPath = `double-authentication/${this.$scope.currentAction}.html`;
                    $("#currentActionDoubleAlert").modal({
                        keyboard: false,
                        backdrop: "static"
                    });
                } else {
                    $("#currentActionDoubleAlert").modal("hide");
                    this.$timeout(() => {
                        this.$scope.stepPath = "";
                    }, 300);
                }
            };

            /**
             * Reset Action
             */
            this.$scope.resetAction = () => {
                this.$scope.setAction(false);
            };

            this.$scope.getDoubleAuthBackupCode = () => this.getDoubleAuthBackupCode();

            this.getDoubleAuthBackupCode();
        }

        /**
         * Get double authentication backup code
         */
        getDoubleAuthBackupCode () {
            this.DoubleAuthBackupCodeService.get().then((data) => {
                this.backupCodeStatus = data.data;

                if (this.backupCodeStatus.status === "enabled" && this.backupCodeStatus.remaining <= 3) {
                    this.$scope.setAction("double-authentication", this.backupCodeStatus);
                }
            });
        }
}]);
