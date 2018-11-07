import angular from 'angular';

import wucConverter from './converter';
import wucCron from './cron';
import wucCronValidator from './cron-validator';
import wucFileChange from './fileChange';
import wucOvhFileReader from './ovhFileReader';
import wucProgressBarElementCounter from './progressBarElementCounter';

const moduleName = 'webUniverseComponents';

angular
  .module(moduleName, [
    wucConverter,
    wucCron,
    wucCronValidator,
    wucFileChange,
    wucOvhFileReader,
    wucProgressBarElementCounter,
  ]);

export default moduleName;
