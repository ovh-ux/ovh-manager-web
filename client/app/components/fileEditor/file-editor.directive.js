angular.module('directives').directive('fileEditor', [
  '$anchorScroll',
  '$location',
  ($anchorScroll, $location) => ({
    restrict: 'A',
    templateUrl: 'components/fileEditor/file-editor.html',
    scope: {
      fileEditorItemValidator: '=',
      fileEditorNewItem: '=',
      fileEditorExistingItems: '=',
      fileEditorMatchExistingItems: '=?',
      fileEditorErrors: '=',
      tr: '=',
      trpl: '=',
      ngModel: '=',
    },
    link: ($scope, element) => {
      const $editor = element.find('.editor');
      const $inputFile = $(element).find('input[type=file]');

      $scope.fileEditorMatchExistingItems = angular.isDefined($scope.fileEditorMatchExistingItems)
        ? $scope.fileEditorMatchExistingItems
        : false;

      $scope.fileModel = {
        value: '',
      };

      $scope.newItem = {
        value: $scope.fileEditorNewItem,
      };

      $scope.loader = false;

      $scope.checkAddItem = (item) => {
        if ($scope.fileEditorMatchExistingItems) {
          if ($scope.fileEditorExistingItems.indexOf(item) === -1) {
            $scope.newItem = {
              value: $scope.fileEditorNewItem,
            };
            return false;
          }
          return true;
        }

        if (!item || !$scope.fileEditorItemValidator(item)) {
          $scope.newItem = {
            value: $scope.fileEditorNewItem,
          };
          return false;
        }

        return $scope.fileEditorItemValidator(item);
      };

      $scope.addItem = (data) => {
        if (data) {
          $scope.ngModel.push(data);
          $scope.newItem = {
            value: $scope.fileEditorNewItem,
          };
        } else {
          $scope.newItem = {
            value: $scope.fileEditorNewItem,
          };
        }
      };

      $scope.goToAddItem = () => {
        $location.hash('add-new-item');
        $anchorScroll();
      };

      $scope.removeItem = (item) => {
        _.remove($scope.ngModel, it => it === item);
      };

      $scope.removeAll = () => {
        $scope.ngModel = [];
        $inputFile.val(null);
        $scope.fileModel = {
          value: '',
        };
      };

      $scope.goToNextError = () => {
        const nextError = _.findIndex(
          $scope.ngModel,
          item => !$scope.fileEditorItemValidator(item),
        );
        if (nextError !== -1) {
          $location.hash(`err-${nextError}`);
          $anchorScroll();
        }
      };

      $editor.scroll(() => {
        $scope.$apply(() => {
          $scope.showButtonAdd = $editor.scrollTop() > 40;
        });
      });

      $scope.$watch('fileModel.value', () => {
        $scope.loader = true;
        if ($scope.fileModel.value) {
          $scope.ngModel = _.uniq($scope.fileModel.value.trim().split(/\s/g));

          if (!$scope.fileEditorMatchExistingItems) {
            $scope.ngModel = $scope.ngModel
              .filter(item => !!item && $scope.fileEditorExistingItems.indexOf(item) === -1);
          } else {
            $scope.ngModel = $scope.ngModel
              .filter(item => $scope.fileEditorExistingItems.indexOf(item) !== -1);
          }
        } else {
          $scope.ngModel = [];
        }
        $scope.loader = false;
      });

      $scope.$watch(
        'ngModel',
        () => {
          if (Array.isArray($scope.ngModel)) {
            if ($scope.ngModel.length === 0) {
              $scope.removeAll();
            }

            $scope.fileEditorErrors = $scope.ngModel
              .filter(item => !$scope.fileEditorItemValidator(item));
          }
        },
        true,
      );
    },
  }),
]);
