angular.module("App")
    .controller("HostingFlushCdnCtrl", class HostingFlushCdnCtrl {
        constructor ($scope, $rootScope, $stateParams, Hosting, Alerter) {
            this.$scope = $scope;
            this.$rootScope = $rootScope;
            this.$stateParams = $stateParams;
            this.Hosting = Hosting;
            this.Alerter = Alerter;
        }

        $onInit () {
            this.loading = false;
            this.$scope.flushCdn = () => this.flushCdn();
        }

        flushCdn () {
            this.Hosting.flushCdn(this.$stateParams.productId)
                .then(() => {
                    this.Alerter.success(this.$scope.tr("hosting_dashboard_cdn_flush_success"), this.$scope.alerts.main);
                    this.$rootScope.$broadcast("hosting.cdn.flush.refresh");
                })
                .catch((err) => {
                    this.Alerter.alertFromSWS(this.$scope.tr("hosting_dashboard_cdn_flush_error"), _.get(err, "data", err), this.$scope.alerts.main);
                })
                .finally(() => {
                    this.$scope.resetAction();
                });
        }
    });
