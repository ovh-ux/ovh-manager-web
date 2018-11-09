import angular from 'angular';
import _ from 'lodash';

export default class {
  constructor($scope, $rootScope) {
    'ngInject';

    $scope.tr = $rootScope.tr;
  }

  $onInit() {
    if (
      !angular.isObject(this.serviceInfos)
      || !_.isString(this.serviceName)
    ) {
      throw new Error('serviceExpirationDate: Missing parameter(s)');
    }
  }

  getRenewUrl() {
    const url = `#/billing/autoRenew?searchText=${this.serviceName}`;
    if (_.isString(this.serviceType)) {
      return `${url}&selectedType=${this.serviceType}`;
    }
    return url;
  }

  getExpirationClass() {
    if (this.isExpired()) {
      return 'expired';
    }

    if (this.isAutoRenew()) {
      return '';
    }

    const diff = moment(this.serviceInfos.expiration).diff(moment(), 'days');

    if (diff >= 7 && diff <= 15) {
      return 'expired15';
    }
    if (diff >= 1 && diff < 7) {
      return 'expired7';
    }
    if (diff <= 0) {
      return 'expired';
    }
    return '';
  }

  isAutoRenew() {
    return (
      this.serviceInfos.renew
      && (this.serviceInfos.renew.automatic || this.serviceInfos.renew.forced)
    );
  }

  isExpired() {
    const diff = moment(this.serviceInfos.expiration).diff(moment(), 'days');
    return (
      this.serviceInfos.expiration
      && (diff <= 0 || this.serviceInfos.status === 'expired')
    );
  }
}
