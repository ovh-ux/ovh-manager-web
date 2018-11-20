import angular from 'angular';

import wucAllDom from './alldom';
import wucApi from './api';
import wucConverter from './converter';
import wucCron from './cron';
import wucCronValidator from './cron-validator';
import wucDuration from './duration';
import wucEmailDomain from './email-domain';
import wucExpiration from './expiration';
import wucFileChange from './fileChange';
import wucFileEditor from './fileEditor';
import wucIncrementNumber from './incrementNumber';
import wucJavaEnum from './java-enum';
import wucOvhFileReader from './ovhFileReader';
import wucProduct from './product';
import wucProgressBarElementCounter from './progressBarElementCounter';
import wucV6UiSwitch from './v6UiSwitch';

const moduleName = 'webUniverseComponents';

angular
  .module(moduleName, [
    wucAllDom,
    wucApi,
    wucConverter,
    wucCron,
    wucCronValidator,
    wucDuration,
    wucEmailDomain,
    wucExpiration,
    wucFileChange,
    wucFileEditor,
    wucIncrementNumber,
    wucJavaEnum,
    wucOvhFileReader,
    wucProduct,
    wucProgressBarElementCounter,
    wucV6UiSwitch,
  ]);

export default moduleName;
