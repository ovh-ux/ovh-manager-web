(() => {
  angular.module('directives').component('serviceStatusAction', {
    templateUrl: 'components/service-status/service-status-action.component.html',
    bindings: {
      serviceInfos: '<',
      hideRenewAction: '<',
      forceHideRenewAction: '<',
      hideRenewDate: '<',
      serviceType: '<',
      serviceName: '<',
      inline: '<',
    },
    controller: 'serviceStatusActionComponentCtrl',
  });
})();
