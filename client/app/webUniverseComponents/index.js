import angular from 'angular';

import wucConverter from './converter';
import wucCron from './cron';
import wucCronValidator from './cron-validator';
import wucExpiration from './expiration';
import wucFileChange from './fileChange';
import wucProgressBarElementCounter from './progressBarElementCounter';

const moduleName = 'webUniverseComponents';

angular
  .module(moduleName, [
    wucConverter,
    wucCron,
    wucCronValidator,
    wucExpiration,
    wucFileChange,
    wucProgressBarElementCounter,
  ]);

export default moduleName;
