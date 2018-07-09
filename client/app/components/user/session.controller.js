angular
  .module('App')
  .controller(
    'SessionCtrl',
    ($scope, $document, translator, SessionService) => {
      $scope.$watch('i18n.global_app_title', () => {
        translator.setTitle($scope.tr('global_app_title'));
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
          $scope.navbar.responsiveLinks = responsiveLinks;
        });
      });
    },
  );
