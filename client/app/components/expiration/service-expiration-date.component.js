angular.module('directives').component('serviceExpirationDate', {
  templateUrl: 'components/expiration/service-expiration-date.component.html',
  bindings: {
    serviceInfos: '<',
    hideRenewAction: '<',
    serviceType: '@',
    serviceName: '<',
  },
  controller: 'ServiceExpirationDateComponentCtrl',
});
