import angular from 'angular';

import wucConverter from './converter';
import wucCron from './cron';
import wucCronValidator from './cron-validator';
import wucDuration from './duration';
import wucFileChange from './fileChange';
import wucProgressBarElementCounter from './progressBarElementCounter';

const moduleName = 'webUniverseComponents';

angular
  .module(moduleName, [
    wucConverter,
    wucCron,
    wucCronValidator,
    wucDuration,
    wucFileChange,
    wucProgressBarElementCounter,
  ]);

export default moduleName;
