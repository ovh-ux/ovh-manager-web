import '@uirouter/angularjs';

import config from './ng-ovh-requests-tag-header.config';

const moduleName = 'ngOvhRequestsTagHeader';

angular
  .module(moduleName, [
    'ui.router',
  ])
  .run(config);

export default moduleName;
