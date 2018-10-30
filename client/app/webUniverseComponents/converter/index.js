import angular from 'angular';
import translate from 'angular-translate';

import WucConverterService from './converter.service';

const moduleName = 'wucConverter';

angular
  .module(moduleName, [
    translate,
  ])
  .service('WucConverterService', WucConverterService);

export default moduleName;
