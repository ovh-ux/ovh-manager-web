angular.module('App').controller(
  'DomainTabsCtrl',
  class DomainTabsCtrl {
    constructor($scope, $location, $q, $stateParams, $translate,
      atInternet, Alerter, Domain, DOMAIN, User) {
      this.$scope = $scope;
      this.$location = $location;
      this.$q = $q;
      this.$stateParams = $stateParams;
      this.$translate = $translate;
      this.atInternet = atInternet;
      this.Alerter = Alerter;
      this.Domain = Domain;
      this.DOMAIN = DOMAIN;
      this.User = User;
    }

    $onInit() {
      this.defaultTab = 'GENERAL_INFORMATIONS';
      this.tabs = [
        'GENERAL_INFORMATIONS',
        'ZONE',
        'DNS',
        'REDIRECTION',
        'DYNHOST',
        'GLUE',
        'DNSSEC',
        'TASKS',
      ];

      this.$scope.alerts = {
        page: 'domain_alert_page',
      };

      this.domain = this.$scope.ctrlDomain.domain;


      this.tabMenu = {
        title: this.$translate.instant('navigation_more'),
        items: [
          {
            label: this.$translate.instant('hosting_tab_menu_emails'),
            target: `#/configuration/email-domain/${
              this.domain.name
            }?tab=MAILING_LIST`,
            type: 'LINK',
          },
        ],
      };

      if (!this.$scope.ctrlDomain.hasZoneDns) {
        this.tabs = _.filter(this.tabs, tab => tab !== 'DYNHOST');
      }

      this.setSelectedTab = this.setSelectedTab.bind(this);

      this.$q
        .all({
          domain: this.Domain.getSelected(this.$stateParams.productId),
        })
        .then(({ domain }) => {
          if (domain.managedByOvh) {
            this.tabs = _.filter(this.tabs, tab => tab !== 'DNSSEC');
          }

          if (_.isObject(domain.whoisOwner)) {
            this.$q
              .all({
                domainOrderTradeUrl: this.User.getUrlOf('domainOrderTrade'),
                orderServiceOption: this.Domain.getOrderServiceOption(domain.name),
              })
              .then(({ domainOrderTradeUrl, orderServiceOption }) => {
                if (_.find(orderServiceOption, opt => opt.family === 'trade')) {
                  this.tabMenu.items[2].target = domainOrderTradeUrl.replace(
                    '{domain}',
                    domain.name,
                  );
                }
              });
          }

          this.setSelectedTab(angular.uppercase(this.$stateParams.tab), true);
        }).catch(() => {
          this.Alerter.error(
            this.$translate.instant('domain_dashboard_loading_error'),
            this.$scope.alerts.page,
          );
        });
    }

    setSelectedTab(tab, trackPageOnly) {
      if (_.includes(this.tabs, tab)) {
        this.selectedTab = tab;
      } else {
        this.selectedTab = this.defaultTab;
      }

      if (trackPageOnly) {
        this.atInternet.trackPage({
          name: `web::domain::product-${this.selectedTab}`,
        });
      } else {
        this.atInternet.trackClick({
          name: `web::domain::product-${this.selectedTab}`,
          type: 'action',
        });
        this.atInternet.trackPage({
          name: `web::domain::product-${this.selectedTab}`,
          type: 'action',
        });
      }

      this.$location.search('tab', this.selectedTab);
    }

    static toKebabCase(str) {
      return _.kebabCase(str);
    }
  },
);
