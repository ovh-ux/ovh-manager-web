angular.module('App').controller(
  'ZonesTabsCtrl',
  class ZonesTabsCtrl {
    /**
        * Constructor
        * @param $scope
        * @param $location
        * @param $stateParams
        * @param Domain
        * @param Emails
        */
    constructor($scope, $location, $stateParams, Domain, Emails) {
      this.$scope = $scope;
      this.$location = $location;
      this.$stateParams = $stateParams;
      this.Domain = Domain;
      this.Emails = Emails;
    }

    $onInit() {
      this.defaultTab = 'ZONE';
      this.tabs = ['ZONE', 'REDIRECTION', 'DYNHOST', 'TASKS'];
      this.tabMenu = {
        title: this.$scope.tr('navigation_more'),
        items: [
          {
            label: this.$scope.tr('domain_tab_menu_emails'),
            target: `#/configuration/email-domain/${this.$stateParams.productId}?tab=MAILING_LIST`,
            type: 'LINK',
          },
          {
            label: this.$scope.tr('contacts_management'),
            target: `#/useraccount/contacts?tab=SERVICES&serviceName=${this.$stateParams.productId}`,
            text: this.$scope.tr('domain_tab_menu_contacts'),
            type: 'LINK',
          },
        ],
      };

      this.setSelectedTab = (tab) => {
        if (_.indexOf(this.tabs, tab) !== -1) {
          this.selectedTab = tab;
        } else {
          this.selectedTab = this.defaultTab;
        }
        this.$location.search('tab', this.selectedTab);
      };

      this.Emails.getDomains().then((emails) => {
        if (_.indexOf(emails, this.$stateParams.productId) === -1) {
          this.tabMenu.items = _.drop(this.tabMenu.items);
        }
      });

      this.setSelectedTab(angular.uppercase(this.$stateParams.tab));
    }

    /**
        * Convert string to KebabCase
        * @param {string} str
        */
    static toKebabCase(str) {
      return _.kebabCase(str);
    }
  },
);
