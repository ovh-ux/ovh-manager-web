angular.module('App').controller(
  'DomainTabsCtrl',
  class DomainTabsCtrl {
    constructor($scope, $q, $location, $stateParams, $timeout, Alerter, Domain, User) {
      this.$scope = $scope;
      this.$q = $q;
      this.$location = $location;
      this.$stateParams = $stateParams;
      this.$timeout = $timeout;
      this.Alerter = Alerter;
      this.Domain = Domain;
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

      this.domain = this.$scope.ctrlDomain.domain;

      const changeOwnerClassic = !_.includes(
        this.Domain.extensionsChangeOwnerByOrder,
        _.last(this.domain.name.split('.')),
      );
      const updateOwnerUrl = this.getUpdateOwnerUrl(this.domain);

      this.tabMenu = {
        title: this.$scope.tr('navigation_more'),
        items: [
          {
            label: this.$scope.tr('hosting_tab_menu_emails'),
            target: `#/configuration/email-domain/${
              this.domain.name
            }?tab=MAILING_LIST`,
            type: 'LINK',
          },
          {
            label: this.$scope.tr('contacts_management'),
            target: `#/useraccount/contacts?tab=SERVICES&serviceName=${
              this.domain.name
            }`,
            text: this.$scope.tr('hosting_tab_menu_contacts'),
            type: 'LINK',
          },
          {
            label: this.$scope.tr('core_change_owner'),
            target: '',
            text: changeOwnerClassic
              ? ''
              : this.$scope.tr('core_change_owner_order'),
            type: 'EXTERNAL_LINK',
          },
          {
            label: this.$scope.tr('domain_configuration_update_owner'),
            target: updateOwnerUrl.target,
            fn: () => this.handleOwnerUrlError(updateOwnerUrl.error),
            type: 'ACTION',
            disabled: !updateOwnerUrl.target,
          },
          {
            type: 'SEPARATOR',
          },
          {
            label: this.$scope.tr('domain_tab_menu_resiliate'),
            target: `#/billing/autoRenew?selectedType=DOMAIN&searchText=${
              this.domain.name
            }`,
            text: this.$scope.tr('hosting_tab_menu_resiliate_infos'),
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
          changeOwnerUrl: this.User.getUrlOf(changeOwnerClassic ? 'changeOwner' : 'domainOrderChange'),
        })
        .then(({ domain, changeOwnerUrl }) => {
          if (domain.managedByOvh) {
            this.tabs = _.filter(this.tabs, tab => tab !== 'DNSSEC');
          }

          if (changeOwnerClassic) {
            this.tabMenu.items[2].target = changeOwnerUrl;
          } else {
            this.tabMenu.items[2].target = `${changeOwnerUrl}?domain=${
              domain.name
            }`;
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

          this.setSelectedTab(angular.uppercase(this.$stateParams.tab));
        });
    }

    setSelectedTab(tab) {
      if (_.includes(this.tabs, tab)) {
        this.selectedTab = tab;
      } else {
        this.selectedTab = this.defaultTab;
      }
      this.$location.search('tab', this.selectedTab);
    }

    getUpdateOwnerUrl(domain) {
      const ownerUrlInfo = { target: '', error: '' };
      if (_.has(domain, 'name') && _.has(domain, 'whoisOwner.id')) {
        ownerUrlInfo.target = `#/useraccount/contact/${domain.name}/${domain.whoisOwner.id}`;
      } else {
        ownerUrlInfo.error = this.$scope.tr('domain_dashboard_whois_error', [
          (!_.has(domain, 'name')) ? this.$scope.tr('domain_tab_REDIRECTION_add_step4_server_cname_error') : domain.whoisOwner,
        ]);
      }
      return ownerUrlInfo;
    }

    handleOwnerUrlError(errMsg) {
      if (errMsg) {
        this.Alerter.error(errMsg, this.$scope.alerts.tabs);
      }
    }

    static toKebabCase(str) {
      return _.kebabCase(str);
    }
  },
);
