angular.module('App').controller('WorkingStatusModal', [
  '$scope',
  function ($scope) {
    $scope.works = $scope.currentActionData;
  },
]);
