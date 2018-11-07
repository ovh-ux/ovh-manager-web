import angular from 'angular';

import wucConverter from './converter';
import wucCron from './cron';
import wucCronValidator from './cron-validator';
import wucDuration from './duration';
import wucExpiration from './expiration';
import wucFileChange from './fileChange';
import wucFileEditor from './fileEditor';
import wucJavaEnum from './java-enum';
import wucOvhFileReader from './ovhFileReader';
import wucProgressBarElementCounter from './progressBarElementCounter';

const moduleName = 'webUniverseComponents';

angular
  .module(moduleName, [
    wucConverter,
    wucCron,
    wucCronValidator,
    wucDuration,
    wucExpiration,
    wucFileChange,
    wucFileEditor,
    wucJavaEnum,
    wucOvhFileReader,
    wucProgressBarElementCounter,
  ]);

export default moduleName;
