angular.module("App").controller(
    "DomainDnsAnycastActivateCtrl",
    class DomainDnsAnycastActivateCtrl {
        constructor ($scope, $stateParams, Alerter, Domain) {
            this.$scope = $scope;
            this.$stateParams = $stateParams;
            this.Alerter = Alerter;
            this.Domain = Domain;
        }

        $onInit () {
            this.domainName = this.$stateParams.productId;
            this.optionName = "dnsAnycast";
            this.loading = false;

            this.$scope.orderDnsanycast = () => this.orderDnsanycast();
            this.$scope.displayBC = () => this.displayBC();

            this.loadOptionDetails();
        }

        loadOptionDetails () {
            this.loading = true;
            return this.Domain
                .getOptionDetails(this.domainName, this.optionName)
                .then((data) => {
                    this.optionDetails = data;
                })
                .catch((err) => {
                    this.Alerter.alertFromSWS(this.$scope.tr("domain_configuration_dnsanycast_fail"), _.get(err, "data", err), this.$scope.alerts.main);
                    this.$scope.resetAction();
                })
                .finally(() => {
                    this.loading = false;
                });
        }

        orderDnsanycast () {
            this.url = null;
            this.loading = true;

            return this.Domain
                .orderOption(this.domainName, this.optionName, this.optionDetails.duration.duration)
                .then((order) => {
                    this.url = order.url;
                })
                .catch((err) => {
                    this.Alerter.alertFromSWS(this.$scope.tr("domain_configuration_dnsanycast_fail"), _.get(err, "data", err), this.$scope.alerts.main);
                    this.$scope.resetAction();
                })
                .finally(() => {
                    this.loading = false;
                });
        }

        displayBC () {
            this.$scope.resetAction();
            this.Alerter.success(this.$scope.tr("domain_order_dns_anycast_success", [this.url]), this.$scope.alerts.main);
            window.open(this.url, "_blank");
        }
    }
);
