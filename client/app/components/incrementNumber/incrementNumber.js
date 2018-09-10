/* eslint-disable no-param-reassign */
angular.module('directives').directive('incrementNumber', () => ({
  require: 'ngModel',
  restrict: 'AE',
  scope: {
    id: '@?incrementNumberId',
    init: '=?incrementNumberInit',
    max: '=?incrementNumberMax',
    min: '=?incrementNumberMin',
    name: '@?incrementNumberName',
    size: '=?incrementNumberSize',
    ngDisabled: '=?',
    ngRequired: '=?',
    ngModel: '=',
    onChange: '&?incrementNumberOnChange',
  },
  templateUrl: 'components/incrementNumber/incrementNumber.html',
  link(scope, element, attrs, ngModelController) {
    const checkValidity = () => {
      ngModelController.$setValidity('min', !scope.isOverMin(true));
      ngModelController.$setValidity('max', !scope.isOverMax(true));
    };

    scope.name = scope.name || scope.id;
    scope.size = scope.size || 2;
    scope.ngModel = scope.init;

    ngModelController.$render = () => {
      checkValidity();

      if (scope.onChange) {
        scope.onChange();
      }
    };

    scope.isOverMin = (strict) => {
      const offset = strict ? 0 : 1;
      return (
        angular.isDefined(scope.min)
        && parseInt(scope.ngModel, 10) - offset < parseInt(scope.min, 10)
      );
    };

    scope.isOverMax = (strict) => {
      const offset = strict ? 0 : 1;
      return (
        angular.isDefined(scope.max)
        && parseInt(scope.ngModel, 10) + offset > parseInt(scope.max, 10)
      );
    };

    scope.increment = () => {
      scope.ngModel = parseInt(scope.ngModel, 10) + 1;
    };

    scope.decrement = () => {
      scope.ngModel = parseInt(scope.ngModel, 10) - 1;
    };
  },
}));
/* eslint-enable no-param-reassign */
