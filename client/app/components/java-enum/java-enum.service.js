angular.module('services').service('JavaEnum', [
  function javaEnumService() {
    this.tr = enumValue => _.snakeCase(enumValue).toUpperCase();
  },
]);
