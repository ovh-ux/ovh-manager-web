angular
  .module('App')
  .controller(
    'SessionCtrl',
    ($scope, $document, $translate, SessionService) => {
      $scope.$watch(() => $translate.instant('global_app_title'), () => {
        document.title = $translate.instant('global_app_title');
      });

      // FIX for /me/alerts
      $scope.$on('Navigator.navigationInformationsChange', (e, data) => {
        $scope.isLeftMenuVisible = data && data.leftMenuVisible;
      });

      // Scroll to anchor id
      $scope.scrollTo = (id) => {
        // Set focus to target
        if (_.isString(id)) {
          $document[0].getElementById(id).focus();
        }
      };

      // Get first base structure of the navbar, to avoid heavy loading
      SessionService.getNavbar().then((navbar) => {
        $scope.navbar = navbar;
        $scope.managerPreloadHide += ' manager-preload-hide';
        // Then get the products links, to build the reponsive menu
        SessionService.getResponsiveLinks().then((responsiveLinks) => {
          const servicesCount = _.chain(responsiveLinks)
            .find({ name: 'web' })
            .get('subLinks')
            .map('subLinks')
            .flatten()
            .size()
            .value();

          $scope.navbar.responsiveLinks = servicesCount < 500 ? responsiveLinks : [];
        });
      });
    },
  );
