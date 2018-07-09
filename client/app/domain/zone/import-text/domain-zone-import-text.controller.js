angular.module('App').controller(
  'DomainZoneImportTextCtrl',
  class DomainZoneImportTextCtrl {
    constructor($scope, Alerter, Domain) {
      this.$scope = $scope;
      this.Alerter = Alerter;
      this.Domain = Domain;
    }

    $onInit() {
      this.domain = this.$scope.currentActionData;
      this.loading = false;
      this.model = { zoneDnsText: '' };
      this.$scope.importDnsText = () => this.importDnsText();

      this.exportDnsText();
    }

    exportDnsText() {
      this.loading = true;
      return this.Domain.exportDnsText(this.domain.name)
        .then((dnsText) => {
          this.model.zoneDnsText = dnsText
            .replace(/\\n/gi, '\n')
            .replace(/\\t/gi, '  ')
            .replace(/\\/gi, '');
        })
        .finally(() => {
          this.loading = false;
        });
    }

    importDnsText() {
      this.loading = true;
      return this.Domain.importDnsText(this.domain.name, {
        zoneFile: this.model.zoneDnsText,
      })
        .then(() =>
          this.Alerter.success(
            this.$scope.tr('domain_configuration_dns_importtext_success'),
            this.$scope.alerts.main,
          ))
        .catch(err =>
          this.Alerter.alertFromSWS(
            this.$scope.tr('domain_configuration_dns_importtext_error'),
            err,
            this.$scope.alerts.main,
          ))
        .finally(() => {
          this.loading = false;
          this.$scope.resetAction();
        });
    }
  },
);
