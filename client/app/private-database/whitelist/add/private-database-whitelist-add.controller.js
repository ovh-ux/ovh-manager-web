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
                    .catch((err) => {
                        const msg = _.get(err, "data.message");
                        let translationId = "privateDatabase_modale_whitelist_add_fail";

                        if (_.includes(msg, "This whitelist ip already exists")) {
                            translationId = "privateDatabase_modale_whitelist_add_fail_already_exists";
                        }

                        this.alerter.error(this.$scope.tr(translationId), "privateDataBase.alerts.whitelist");
                    })
                    .finally(() => this.$scope.resetAction());
            };
        }

        isIpValid (ip) {
            return this.validator.isValidIpv4Block(ip) || this.validator.isValidIpv4(ip);
        }

        isWhitelistValid () {
            return this.isIpValid(this.model.ip) && (this.model.service || this.model.sftp);
        }
    }
);
