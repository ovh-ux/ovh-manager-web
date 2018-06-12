angular.module('services').service('JavaEnum', [
  function () {
    this.tr = function (enumValue) {
      return _.snakeCase(enumValue).toUpperCase();
    };
  },
]);
