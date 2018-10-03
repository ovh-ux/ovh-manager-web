angular.module('App').controller(
  'ConfigurationCtrl',
  class ConfigurationCtrl {
    constructor($route, $scope, $translate, constants, Products, User) {
      this.$route = $route;
      this.$scope = $scope;
      this.$translate = $translate;

      this.constants = constants;
      this.Products = Products;
      this.User = User;
    }

    $onInit() {
      this.guides = this.constants.TOP_GUIDES;

      this.buildSummitData();

      this.User.getUser()
        .then((user) => {
          this.allGuides = _.get(
            this.constants,
            `urls.${user.ovhSubsidiary}.guides.all`,
            this.constants.urls.FR.guides.all,
          );
        })
        .catch(() => {
          this.allGuides = this.constants.urls.FR.guides.all;
        });

      this.currentGuides = [];
      this.currentTypeOfGuide = null;

      this.unSelectProduct();
      this.selectTypeOfGuide('domainHosting');
    }

    buildSummitData() {
      this.localeForSummitBanner = this.$translate.use().split('_')[0] === 'fr' ? 'fr' : 'en';

      const subsidiariesWithSummitBanner = ['FR', 'GB', 'DE', 'ES'];
      this.shouldDisplayBanner = false;
      return this.User
        .getUser()
        .then(({ ovhSubsidiary }) => {
          this.shouldDisplayBanner = _(subsidiariesWithSummitBanner).includes(ovhSubsidiary);
        });
    }

    unSelectProduct() {
      this.Products.removeSelectedProduct().then((p) => {
        this.$scope.product = p;
      });
    }

    selectTypeOfGuide(typeOfGuide) {
      this.currentGuides = this.guides[typeOfGuide];
      this.currentTypeOfGuide = typeOfGuide;
    }
  },
);
