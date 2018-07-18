angular.module('services').service('Screenshot', [
  '$http',
  'constants',
  '$cacheFactory',
  function screenshot($http, constants, cache) {
    const swsScreenshotPath = `${constants.aapiRootPath}sws/screenshot`;
    const screenshotsCache = cache('SCREENSHOTS');

    this.getScreenshot = url => $http
      .get(swsScreenshotPath, {
        cache: screenshotsCache,
        params: {
          url,
        },
      })
      .then(response => (response ? response.data : null));
  },
]);
