import generalInformationState from './general-informations/domain-general-informations.state';
import dnsState from './dns/domain-dns.state';
import redirectionState from './redirection/domain-redirection.state';
import dynHostState from './dynhost/domain-dynhost.state';
import glueState from './glue/domain-glue.state';
import dnsSecState from './dnssec/domain-dnssec.state';
import tasksState from './tasks/domain-tasks.state';

angular.module('App').config(($stateProvider) => {
  $stateProvider.state('app.domain', {
    abstract: true,
    template: '<div ui-view></div>',
  });

  $stateProvider.state('app.domain.product', {
    url: '/configuration/domain/:productId',
    templateUrl: 'domain/domain.html',
    controller: 'DomainCtrl',
    controllerAs: 'ctrlDomain',
    reloadOnSearch: false,
    atInternet: {
      ignore: true, // this tell AtInternet to not track this state
    },
    redirectTo: 'app.domain.product.information',
    resolve: {
      currentSection: () => 'domain',
      domainName: /* @ngInject */ $transition$ => $transition$.params().productId,
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
    },
    translations: { value: ['../core', '../domain', '../email', '../hosting', '../domain-operation'], format: 'json' },
  });

  $stateProvider.state('app.domain.alldom', {
    url: '/configuration/all_dom/:allDom/:productId',
    templateUrl: 'domain/domain.html',
    controller: 'DomainCtrl',
    controllerAs: 'ctrlDomain',
    reloadOnSearch: false,
    redirectTo: 'app.domain.alldom.information',
    resolve: {
      currentSection: () => 'domain',
      domainName: /* @ngInject */ $transition$ => $transition$.params().productId,
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
    },
    translations: { value: ['../core', '../domain', '../email', '../hosting', '../domain-operation'], format: 'json' },
  });

  ['product', 'alldom'].forEach((stateType) => {
    // Clone state before using it as it will be modified by UI Router
    $stateProvider.state(`app.domain.${stateType}.information`, _.clone(generalInformationState));
    $stateProvider.state(`app.domain.${stateType}.dns`, _.clone(dnsState));
    $stateProvider.state(`app.domain.${stateType}.redirection`, _.clone(redirectionState));
    $stateProvider.state(`app.domain.${stateType}.dynhost`, _.clone(dynHostState));
    $stateProvider.state(`app.domain.${stateType}.glue`, _.clone(glueState));
    $stateProvider.state(`app.domain.${stateType}.dnssec`, _.clone(dnsSecState));
    $stateProvider.state(`app.domain.${stateType}.tasks`, _.clone(tasksState));
  });
});
