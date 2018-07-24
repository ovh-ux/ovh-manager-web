angular.module('App').config(($stateProvider) => {
  $stateProvider.state('app.domain', {
    abstract: true,
    template: '<div ui-view></div>',
  });

  $stateProvider.state('app.domain.product', {
    url: '/configuration/domain/:productId?tab',
    templateUrl: 'domain/domain.html',
    controller: 'DomainCtrl',
    controllerAs: 'ctrlDomain',
    reloadOnSearch: false,
    params: {
      tab: null,
    },
    resolve: {
      currentSection: () => 'domain',
      navigationInformations: [
        'Navigator',
        '$rootScope',
        (Navigator, $rootScope) => {
          $rootScope.currentSectionInformation = 'domain'; // eslint-disable-line no-param-reassign
          return Navigator.setNavigationInformation({
            leftMenuVisible: true,
            configurationSelected: true,
          });
        },
      ],
      translator: [
        'translator',
        translator => translator
          .load(['domain', 'email', 'hosting', 'domainsOperations'])
          .then(() => translator),
      ],
    },
  });

  $stateProvider.state('app.domain.alldom', {
    url: '/configuration/all_dom/:allDom/:productId?tab',
    templateUrl: 'domain/domain.html',
    controller: 'DomainCtrl',
    controllerAs: 'ctrlDomain',
    reloadOnSearch: false,
    params: {
      tab: null,
    },
    resolve: {
      currentSection: () => 'domain',
      navigationInformations: [
        'Navigator',
        '$rootScope',
        (Navigator, $rootScope) => {
          $rootScope.currentSectionInformation = 'all_dom'; // eslint-disable-line no-param-reassign
          return Navigator.setNavigationInformation({
            leftMenuVisible: true,
            configurationSelected: true,
          });
        },
      ],
      translator: [
        'translator',
        translator => translator
          .load(['domain', 'email', 'hosting', 'domainsOperations'])
          .then(() => translator),
      ],
    },
  });
});
