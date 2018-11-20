angular.module('App').controller(
  'ConfigurationCtrl',
  class ConfigurationCtrl {
    constructor(
      $scope,
      $route,
      WucProducts,
      constants,
      User,
    ) {
      this.$scope = $scope;
      this.$route = $route;
      this.WucProducts = WucProducts;
      this.constants = constants;
      this.User = User;
    }

    $onInit() {
      this.guides = this.constants.TOP_GUIDES;

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

    unSelectProduct() {
      this.WucProducts.removeSelectedProduct().then((p) => {
        this.$scope.product = p;
      });
    }

    selectTypeOfGuide(typeOfGuide) {
      this.currentGuides = this.guides[typeOfGuide];
      this.currentTypeOfGuide = typeOfGuide;
    }
  },
);
