
export default /* @ngInject */ ($transitions, $http) => {
  $transitions.onStart({}, (transition) => {
    $http.defaults.headers.common['X-Ovh-Manager-State'] = `${transition.router.stateService.current.name}-${new Date().getTime()}`;
  });
};
