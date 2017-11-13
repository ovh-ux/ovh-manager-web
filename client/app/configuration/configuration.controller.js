angular.module("App").controller(
    "ConfigurationCtrl",
    class ConfigurationCtrl {
        constructor ($scope, $route, Products, constants, User) {
            this.$scope = $scope;
            this.$route = $route;
            this.Products = Products;
            this.constants = constants;
            this.User = User;
        }

        $onInit () {
            this.guides = this.constants.TOP_GUIDES;

            this.User.getUser()
                .then((user) => {
                    this.allGuides = _.get(this.constants, `urls.${user.ovhSubsidiary}.guides.all`, this.constants.urls.FR.guides.all);
                })
                .catch(() => {
                    this.allGuides = this.constants.urls.FR.guides.all;
                });

            this.currentGuides = [];
            this.currentTypeOfGuide = null;

            this.unSelectProduct();
            this.selectTypeOfGuide("domainHosting");
        }

        unSelectProduct () {
            this.Products.removeSelectedProduct().then((p) => (this.$scope.product = p));
        }

        selectTypeOfGuide (typeOfGuide) {
            this.currentGuides = this.guides[typeOfGuide];
            this.currentTypeOfGuide = typeOfGuide;
        }
    }
);
