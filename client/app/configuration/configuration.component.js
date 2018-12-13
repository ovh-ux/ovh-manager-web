{
  class Configuration {
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

          this.helpAndContact = this.constants.urls.FR.support;
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
  }

  angular
    .module('App')
    .component('configuration', {
      templateUrl: 'configuration/configuration.html',
      controller: Configuration,
    });
}
