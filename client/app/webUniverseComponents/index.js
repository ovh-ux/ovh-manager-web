import angular from 'angular';

import wucConverter from './converter';
import wucCharts from './charts';
import wucCron from './cron';
import wucCronValidator from './cron-validator';
import wucFileChange from './fileChange';
import wucProgressBarElementCounter from './progressBarElementCounter';

const moduleName = 'webUniverseComponents';

angular
  .module(moduleName, [
    wucConverter,
    wucCharts,
    wucCron,
    wucCronValidator,
    wucFileChange,
    wucProgressBarElementCounter,
  ]);

export default moduleName;
