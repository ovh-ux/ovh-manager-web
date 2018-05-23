angular
    .module("App")
    .controller("HostingTabFrameworkCtrl", class HostingTabFrameworkCtrl {
        constructor ($scope) {
            this.$scope = $scope;
        }

        $onInit () {
            this.template = "hosting/framework/runtime/FRAMEWORK_RUNTIMES.html";

            this.$scope.goToRuntimeList = () => this.goToRuntimeList();
            this.$scope.goToEnvvarList = () => this.goToEnvvarList();
        }

        goToRuntimeList () {
            this.template = "hosting/framework/runtime/FRAMEWORK_RUNTIMES.html";
        }

        goToEnvvarList () {
            this.template = "hosting/framework/envvar/FRAMEWORK_ENVVARS.html";
        }
    });
