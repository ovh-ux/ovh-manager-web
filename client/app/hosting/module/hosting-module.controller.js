angular.module("App").controller(
    "HostingTabModulesController",
    class HostingTabModulesController {
        constructor ($scope, $stateParams, Alerter, Hosting, HostingModule, User) {
            this.$scope = $scope;
            this.$stateParams = $stateParams;
            this.Alerter = Alerter;
            this.Hosting = Hosting;
            this.HostingModule = HostingModule;
            this.User = User;
        }

        $onInit () {
            this.modules = {
                details: []
            };
            this.loading = true;

            this.$scope.$on("hosting.tabs.modules.refresh", () => {
                this.loadTab(true);
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

            this.loadTab();
        }

        loadTab (forceRefresh) {
            this.loading = true;
            this.modules.ids = null;

            return this.HostingModule.getModules(this.$stateParams.productId, { forceRefresh })
                .then((data) => {
                    this.modules.ids = data;
                })
                .catch((err) => {
                    this.Alerter.alertFromSWS(this.$scope.tr("hosting_configuration_tab_modules_create_step1_loading_error"), err, this.$scope.alerts.main);
                })
                .finally(() => {
                    if (_.isEmpty(this.modules.ids)) {
                        this.loading = false;
                    }
                });
        }

        transformItem (id) {
            return this.HostingModule.getModule(this.$stateParams.productId, id)
                .then((module) => this.HostingModule.getAvailableModule(module.moduleId)
                    .then((template) => {
                        module.template = template;
                        return module;
                    }));
        }

        onTransformItemDone () {
            this.loading = false;
        }
    }
);
