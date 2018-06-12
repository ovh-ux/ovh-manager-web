angular.module('directives').directive('guides', [
  'User',
  User => ({
    restrict: 'A',
    templateUrl: 'components/guides/guides.html',
    scope: {
      guidesTitle: '=',
      guidesList: '=',
      tr: '=',
    },
    controller: [
      '$scope',
      ($scope) => {
        $scope.showGuidesStatus = [];
        $scope.showGuidesStatus[0] = false;
        $scope.guidesListDocuments = [];

        $scope.toggleGuides = (index) => {
          $scope.showGuidesStatus[index] = !$scope.showGuidesStatus[index];

          for (let i = 0; i < $scope.showGuidesStatus.length; i += 1) {
            if (i !== index) {
              $scope.showGuidesStatus[i] = false;
            }
          }
        };

        User.getUrlOf('OVHGuides').then((guides) => {
          if (guides && guides[$scope.guidesList]) {
            $scope.guideConfiguration = guides[$scope.guidesList];
          }
        });
      },
    ],
  }),
]);
