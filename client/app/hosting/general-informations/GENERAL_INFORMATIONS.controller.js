angular
    .module("App")
    .controller("GeneralInformationsCtrl", class GeneralInformationsCtrl {
        constructor ($scope) {
            this.$scope = $scope;
            _.set(this.$scope.alerts, "dashboard", "hosting.alerts.dashboard");
        }

        canOrderSSL () {
            return !this.$scope.hosting.hasHostedSsl && this.$scope.ssl == null;
        }

        alreadyHasSSL () {
            return this.$scope.ssl != null && this.$scope.ssl.status !== "creating" && this.$scope.ssl.status !== "deleting" && this.$scope.ssl.status !== "regenerating";
        }

        canRegenerateSSL () {
            return this.alreadyHasSSL() && this.$scope.ssl.regenerable && this.$scope.ssl.provider !== "COMODO";
        }

        canDeleteSSL () {
            return this.$scope.hosting != null && this.$scope.hosting.hasHostedSsl && this.alreadyHasSSL();
        }
    });
