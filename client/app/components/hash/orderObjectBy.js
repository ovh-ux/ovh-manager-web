angular.module('filters').filter('orderObjectBy', () => (arr, prop) => {
  _.each(arr, (item, key) => {
    item.key = key; // eslint-disable-line no-param-reassign
  });

  return _.sortBy(arr, prop);
});
