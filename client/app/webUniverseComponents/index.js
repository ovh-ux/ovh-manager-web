import angular from 'angular';

import wucConverter from './converter';

const moduleName = 'webUniverseComponents';

angular
  .module(moduleName, [
    wucConverter,
  ]);

export default moduleName;
