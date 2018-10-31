import angular from 'angular';
import translate from 'angular-translate';
import translateAsyncLoader from '@ovh-ux/translate-async-loader';

import 'angular-xeditable';

import wucFileEditorDirective from './file-editor.directive';

import './file-editor.less';

const moduleName = 'wucFileEditor';

angular
  .module(moduleName, [
    translate,
    translateAsyncLoader,
    'xeditable',
  ])
  .directive('wucFileEditor', wucFileEditorDirective)
  .run(/* @ngInject */($translate, asyncLoader) => {
    asyncLoader.addTranslations(
      import(`./translations/Messages_${$translate.use()}.xml`)
        .catch(() => import(`./translations/Messages_${$translate.fallbackLanguage()}.xml`))
        .then(x => x.default),
    );
    $translate.refresh();
  });

export default moduleName;
