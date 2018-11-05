import angular from 'angular';

import wucConverter from './converter';
import wucCron from './cron';
import wucCronValidator from './cron-validator';
import wucFileChange from './fileChange';
import wucJavaEnum from './java-enum';

const moduleName = 'webUniverseComponents';

angular
  .module(moduleName, [
    wucConverter,
    wucCron,
    wucCronValidator,
    wucFileChange,
    wucJavaEnum,
  ]);

export default moduleName;
