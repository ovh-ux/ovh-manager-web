angular.module('App').controller(
  'EmailDomainCtrl',
  class EmailDomainCtrl {
    /**
     * Constructor
     * @param $scope
     * @param $stateParams
     * @param $timeout
     * @param Alerter
     * @param Emails
     */
    constructor($scope, $stateParams, $timeout, Alerter, Emails) {
      this.$scope = $scope;
      this.$stateParams = $stateParams;
      this.$timeout = $timeout;
      this.Alerter = Alerter;
      this.Emails = Emails;
    }

    $onInit() {
      this.loading = {
        init: true,
        domainsInfos: false,
      };
      this.stepPath = '';

      this.$scope.alerts = {
        page: 'domain_alert_page',
        main: 'domain_alert_main',
      };
      this.$scope.currentAction = null;
      this.$scope.currentActionData = null;
      this.$scope.domain = {};
      this.$scope.itemsPerPage = 10;

      this.$scope.resetAction = () => this.$scope.setAction(false);

      this.$scope.setAction = (action, data) => {
        this.$scope.currentAction = action;
        this.$scope.currentActionData = data;

        if (action) {
          this.stepPath = `${this.$scope.currentAction}.html`;
          $('#currentAction').modal({
            keyboard: true,
            backdrop: 'static',
          });
        } else {
          $('#currentAction').modal('hide');
          this.$scope.currentActionData = null;
          this.$timeout(() => {
            this.stepPath = '';
          }, 300);
        }
      };

      this.loadDomain();
    }

    loadDomain() {
      this.loading.domainsInfos = true;

      this.Emails.getDomain(this.$stateParams.productId)
        .then((domain) => {
          this.$scope.domain = domain;
          if (domain.offer && domain.offer.indexOf('hosting') === -1) {
            this.$scope.$broadcast('emails.canTerminate');
          }
        })
        .catch(() => this.Alerter.error(this.$scope.tr('domain_dashboard_loading_error')))
        .finally(() => {
          this.loading.init = false;
          this.loading.domainsInfos = false;
        });
    }
  },
);
