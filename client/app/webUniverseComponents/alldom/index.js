import angular from 'angular';
import 'ovh-angular-http';

import WucAllDom from './domain-alldom.service';

const moduleName = 'wucAllDom';

angular
  .module(moduleName, [
    'ovh-angular-http',
  ])
  .service('WucAllDom', WucAllDom);

export default moduleName;
