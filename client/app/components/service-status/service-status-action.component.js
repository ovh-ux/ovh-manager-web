(() => {
  angular.module('directives').component('serviceStatusAction', {
    templateUrl: 'components/service-status/service-status-action.component.html',
    bindings: {
      serviceInfos: '<',
      serviceType: '<',
      serviceName: '<',
    },
    controller: 'serviceStatusActionComponentCtrl',
  });
})();
