angular.module("App").controller(
    "HostingTabFrameworkCtrl",
    class HostingTabFrameworkCtrl {

        /**
         * @constructs HostingTabFrameworkCtrl
         * @param $scope
         */
        constructor ($scope) {
            this.$scope = $scope;
        }

        /**
         * Initialize HostingTabFrameworkCtrl
         */
        $onInit () {
            this.template = "hosting/framework/runtime/FRAMEWORK_RUNTIMES.html";

            this.$scope.goToRuntimeList = () => this.goToRuntimeList();
            this.$scope.goToEnvvarList = () => this.goToEnvvarList();
        }

        /**
         * Display runtime list view
         */
        goToRuntimeList () {
            this.template = "hosting/framework/runtime/FRAMEWORK_RUNTIMES.html";
        }

        /**
         * Display envvar list view
         */
        goToEnvvarList () {
            this.template = "hosting/framework/envvar/FRAMEWORK_ENVVARS.html";
        }
    }
);
