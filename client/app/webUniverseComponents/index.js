import angular from 'angular';

import wucConverter from './converter';
import wucCron from './cron';
import wucCronValidator from './cron-validator';
import wucFileChange from './fileChange';
import wucTabs from './tabs';

const moduleName = 'webUniverseComponents';

angular
  .module(moduleName, [
    wucConverter,
    wucCron,
    wucCronValidator,
    wucFileChange,
    wucTabs,
  ]);

export default moduleName;
