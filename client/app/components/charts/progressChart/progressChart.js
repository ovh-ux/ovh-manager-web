angular.module('directives').directive('progressChart', () => ({
  restrict: 'A',
  replace: true,
  scope: {
    data: '=chartdata',
    min: '@chartMin',
    max: '@chartMax',
    yellow: '@yellowLimit',
    red: '@redLimit',
  },
  template:
    '<div class="progress">'
    + "<div class=\"bar bar-success\" data-ng-style=\"{'width': progressGreen + '%'}\"></div> "
    + "<div class=\"bar bar-warning\" data-ng-style=\"{'width': progressYellow +'%'}\"></div>"
    + "<div class=\"bar bar-danger\" data-ng-style=\"{'width': progressRed + '%'}\"></div>"
    + '</div>',
  link($scope) {
    function computePercent(nStr, minStr, maxStr) {
      const min = parseInt(minStr, 10);
      const max = parseInt(maxStr, 10);
      const n = parseInt(nStr, 10);

      if (max - min !== 0) {
        return parseInt(((n - min) / (max - min)) * 100, 10);
      }

      return 0;
    }

    $scope.$watch(
      'data',
      (nv) => {
        if (nv !== undefined) {
          if (nv < $scope.min) {
            $scope.progressGreen = 0;
            $scope.progressYellow = 0;
            $scope.progressRed = 0;
          } else if (nv < $scope.yellow) {
            $scope.progressGreen = computePercent(nv, $scope.min, $scope.max);

            $scope.progressYellow = 0;
            $scope.progressRed = 0;
          } else {
            $scope.progressGreen = computePercent(
              $scope.yellow,
              $scope.min,
              $scope.max,
            );

            if (nv < $scope.red) {
              $scope.progressYellow = computePercent(nv, $scope.min, $scope.max)
                - $scope.progressGreen;
              $scope.progressRed = 0;
            } else {
              $scope.progressYellow = computePercent($scope.red, $scope.min, $scope.max)
                - $scope.progressGreen;
              if (nv < $scope.max) {
                $scope.progressRed = computePercent(nv, $scope.min, $scope.max)
                  - $scope.progressGreen
                  - $scope.progressYellow;
              } else {
                $scope.progressRed = computePercent($scope.max, $scope.min, $scope.max)
                  - $scope.progressGreen
                  - $scope.progressYellow;
              }
            }
          }
        }
      },
      true,
    );
  },
}));
