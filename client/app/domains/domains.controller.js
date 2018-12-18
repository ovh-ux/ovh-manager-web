angular.module('App').controller(
  'DomainsCtrl',
  class DomainsCtrl {
    /**
     * Constructor
     * @param $scope
     * @param $rootScope
     * @param $timeout
     * @param Domains
     * @param Navigator
     * @param Alerter
     * @param User
     */
    constructor(
      $scope,
      $rootScope,
      $timeout,
      $translate,
      Domains,
      Navigator,
      Alerter,
      User,
    ) {
      this.$scope = $scope;
      this.$rootScope = $rootScope;
      this.$timeout = $timeout;
      this.$translate = $translate;
      this.Domains = Domains;
      this.Navigator = Navigator;
      this.Alerter = Alerter;
      this.User = User;
    }

    $onInit() {
      this.atLeastOneSelected = false;
      this.hasResult = false;
      this.loading = {
        init: true,
        domainsInfos: false,
        domainsError: false,
        domainsSearch: false,
        domainsExportCsv: false,
      };
      this.search = { value: null };
      this.stepPath = '';

      this.User.getUrlOf('bulkChangeOwner')
        .then((link) => {
          this.urlBulkChangeOwner = link;
        })
        .catch(() => {
          this.urlBulkChangeOwner = null;
        });

      this.$scope.selectedDomains = [];
      this.$scope.alerts = {
        page: 'alerts.domains.page',
        main: 'alerts.domains.main',
      };
      this.$scope.currentAction = null;
      this.$scope.currentActionData = null;

      this.$scope.setActionMultiple = (action, data) => this.setAction(action, 'domains/', data);
      this.$scope.resetAction = () => this.setAction(false);
      this.$scope.getSelectedDomains = () => this.selectedDomains;

      this.$scope.$on('$locationChangeStart', () => this.$scope.resetAction());
      this.$scope.$on('domain.csv.export.cancel', () => {
        this.loading.domainsExportCsv = false;
      });
      this.$scope.$on('domain.csv.export.doing', () => {
        this.loading.domainsExportCsv = true;
      });
      this.$scope.$on('domain.csv.export.done', () => {
        this.loading.domainsExportCsv = false;
      });
      this.$scope.$on('domain.csv.export.error', () => {
        this.loading.domainsExportCsv = false;
      });
    }

    loadDomains({ pageSize, offset, criteria }) {
      const [search] = criteria;

      return this.Domains.getDomains(pageSize, offset - 1, _.get(search, 'value'))
        .then((domains) => {
          this.domains = domains;

          return {
            data: _.get(this.domains, 'list.results', []),
            meta: {
              totalCount: domains.count,
            },
          };
        })
        .catch(() => {
          this.loading.domainsError = true;
          this.Alerter.error(
            this.$translate.instant('domains_dashboard_loading_error'),
            this.$scope.alerts.page,
          );
        });
    }

    /**
     * Redirect to domain page
     * @param {string} domain name
     */
    openDomain(domain) {
      this.$rootScope.$broadcast('leftNavigation.selectProduct.fromName', {
        name: domain,
        type: 'DOMAIN',
      });
    }

    /**
     * Toggle the clicked domain checkbox
     * @param {string} domain name
     */
    toggleDomain(domain, selectedDomains) {
      this.selectedDomains = selectedDomains.map(({ name }) => name);
      this.atLeastOneSelected = !_.isEmpty(selectedDomains);
    }

    /**
     * Set Action
     * @param action
     * @param baseStepPath
     * @param data
     */
    setAction(action, baseStepPath, data) {
      this.$scope.currentAction = action;
      this.$scope.currentActionData = data;

      if (action) {
        this.stepPath = `${baseStepPath}${this.$scope.currentAction}.html`;
        $('#currentAction').modal({ keyboard: true, backdrop: 'static' });
      } else {
        $('#currentAction').modal('hide');
        this.$scope.currentActionData = null;
        this.$timeout(() => {
          this.stepPath = '';
        }, 300);
      }
    }
  },
);
