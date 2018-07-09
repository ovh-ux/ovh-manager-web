angular.module('App').controller(
  'EmailsEditDnsFilterCtrl',
  class EmailsEditDnsFilterCtrl {
    /**
     * Constructor
     * @param $scope
     * @param $stateParams
     * @param Alerter
     * @param Emails
     */
    constructor($scope, $stateParams, Alerter, Emails) {
      this.$scope = $scope;
      this.$stateParams = $stateParams;
      this.Alerter = Alerter;
      this.Emails = Emails;
    }

    $onInit() {
      this.customFilter = {
        value: null,
        regex: /(^(([a-z0-9]){1}([a-z\-0-9]{0,253}\.))+([a-z]{2,62}|xn--[a-z0-9]{2,58})|(?:\.ovh\.org))$/,
      };
      this.loading = false;

      this.$scope.updateDnsFilter = () => this.updateDnsFilter();

      this.getModels();
    }

    getModels() {
      this.loading = true;
      this.Emails.getModels()
        .then((models) => {
          this.dnsFilterEnum = _.without(
            models.models['domain.DomainMXFilterEnum'].enum,
            'CUSTOM',
          );
          this.selectedFilter =
            models.models['domain.DomainFilterOperandEnum'].enum;
          this.loading = false;
        })
        .catch((err) => {
          this.Alerter.alertFromSWS(
            this.$scope.tr('email_tab_table_acls_error'),
            err,
            this.$scope.alerts.main,
          );
          this.$scope.resetAction();
        });
    }

    updateDnsFilter() {
      this.loading = true;
      this.Emails.setDnsFilter(this.$stateParams.productId, {
        mxFilter: this.selectedFilter,
        customTarget: this.customFilter.value,
      })
        .then(() =>
          this.Alerter.success(
            this.$scope.tr('emails_dns_filter_edit_success'),
            this.$scope.alerts.main,
          ))
        .catch(err =>
          this.Alerter.alertFromSWS(
            this.$scope.tr('email_tab_modal_edit_filter_error'),
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
