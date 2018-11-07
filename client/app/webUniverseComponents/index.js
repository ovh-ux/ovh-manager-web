import angular from 'angular';

import wucConverter from './converter';
import wucCron from './cron';
import wucCronValidator from './cron-validator';
import wucFileChange from './fileChange';
import wucProgressBarElementCounter from './progressBarElementCounter';
import wucV6UiSwitch from './v6UiSwitch';

const moduleName = 'webUniverseComponents';

angular
  .module(moduleName, [
    wucConverter,
    wucCron,
    wucCronValidator,
    wucFileChange,
    wucProgressBarElementCounter,
    wucV6UiSwitch,
  ]);

export default moduleName;
