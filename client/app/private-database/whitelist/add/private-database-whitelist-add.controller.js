angular.module("App").controller(
    "PrivateDatabaseAddWhitelistCtrl",
    class PrivateDatabaseAddWhitelistCtrl {
        constructor (Alerter, WhitelistService, $rootScope, $scope, $stateParams, Validator) {
            this.alerter = Alerter;
            this.whitelistService = WhitelistService;
            this.$rootScope = $rootScope;
            this.$scope = $scope;
            this.$stateParams = $stateParams;
            this.validator = Validator;
        }

        $onInit () {
            this.productId = this.$stateParams.productId;

            this.model = {
                ip: "",
                name: "",
                service: false,
                sftp: false
            };

            this.$scope.addWhitelist = () => {
                this.whitelistService
                    .createWhitelist(this.productId, this.model)
                    .then(() => {
                        this.alerter.success(this.$scope.tr("privateDatabase_modale_whitelist_add_success"), "privateDataBase.alerts.whitelist");
                    })
                    .catch(() => {
                        this.alerter.error(this.$scope.tr("privateDatabase_modale_whitelist_add_fail"), "privateDataBase.alerts.whitelist");
                    })
                    .finally(() => this.$scope.resetAction());
            };
        }

        isIpValid (ip) {
            return this.validator.isIPv4Valid(ip, { includeCIDR: true });
        }

        isWhitelistValid () {
            return this.isIpValid(this.model.ip) && (this.model.service || this.model.sftp);
        }
    }
);
