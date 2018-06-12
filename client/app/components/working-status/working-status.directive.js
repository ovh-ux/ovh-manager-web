angular.module('directives').directive('workingStatus', [
  '$timeout',
  'Products',
  function ($timeout, Products) {
    return {
      restrict: 'A',
      scope: {
        modalId: '=',
        worksDetails: '=',
        statusDone: '=',
        productType: '=',
        tr: '=',
      },
      templateUrl: 'components/working-status/working-status.html',
      controller: [
        '$scope',
        function (scope) {
          let statusDone = [];

          if (Array.isArray(scope.statusDone)) {
            statusDone = scope.statusDone.map(status => status.toLowerCase());
          }
          if (scope.productType) {
            Products.getWorks(scope.productType).then((works) => {
              scope.worksDetails = works.items.filter(work => statusDone.indexOf(work.details.status.toLowerCase()) === -1);
            });
          }

          scope.closeModal = () => scope.openListModal(false);

          scope.openListModal = (data) => {
            scope.currentActionData = data;
            if (scope.currentActionData) {
              scope.worksStepPath = 'components/working-status/working-status-modal.html';
              $(`#${scope.modalId}`).modal({
                keyboard: true,
                backdrop: 'static',
              });
            } else {
              $(`#${scope.modalId}`).modal('hide');
              scope.currentActionData = null;
            }
          };
        },
      ],
    };
  },
]);
