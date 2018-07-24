angular.module('App').config(($stateProvider) => {
  $stateProvider.state('app.domain.general-informations', {
    url: '/informations',
    templateUrl: 'domain/general-informations/domain-general-informations.html',
    controller: 'DomainTabGeneralInformationsCtrl',
  });
});
