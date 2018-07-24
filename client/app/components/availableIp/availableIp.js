angular.module('directives').directive('availableIps', () => ({
  restrict: 'A',
  replace: true,
  scope: {
    nbIps: '=',
    maxIps: '=',
  },
  template:
    '<div class="availableIp" style="display:inline">'
    + '<i class="availableIp-breadcrumb" data-ng-repeat="fakeIp in fakeIps" data-ng-class="{active: $index+1 <= nbIps, inactive:$index+1 > nbIps}"></i>'
    + '<span class="availableIp-number">{{nbIps}}/{{maxIps}}</span>'
    + '</div>',
  link($scope) {
    $scope.fakeIps = [];

    $scope.$watch('maxIps', (maxIps) => {
      if (maxIps !== undefined) {
        for (let i = maxIps; i > 0; i -= 1) {
          $scope.fakeIps.push(i);
        }
      }
    });
  },
}));
