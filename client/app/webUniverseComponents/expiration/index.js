import angular from 'angular';
import translate from 'angular-translate';
import translateAsyncLoader from '@ovh-ux/translate-async-loader';

import WucServiceExpirationDateComponentCtrl from './service-expiration-date.component.controller';
import wucServiceExpirationDate from './service-expiration-date.component';

import './service-expiration-date.component.less';

const moduleName = 'wucExpiration';

angular
  .module(moduleName, [
    translate,
    translateAsyncLoader,
  ])
  .component('wucServiceExpirationDate', wucServiceExpirationDate)
  .controller('WucServiceExpirationDateComponentCtrl', WucServiceExpirationDateComponentCtrl)
  .run(/* @ngInject */($translate, asyncLoader) => {
    asyncLoader.addTranslations(
      import(`./translations/Messages_${$translate.use()}.xml`)
        .catch(() => import(`./translations/Messages_${$translate.fallbackLanguage()}.xml`))
        .then(x => x.default),
    );
    $translate.refresh();
  });

export default moduleName;
