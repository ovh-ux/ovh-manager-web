import angular from 'angular';

import wucConverter from './converter';
import wucCron from './cron';
import wucCronValidator from './cron-validator';
import wucFileChange from './fileChange';
import wucProgressBarElementCounter from './progressBarElementCounter';
import wucValidator from './validator';

const moduleName = 'webUniverseComponents';

angular
  .module(moduleName, [
    wucConverter,
    wucCron,
    wucCronValidator,
    wucFileChange,
    wucProgressBarElementCounter,
    wucValidator,
  ]);

export default moduleName;
