angular.module('App').config(($stateProvider) => {
  $stateProvider.state('app', {
    abstract: true,
    url: '',
    controller: 'AppCtrl',
    controllerAs: 'AppCtrl',
    templateUrl: 'app.html',
  });

  $stateProvider.state('app.microsoft', {
    abstract: true,
    template: '<div ui-view></div>',
  });
});
