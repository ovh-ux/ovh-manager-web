angular.module("App").controller(
    "HostingTabModulesController",
    class HostingTabModulesController {
        constructor ($scope, $stateParams, $window, Alerter, Hosting, HostingModule, User) {
            this.$scope = $scope;
            this.$stateParams = $stateParams;
            this.$window = $window;
            this.Alerter = Alerter;
            this.Hosting = Hosting;
            this.HostingModule = HostingModule;
            this.User = User;
        }

        $onInit () {

            this.$scope.$on("hosting.tabs.modules.refresh", () => {
                this.getModules(true);
            });

            this.Hosting.getSelected(this.$stateParams.productId)
                .then((hosting) => {
                    this.serviceState = hosting.serviceState;
                })
                .catch((err) => {
                    this.Alerter.alertFromSWS(this.$scope.tr("hosting_configuration_tab_modules_create_step1_loading_error"), _.get(err, "data", err), this.$scope.alerts.main);
                });

            this.User.getUrlOf("guides")
                .then((guides) => {
                    if (guides && guides.hostingModule) {
                        this.guide = guides.hostingModule;
                    }
                });

            this.getModules();
        }

        getModules (forceRefresh) {
            this.modules = null;

            return this.HostingModule.getModules(this.$stateParams.productId, { forceRefresh })
                .then((moduleIds) => {
                    this.modules = moduleIds.map((id) => ({ id }));
                    return this.modules;
                })
                .catch((err) => {
                    this.Alerter.alertFromSWS(this.$scope.tr("hosting_configuration_tab_modules_create_step1_loading_error"), err, this.$scope.alerts.main);
                });
        }

        transformItem (item) {
            return this.HostingModule.getModule(this.$stateParams.productId, item.id)
                .then((module) => this.HostingModule.getAvailableModule(module.moduleId)
                    .then((template) => {
                        module.template = template;
                        module.id = item.id;
                        return module;
                    }));
        }

        goToModule (module, target = "_blank") {
            this.$window.open(`http://${module.targetUrl}`, target);
        }
    }
);
