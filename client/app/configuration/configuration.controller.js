export default class ConfigurationCtrl {
    constructor ($scope, $route, Products, constants, User, atInternet) {
        this.$scope = $scope;
        this.$route = $route;
        this.Products = Products;
        this.constants = constants;
        this.User = User;
        this.atInternet = atInternet;
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

        this.$scope.onBannerClick = () => this.onBannerClick();

        this.unSelectProduct();
        this.selectTypeOfGuide("domainHosting");
    }

    onBannerClick () {
        this.atInternet.trackClick({
            name: "summitBanner",
            type: "action"
        });
    }

    unSelectProduct () {
        this.Products.removeSelectedProduct().then((p) => (this.$scope.product = p));
    }

    selectTypeOfGuide (typeOfGuide) {
        this.currentGuides = this.guides[typeOfGuide];
        this.currentTypeOfGuide = typeOfGuide;
    }
}
