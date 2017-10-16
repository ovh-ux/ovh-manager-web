angular.module("App").controller(
    "HostingDomainAttachOrOrderCtrl",
    class HostingDomainAttachOrOrderCtrl {
        constructor ($scope, $rootScope, $window) {
            this.$scope = $scope;
            this.$rootScope = $rootScope;
            this.$window = $window;
        }

        $onInit () {
            this.model = {
                actions: {
                    ORDER: "ORDER",
                    ATTACH: "ATTACH"
                }
            };
            this.selected = {
                action: null
            };

            this.$scope.orderDomain = () => this.orderDomain();
        }

        orderDomain () {
            switch (this.selected.action) {
            case this.model.actions.ORDER:
                this.$window.open(this.$scope.urlDomainOrder);
                this.$scope.resetAction();
                break;
            case this.model.actions.ATTACH:
                this.$scope.setAction("multisite/add/hosting-multisite-add", { domains: this.$scope.domains });
                break;
            default:
                break;
            }
        }
    }
);
