angular.module('directives').directive('ovhEvent', () => ({
  restrict: 'A',
  link($scope, $elm, $attrs) {
    if (
      !!$attrs.ovhEvent
      && !!$attrs.ovhEventCallback
      && typeof $scope[$attrs.ovhEventCallback] === 'function'
    ) {
      if ($attrs.ovhEventTarget) {
        if ($attrs.ovhEventData) {
          $($elm).delegate(
            $attrs.ovhEventTarget,
            $attrs.ovhEvent,
            $attrs.ovhEventData,
            (evt) => {
              $scope[$attrs.ovhEventCallback]($attrs.ovhEventData, evt);
            },
          );
        } else {
          $($elm).delegate($attrs.ovhEventTarget, $attrs.ovhEvent, (evt) => {
            $scope[$attrs.ovhEventCallback](evt);
          });
        }
      } else if ($attrs.ovhEventData) {
        angular
          .element($elm)
          .bind($attrs.ovhEvent, $attrs.ovhEventData, (evt) => {
            $scope[$attrs.ovhEventCallback]($attrs.ovhEventData, evt);
          });
      } else {
        angular.element($elm).bind($attrs.ovhEvent, (evt) => {
          $scope[$attrs.ovhEventCallback](evt);
        });
      }
    }
  },
}));
