angular.module('directives').directive('progressBarElementCounter', () => ({
  restrict: 'A',
  replace: true,
  scope: {
    nbElements: '=pbecNbElements',
    maxElements: '=pbecMaxElements',
    upperLimit: '=pbecUpperLimit',
  },
  templateUrl:
    'components/progressBarElementCounter/progressBarElementCounter.html',
  link($scope) {
    $scope.fakeElements = [];
    $scope.$watch('maxElements', (maxElements) => {
      if (maxElements != null && maxElements > 0) {
        $scope.fakeElements = _.fill(new Array(maxElements), true);
      }
    });
  },
}));
