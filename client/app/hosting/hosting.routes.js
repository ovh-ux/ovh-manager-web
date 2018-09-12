angular.module('App').config(($stateProvider) => {
  $stateProvider.state('app.hosting', {
    url: '/configuration/hosting/:productId?tab',
    templateUrl: 'hosting/hosting.html',
    controller: 'HostingCtrl',
    reloadOnSearch: false,
    params: {
      tab: null,
    },
    resolve: {
      navigationInformations: [
        'Navigator',
        '$rootScope',
        (Navigator, $rootScope) => {
          $rootScope.currentSectionInformation = 'hosting'; // eslint-disable-line no-param-reassign
          return Navigator.setNavigationInformation({
            leftMenuVisible: true,
            configurationSelected: true,
          });
        },
      ],
    },
    translations: ['hosting'],
  });
});
