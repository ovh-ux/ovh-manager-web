import _ from 'lodash';

export default class WebAppCtrl {
  /* @ngInject */
  constructor(
    $document,
    $scope,
    $translate,
    SessionService,
  ) {
    this.$document = $document;
    this.$scope = $scope;
    this.$translate = $translate;
    this.SessionService = SessionService;

    this.$onInit();
  }

  $onInit() {
    this.$scope.$watch(() => this.$translate.instant('global_app_title'), () => {
      document.title = this.$translate.instant('global_app_title');
    });

    // FIX for /me/alerts
    this.$scope.$on('Navigator.navigationInformationsChange', (e, data) => {
      this.$scope.isLeftMenuVisible = data && data.leftMenuVisible;
    });


    // Scroll to anchor id
    this.$scope.scrollTo = (id) => {
      // Set focus to target
      if (_.isString(id)) {
        this.$document[0].getElementById(id).focus();
      }
    };

    // Get first base structure of the navbar, to avoid heavy loading
    this.SessionService.getNavbar().then((navbar) => {
      this.$scope.navbar = navbar;
      this.$scope.managerPreloadHide += ' manager-preload-hide';
      // Then get the products links, to build the reponsive menu
      this.SessionService.getResponsiveLinks().then((responsiveLinks) => {
        const servicesCount = _.chain(responsiveLinks)
          .find({ name: 'web' })
          .get('subLinks')
          .map('subLinks')
          .flatten()
          .size()
          .value();

        this.$scope.navbar.responsiveLinks = servicesCount < 500 ? responsiveLinks : [];
      });
    });
  }
}

angular
  .module('App')
  .controller(
    'WebAppCtrl',
    WebAppCtrl,
  );
