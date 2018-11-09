import angular from 'angular';
import translate from 'angular-translate';
import translateAsyncLoader from '@ovh-ux/translate-async-loader';

import wucDurationFilter from './durationFilter';

const moduleName = 'wucDuration';

angular
  .module(moduleName, [
    translate,
    translateAsyncLoader,
  ])
  .filter('wucDuration', wucDurationFilter)
  .run(/* @ngTranslationsInject ./translations */);

export default moduleName;
