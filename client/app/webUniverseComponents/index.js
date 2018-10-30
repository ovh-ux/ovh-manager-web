import angular from 'angular';

import wucCron from './cron';
import wucCronValidator from './cron-validator';

const moduleName = 'webUniverseComponents';

angular
  .module(moduleName, [
    wucCron,
    wucCronValidator,
  ]);

export default moduleName;
