angular.module('App').controller(
  'DomainsDnssecBatchCtrl',
  class DomainsDnssecBatchCtrl {
    /**
     * Constructor
     * @param $scope
     * @param DomainsDnsSec
     * @param Alerter
     * @param User
     */
    constructor($scope, DomainsDnsSec, Alerter, User) {
      this.$scope = $scope;
      this.DomainsDnsSec = DomainsDnsSec;
      this.Alerter = Alerter;
      this.User = User;
    }

    $onInit() {
      this.selected = {
        domainsNames: this.$scope.getSelectedDomains(),
        state: null,
      };

      this.User.getUrlOf('dnssec_service')
        .then((link) => {
          this.dnssec_service_url = link;
        })
        .catch(() => {
          this.dnssec_service_url = null;
        });

      this.$scope.updateDnssec = () => {
        this.$scope.resetAction();
        return this.DomainsDnsSec.updateDnssecState(
          this.selected.state,
          this.selected.domainsNames,
        )
          .then(data => this.Alerter.alertFromSWSBatchResult(
            {
              OK: this.$scope.tr('domains_configuration_dnssec_batch_success'),
              PARTIAL: this.$scope.tr('domains_configuration_dnssec_batch_partial'),
              ERROR: this.$scope.tr('domains_configuration_dnssec_batch_fail'),
            },
            data,
            this.$scope.alerts.main,
          ))
          .catch(err => this.Alerter.alertFromSWS(
            this.$scope.tr('domains_configuration_dnssec_batch_fail'),
            err,
            this.$scope.alerts.main,
          ));
      };
    }
  },
);
