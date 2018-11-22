angular.module('App').controller(
  'EmailDomainTabsCtrl',
  class EmailDomainTabsCtrl {
    /**
     * Constructor
     * @param $scope
     * @param $location
     * @param $stateParams
     * @param $translate
     * @param WucEmails
     * @param Alerter
     */
    constructor($scope, $location, $stateParams, $translate, WucEmails, Alerter) {
      this.$scope = $scope;
      this.$location = $location;
      this.$stateParams = $stateParams;
      this.$translate = $translate;
      this.WucEmails = WucEmails;
      this.Alerter = Alerter;
    }

    $onInit() {
      this.defaultTab = 'GENERAL_INFORMATIONS';
      this.tabs = ['GENERAL_INFORMATIONS', 'EMAIL', 'MAILING_LIST', 'TASK'];
      this.tabMenu = null;

      this.setSelectedTab = this.setSelectedTab.bind(this);
      this.setSelectedTab(angular.uppercase(this.$stateParams.tab));

      this.$scope.$on('emails.canTerminate', () => {
        this.tabMenu = {
          title: this.$translate.instant('navigation_more'),
          items: [
            {
              label: this.$translate.instant('email_tab_menu_resiliate'),
              target: `#/billing/autoRenew?selectedType=EMAIL_DOMAIN&searchText=${
                this.$stateParams.productId
              }`,
              type: 'LINK',
              styles: 'text-warning',
            },
          ],
        };
      });
    }

    setSelectedTab(tab) {
      if (_.indexOf(this.tabs, tab) !== -1) {
        this.selectedTab = tab;
      } else {
        this.selectedTab = this.defaultTab;
      }
      this.$location.search('tab', this.selectedTab);
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
