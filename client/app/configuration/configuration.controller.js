angular.module("App").controller(
    "ConfigurationCtrl",
    class ConfigurationCtrl {
        constructor ($scope, $route, Products, constants) {
            this.$scope = $scope;
            this.$route = $route;
            this.Products = Products;
            this.constants = constants;

            this.guides = this.constants.TOP_GUIDES;
            this.allGuides = this.constants.urls.FR.guides.all;

            this.currentGuides = [];
            this.currentTypeOfGuide = null;
        }

        unSelectProduct () {
            this.Products.removeSelectedProduct().then((p) => (this.$scope.product = p));
        }

        selectTypeOfGuide (typeOfGuide) {
            this.currentGuides = this.guides[typeOfGuide];
            this.currentTypeOfGuide = typeOfGuide;
        }

        $onInit () {
            this.unSelectProduct();
            this.selectTypeOfGuide("domainHosting");
        }
    }
);
