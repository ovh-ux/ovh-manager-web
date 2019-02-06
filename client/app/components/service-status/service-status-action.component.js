import controller from './service-status-action.controller';
import template from './service-status-action.html';

angular.module('directives').component('serviceStatusAction', {
  bindings: {
    serviceInfos: '<',
    serviceName: '<',
    serviceType: '<',
  },
  controller,
  template,
});
