angular
  .module('App')
  .controller(
    'configurationCtrl',
    class ConfigurationCtrl {
      constructor(
        $route,
        $scope,

        constants,
        User,
        WucProducts,
      ) {
        this.$route = $route;
        this.$scope = $scope;

        this.constants = constants;
        this.User = User;
        this.WucProducts = WucProducts;
      }

      $onInit() {
        this.guides = this.constants.TOP_GUIDES;

        this.currentGuides = [];
        this.currentTypeOfGuide = null;

        this.selectTypeOfGuide('domainHosting');

        return this.User
          .getUser()
          .then((user) => {
            this.allGuides = _.get(
              this.constants,
              `urls.${user.ovhSubsidiary}.guides.all`,
              this.constants.urls.FR.guides.all,
            );
          })
          .catch(() => {
            this.allGuides = this.constants.urls.FR.guides.all;
          })
          .then(() => this.unSelectProduct());
      }

      unSelectProduct() {
        return this.WucProducts
          .removeSelectedProduct()
          .then((p) => {
            this.$scope.product = p;
          });
      }

      selectTypeOfGuide(typeOfGuide) {
        this.currentGuides = this.guides[typeOfGuide];
        this.currentTypeOfGuide = typeOfGuide;
      }
    },
  );
