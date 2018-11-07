import _ from 'lodash';

import template from './progressBarElementCounter.html';

export default () => ({
  restrict: 'A',
  replace: true,
  scope: {
    nbElements: '=wucPbecNbElements',
    maxElements: '=wucPbecMaxElements',
    upperLimit: '=wucPbecUpperLimit',
  },
  template,
  link($scope) {
    $scope.fakeElements = [];
    $scope.$watch('maxElements', (maxElements) => {
      if (maxElements != null && maxElements > 0) {
        $scope.fakeElements = _.fill(new Array(maxElements), true);
      }
    });
  },
});
