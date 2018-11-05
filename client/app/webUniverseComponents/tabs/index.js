import angular from 'angular';
import translate from 'angular-translate';
import translateAsyncLoader from '@ovh-ux/translate-async-loader';

import 'angular-ui-bootstrap';

/* eslint-disable import/no-webpack-loader-syntax, import/no-unresolved, import/extensions */
import 'script-loader!@ovh-ux/ovh-utils-angular/bin/ovh-utils-angular.min.js';
import 'script-loader!@ovh-ux/ovh-utils-angular/lib/core.js';
import 'script-loader!df-tab-menu/build/df-tab-menu.min.js';
/* eslint-enable import/no-webpack-loader-syntax, import/no-unresolved, import/extensions */

import wucOvhTabsDirective from './tabs.directive';

const moduleName = 'wucTabs';

angular
  .module(moduleName, [
    'digitalfondue.dftabmenu',
    'ovh-utils-angular',
    translate,
    translateAsyncLoader,
    'ui.bootstrap',
  ])
  .directive('wucOvhTabs', wucOvhTabsDirective)
  .run(/* @ngInject */($translate, asyncLoader) => {
    asyncLoader.addTranslations(
      import(`./translations/Messages_${$translate.use()}.xml`)
        .catch(() => import(`./translations/Messages_${$translate.fallbackLanguage()}.xml`))
        .then(x => x.default),
    );
    $translate.refresh();
  });

export default moduleName;
