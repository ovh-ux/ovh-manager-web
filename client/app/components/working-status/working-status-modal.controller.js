angular.module('App').controller('WorkingStatusModal', [
  '$scope',
  ($scope) => {
    $scope.works = $scope.currentActionData;
  },
]);
