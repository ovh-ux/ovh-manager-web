angular.module('filters').filter('orderObjectBy', () => function (arr, prop) {
  _.each(arr, (item, key) => {
    item.key = key;
  });

  return _.sortBy(arr, prop);
});
