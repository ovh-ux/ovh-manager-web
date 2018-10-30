import angular from 'angular';

import wucCronValidator from './cron-validator';

const moduleName = 'webUniverseComponents';

angular
  .module(moduleName, [
    wucCronValidator,
  ]);

export default moduleName;
