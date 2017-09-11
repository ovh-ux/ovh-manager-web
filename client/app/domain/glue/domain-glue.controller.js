angular.module("App").controller(
    "controllers.Domain.Glue",
    class DomainTabGlueCtrl {
        constructor ($scope, Alerter, Domain) {
            this.$scope = $scope;
            this.Alerter = Alerter;
            this.Domain = Domain;
        }

        $onInit () {
            this.domain = this.$scope.ctrlDomain.domain;
            this.loading = false;
            this.glueDetails = [];

            this.$scope.$on("domain.tabs.glue.refresh", () => this.refreshTableGlues());
            this.$scope.$on("domain.DomainHostCreate.done", () => {
                this.refreshTableGlues();
                this.Alerter.resetMessage(this.$scope.alerts.dashboard);
            });
            this.$scope.$on("domain.DomainHostDelete.done", () => {
                this.refreshTableGlues();
                this.Alerter.resetMessage(this.$scope.alerts.dashboard);
            });
            this.$scope.$on("domain.DomainHostUpdate.done", () => {
                this.refreshTableGlues();
                this.Alerter.resetMessage(this.$scope.alerts.dashboard);
            });
            this.$scope.$on("$destroy", () => {
                this.Domain.killPollDomainHostCreate();
                this.Domain.killPollDomainHostDelete();
                this.Domain.killPollDomainHostUpdate();
            });

            this.Domain.restartPoll(this.domain.name, ["DomainHostCreate", "DomainHostDelete", "DomainHostUpdate"]);
            this.loadGlues();
        }

        loadGlues () {
            this.loading = true;
            this.glueHosts = null;

            return this.Domain
                .getGlueRecords(this.domain.name)
                .then((hosts) => {
                    this.glueHosts = hosts;
                })
                .catch((err) => this.Alerter.alertFromSWS(this.$scope.tr("domain_tab_GLUE_table_error"), _.get(err, "message", err), this.$scope.alerts.dashboard))
                .finally(() => {
                    if (_.isEmpty(this.glueHosts)) {
                        this.loading = false;
                    }
                });
        }

        refreshTableGlues () {
            return !this.loading && this.loadGlues();
        }

        transformItem (host) {
            return this.Domain.getGlueRecordDetail(this.domain.name, host);
        }

        onTransformItemDone () {
            this.loading = false;
        }
    }
);
