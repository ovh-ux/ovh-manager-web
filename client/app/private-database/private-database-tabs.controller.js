angular.module("App").controller(
    "PrivateDatabaseTabsCtrl",
    class PrivateDatabaseTabsCtrl {
        constructor ($location, $scope, $stateParams) {
            this.$location = $location;
            this.$scope = $scope;
            this.$stateParams = $stateParams;
        }

        $onInit () {
            this.$scope.toKebabCase = _.kebabCase;
            this.currentTab = this.$stateParams.tab;

            this.defaultTab = "STATE";
            this.$scope.tabs = ["STATE", "USER", "DATABASE", "WHITELIST", "CRON", "METRICS", "LOGS", "CONFIGURATION", "TASK"];

            if (this.$scope.isDockerDatabase()) {
                this.$scope.tabs = _.difference(this.$scope.tabs, ["CRON"]);
            }

            if (this.$scope.isLegacyDatabase()) {
                this.$scope.tabs = _.difference(this.$scope.tabs, ["CONFIGURATION", "METRICS"]);
            }

            this.$scope.isConfigSet()
                .then((res) => {
                    if (!res) {
                        this.$scope.tabs = _.difference(this.$scope.tabs, ["CONFIGURATION"]);
                    }
                });

            if (!this.$scope.isDBaaS()) {
                this.$scope.tabs = _.difference(this.$scope.tabs, ["WHITELIST"]);
            }

            this.$scope.setSelectedTab = (tab) => {
                if (tab !== undefined && tab !== null && tab !== "") {
                    this.$scope.selectedTab = tab;
                } else {
                    this.$scope.selectedTab = this.defaultTab;
                }
                this.$location.search("tab", this.$scope.selectedTab);
            };

            if (this.currentTab && ~this.$scope.tabs.indexOf(angular.uppercase(this.currentTab))) {
                this.$scope.setSelectedTab(angular.uppercase(this.currentTab));
            } else {
                this.$scope.setSelectedTab(this.defaultTab);
            }
        }
    }
);
