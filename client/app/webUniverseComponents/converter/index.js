import angular from 'angular';

import WucConverterService from './converter.service';

const moduleName = 'wucConverter';

angular
  .module(moduleName, [])
  .service('WucConverterService', WucConverterService);

export default moduleName;
