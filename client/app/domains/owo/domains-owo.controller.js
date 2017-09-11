angular.module("App").controller(
    "DomainsOwoCtrl",
    class DomainsOwoCtrl {
        /**
         * Constructor
         * @param $scope
         * @param DomainsOwo
         * @param Alerter
         */
        constructor ($scope, DomainsOwo, Alerter) {
            this.$scope = $scope;
            this.DomainsOwo = DomainsOwo;
            this.Alerter = Alerter;
        }

        $onInit () {
            this.activated = [];
            this.desactivated = [];
            this.domainsOwoMessages = {
                OK: this.$scope.tr("domains_configuration_whois_success"),
                PARTIAL: this.$scope.tr("domains_configuration_whois_partial"),
                ERROR: this.$scope.tr("domains_configuration_whois_fail")
            };
            this.fields = null;
            this.fieldsModel = {};
            this.selectedDomainsNames = [];

            if (this.$scope.currentActionData) {
                this.selectedDomainsNames.push(this.$scope.currentActionData.name);
            } else {
                this.selectedDomainsNames = this.$scope.getSelectedDomains();
            }

            this.$scope.loadOwoFields = () => {
                this.fields = this.DomainsOwo.getOwoFields().then((data) => (this.fields = data)).catch((err) => {
                    this.$scope.resetAction();
                    this.Alerter.alertFromSWS(this.$scope.tr("domains_configuration_whois_fail"), err, this.$scope.alerts.dashboard);
                });
            };

            this.$scope.updateOwo = () => {
                this.$scope.resetAction();
                this.DomainsOwo
                    .updateOwoFields(this.activated, this.desactivated, this.selectedDomainsNames)
                    .then((data) => this.Alerter.alertFromSWSBatchResult(this.domainsOwoMessages, data, this.$scope.alerts.dashboard))
                    .catch((err) => this.Alerter.alertFromSWS(this.$scope.tr("domains_configuration_whois_fail"), err, this.$scope.alerts.dashboard));
            };
        }

        activateOwoFieldStatus (field) {
            this.resetOwoField(field);
            this.activated.push(field);
        }

        desactivateOwoFieldStatus (field) {
            this.resetOwoField(field);
            this.desactivated.push(field);
        }

        resetOwoField (field) {
            const activatedIndex = this.activated.indexOf(field);
            const desactivatedIndex = this.desactivated.indexOf(field);

            if (activatedIndex !== -1) {
                this.activated = this.activated.splice(activatedIndex + 1, 1);
            }
            if (desactivatedIndex !== -1) {
                this.desactivated = this.desactivated.splice(desactivatedIndex + 1, 1);
            }
        }
    }
);
