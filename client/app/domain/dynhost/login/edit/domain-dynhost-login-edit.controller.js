angular.module("App").controller(
    "DomainDynHostLoginEditCtrl",
    class DomainDynHostLoginEditCtrl {
        constructor ($scope, $q, Alerter, Domain, Validator) {
            this.$scope = $scope;
            this.$q = $q;
            this.Alerter = Alerter;
            this.Domain = Domain;
            this.Validator = Validator;
        }

        $onInit () {
            this.login = angular.copy(this.$scope.currentActionData.login);
            this.product = angular.copy(this.$scope.currentActionData.product);

            this.const = {
                nbMinPassword: 8,
                nbMaxPassword: 31
            };
            this.data = { password: "" };
            this.loading = false;
            this.validation = { password: "" };

            this.$scope.updateLogin = () => this.updateLogin();
        }

        isPasswordMatches (input = null) {
            const valid = !!this.data.password && !!this.validation.password && this.data.password === this.validation.password;
            if (input && typeof input.$setValidity === "function") {
                input.$setValidity("match", valid);
            }
            return valid;
        }

        passwordCheck (input, confirm) {
            const length = this.data.password.length || 0;
            input.$setValidity("password", this.data.password === null || this.data.password === "" || (length >= this.const.nbMinPassword && length <= this.const.nbMaxPassword));
            this.isPasswordMatches(confirm);
        }

        subDomainCheck (input) {
            input.$setValidity("subdomain", this.login.subDomain === null || this.login.subDomain === "" || this.login.subDomain === "*" || this.Validator.isValidSubDomain(this.login.subDomain));
        }

        updateLogin () {
            this.loading = true;
            const promises = [
                this.Domain.updateDynHostLogin(this.product.name, this.login.login, {
                    subDomain: punycode.toASCII(this.login.subDomain)
                })
            ];

            if (this.data.password.length && this.isPasswordMatches()) {
                promises.push(
                    this.Domain.updateDynHostLoginPassword(this.product.name, this.login.login, {
                        password: this.data.password
                    })
                );
            }

            return this.$q
                .all(promises)
                .then(() => this.Domain.refreshZoneState(this.product.name).then(() => this.Alerter.success(this.$scope.tr("domain_tab_DYNHOSTLOGIN_edit_success"), this.$scope.alerts.main)))
                .catch((err) => this.Alerter.alertFromSWS(this.$scope.tr("domain_tab_DYNHOST_error"), _.get(err, "data", err), this.$scope.alerts.main))
                .finally(() => {
                    this.loading = false;
                    this.$scope.resetAction();
                });
        }
    }
);
