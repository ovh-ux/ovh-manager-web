angular.module('App').controller(
  'EmailsAccountsToCsvCtrl',
  class EmailsAccountsToCsvCtrl {
    constructor(
      $scope,
      $interval,
      $q,
      $stateParams,
      Alerter,
      Emails,
      exportCsv,
    ) {
      this.$scope = $scope;
      this.$interval = $interval;
      this.$q = $q;
      this.$stateParams = $stateParams;
      this.Alerter = Alerter;
      this.Emails = Emails;
      this.exportCsv = exportCsv;
    }

    $onInit() {
      this.intervalPromise = null;
      this.loading = { exportCsv: false };

      this.$scope.$on('$destroy', () => this.cancelExportPromise());
      this.$scope.cancelExport = () => this.cancelExport();
      this.$scope.exportAccounts = () => this.exportAccounts();
    }

    cancelExport() {
      this.cancelExportPromise();
      this.$scope.resetAction();
    }

    cancelExportPromise() {
      if (this.intervalPromise) {
        this.$interval.cancel(this.intervalPromise);
        this.intervalPromise = undefined;
      }
    }

    exportAccounts() {
      this.loading.exportCsv = true;
      const delegated = _.get(this.$scope.currentActionData, 'delegate', false);

      let emailsPromise;
      if (delegated) {
        emailsPromise = this.Emails.getDelegatedEmails(this.$stateParams.productId);
      } else {
        emailsPromise = this.Emails.getEmails(this.$stateParams.productId, {});
      }

      return emailsPromise.then((emails) => {
        let currentPull = 0;
        const requestsCount = 200;
        let quit = false;
        const requests = _.map(
          emails,
          id => (delegated
            ? this.Emails.getDelegatedEmail(id)
            : this.Emails.getEmail(this.$stateParams.productId, id)),
        );

        this.intervalPromise = this.$interval(() => {
          const pull = requests.slice(
            currentPull * requestsCount,
            (currentPull * requestsCount) + requestsCount,
          );
          currentPull += 1;

          if (pull.length <= 0) {
            quit = true;
            this.$interval.cancel(this.intervalPromise);
            return null;
          }

          return this.$q
            .all(pull)
            .then((accounts) => {
              const content = _.map(
                accounts,
                account => `${_.values(account).join(';')};`,
              ).join('\n');
              const header = `${_.keys(accounts[0]).join(';')};`;

              if (content && (emails.length < requestsCount || quit)) {
                const data = this.exportCsv.exportData({
                  datas: [header, content].join('\n'),
                  fileName: `export_emails_${moment().format('YYYY-MM-DD_HH:mm:ss')}.csv`,
                  separator: ';',
                });
                this.Alerter.success(
                  this.$scope.tr(
                    'email_tab_modal_accounts_export_csv_success',
                    [data],
                  ),
                  this.$scope.alerts.main,
                );
              }
            })
            .catch(err => this.Alerter.alertFromSWS(
              this.$scope.tr('email_tab_modal_accounts_export_csv_error'),
              err,
              this.$scope.alerts.main,
            ))
            .finally(() => {
              this.loading.exportCsv = false;
              this.$scope.resetAction();
            });
        }, 200);
      });
    }
  },
);
