import angular from 'angular';
import 'ovh-angular-http';
import 'ovh-angular-swimming-poll';

import WucEmails from './email-domain.service';

const moduleName = 'wucEmailDomain';

angular
  .module(moduleName, [
    'ovh-angular-http',
    'ovh-angular-swimming-poll',
  ])
  .service('WucEmails', WucEmails);

export default moduleName;
