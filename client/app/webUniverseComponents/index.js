import angular from 'angular';

import wucAllDom from './alldom';
import wucApi from './api';
import wucChartjs from './chartjs';
import wucConverter from './converter';
import wucCharts from './charts';
import wucCron from './cron';
import wucCronValidator from './cron-validator';
import wucDuration from './duration';
import wucEmailDomain from './email-domain';
import wucExpiration from './expiration';
import wucFileChange from './fileChange';
import wucFileEditor from './fileEditor';
import wucGuides from './guides';
import wucIncrementNumber from './incrementNumber';
import wucJavaEnum from './java-enum';
import wucOvhFileReader from './ovhFileReader';
import wucProduct from './product';
import wucProgressBarElementCounter from './progressBarElementCounter';
import wucString from './string';
import wucTabs from './tabs';
import wucV6UiSwitch from './v6UiSwitch';
import wucValidator from './validator';

const moduleName = 'webUniverseComponents';

angular
  .module(moduleName, [
    wucAllDom,
    wucApi,
    wucChartjs,
    wucConverter,
    wucCharts,
    wucCron,
    wucCronValidator,
    wucDuration,
    wucEmailDomain,
    wucExpiration,
    wucFileChange,
    wucFileEditor,
    wucGuides,
    wucIncrementNumber,
    wucJavaEnum,
    wucOvhFileReader,
    wucProduct,
    wucProgressBarElementCounter,
    wucString,
    wucTabs,
    wucV6UiSwitch,
    wucValidator,
  ]);

export default moduleName;
