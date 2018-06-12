angular.module('App').config([
  '$routeProvider',
  function ($routeProvider) {
    $routeProvider.when('/upload', {
      templateUrl: 'components/upload/upload.html',
      resolve: {
        navigationInformations: [
          'Navigator',
          Navigator =>
            Navigator.setNavigationInformation({
              leftMenuVisible: true,
              configurationSelected: true,
            }),
        ],
      },
    });
  },
]);
