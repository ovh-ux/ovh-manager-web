import angular from 'angular';
import translate from 'angular-translate';
import translateAsyncLoader from '@ovh-ux/translate-async-loader';

import 'ovh-api-services';

import wucGuidesDirective from './guides.directive';
import wucGUIDES from './guides.constant';

import './guides.less';

const moduleName = 'wucGuides';

angular
  .module(moduleName, [
    'ovh-api-services',
    translate,
    translateAsyncLoader,
  ])
  .constant('WUC_GUIDES', wucGUIDES)
  .directive('wucGuides', wucGuidesDirective)
  .run(/* @ngTranslationsInject ./translations */);

export default moduleName;
