import controller from './service-status-action.controller';
import template from './service-status-action.html';

angular.module('App').component('serviceStatusAction', {
  bindings: {
    serviceInfos: '<',
    serviceName: '<',
    serviceType: '<',
  },
  controller,
  template,
})
  .run(/* @ngTranslationsInject ./translations */);
