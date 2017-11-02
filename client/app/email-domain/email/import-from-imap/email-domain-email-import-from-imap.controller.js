angular.module("App").controller(
    "EmailsImportFromImapCtrl",
    class EmailsImportFromImapCtrl {
        /**
         * Constructor
         * @param $scope
         * @param Alerter
         * @param Emails
         */
        constructor ($scope, Alerter, Emails) {
            this.$scope = $scope;
            this.Alerter = Alerter;
            this.Emails = Emails;
        }

        $onInit () {
            this.account = this.$scope.currentActionData;
            this.model = {
                useSSL: true
            };

            this.$scope.importFromImap = () => this.importFromImap();
        }

        importFromImap () {
            const data = {
                from: {
                    SSL: this.model.useSSL,
                    account: this.model.accountName,
                    password: this.model.accountPassword,
                    serverIMAP: this.model.serverAddress
                },
                to: {
                    SSL: true,
                    account: `${this.account.accountName}@${this.account.domain}`,
                    password: this.model.accountPasswordOVH,
                    serverIMAP: "ssl0.ovh.net"
                }
            };

            return this.Emails
                .imapCopy(data)
                .then(() => this.Alerter.success(this.$scope.tr("email_tab_modal_import_from_imap_success"), this.$scope.alerts.main))
                .catch((err) => this.Alerter.alertFromSWS(this.$scope.tr("email_tab_modal_import_from_imap_error"), _.get(err, "data", err), this.$scope.alerts.main))
                .finally(() => this.$scope.resetAction());
        }
    }
);
