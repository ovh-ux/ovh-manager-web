export const whoIsStatus = {
    PENDING: 'pending',
    INVALID_CONTACT: 'Invalid contact number',
};

export default {
  whoIsStatus,
};

angular.module('App').constant('DOMAIN', {
  whoIsStatus,
});
