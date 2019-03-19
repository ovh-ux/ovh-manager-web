export const ALERTS = {
  tabs: 'domain_alert_tabs',
};

export const whoIsStatus = {
    PENDING: 'pending',
    INVALID_CONTACT: 'Invalid contact number',
};

export default {
  ALERTS,
  whoIsStatus,
};

angular.module('App').constant('DOMAIN', {
  ALERTS,
  whoIsStatus,
});
