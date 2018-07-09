angular.module('App').controller(
  'DomainAttachedDomainSelectCtrl',
  class DomainAttachedDomainSelectCtrl {
    constructor($scope, $rootScope, $stateParams, $timeout, HostingDomain, Navigator) {
      this.$scope = $scope;
      this.$rootScope = $rootScope;
      this.$stateParams = $stateParams;
      this.$timeout = $timeout;
      this.HostingDomain = HostingDomain;
      this.Navigator = Navigator;
    }

    $onInit() {
      this.domainName = this.$stateParams.productId;
      this.loading = false;
      this.$scope.goToHosting = () => this.goToHosting();

      this.getAttachedDomains();
    }

    getAttachedDomains() {
      this.loading = true;
      return this.HostingDomain
        .getAttachedDomains(this.domainName)
        .then((data) => {
          if (_.isArray(data) && data.length > 0) {
            this.attachedDomains = data;
            this.selectedAttachedDomain = this.attachedDomains[0];
          } else {
            this.$scope.resetAction();
          }
        })
        .catch(() => this.$scope.resetAction())
        .finally(() => {
          this.loading = false;
        });
    }

    goToHosting() {
      this.$scope.resetAction();
      this.$timeout(() => {
        this.$rootScope.$broadcast('leftNavigation.selectProduct.fromName', {
          name: this.selectedAttachedDomain,
          type: 'HOSTING',
        });
        this.Navigator.navigate(`configuration/hosting/${this.selectedAttachedDomain}`);
      }, 500);
    }
  },
);
