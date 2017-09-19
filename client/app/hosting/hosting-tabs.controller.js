angular.module("App").controller(
    "HostingTabsCtrl",
    class HostingTabsCtrl {
        constructor ($scope, $q, $location, $stateParams, HostingFreedom, HostingIndy) {
            this.$scope = $scope;
            this.$q = $q;
            this.$location = $location;
            this.$stateParams = $stateParams;
            this.HostingFreedom = HostingFreedom;
            this.HostingIndy = HostingIndy;

            $scope.displayTabs = { cron: true, databases: true, modules: true };
        }

        $onInit () {
            this.defaultTab = "GENERAL_INFORMATIONS";
            this.tabs = ["GENERAL_INFORMATIONS", "MULTISITE", "MODULE", "FTP", "DATABASE", "TASK"];

            this.tabMenu = {
                title: this.$scope.tr("navigation_more"),
                items: [
                    {
                        label: this.$scope.tr("hosting_tab_AUTOMATED_EMAILS"),
                        text: this.$scope.tr("hosting_tab_AUTOMATED_EMAILS_desc"),
                        target: "AUTOMATED_EMAILS",
                        type: "SWITCH_TABS"
                    },
                    {
                        label: this.$scope.tr("hosting_tab_menu_crons"),
                        target: "CRON",
                        type: "SWITCH_TABS"
                    },
                    {
                        label: this.$scope.tr("hosting_tab_USER_LOGS"),
                        target: "USER_LOGS",
                        type: "SWITCH_TABS"
                    },
                    {
                        label: this.$scope.tr("hosting_tab_BOOST"),
                        target: "BOOST",
                        type: "SWITCH_TABS"
                    },
                    {
                        type: "SEPARATOR"
                    },
                    {
                        label: this.$scope.tr("hosting_tab_menu_emails"),
                        target: `#/configuration/email-domain/${this.$stateParams.productId}?tab=MAILING_LIST`,
                        type: "LINK"
                    },
                    {
                        label: this.$scope.tr("contacts_management"),
                        target: `#/useraccount/contacts?tab=SERVICES&serviceName=${this.$stateParams.productId}`,
                        text: this.$scope.tr("hosting_tab_menu_contacts"),
                        type: "LINK"
                    },
                    {
                        label: this.$scope.tr("core_change_owner"),
                        target: this.$scope.changeOwnerUrl,
                        type: "EXTERNAL_LINK"
                    },
                    {
                        type: "SEPARATOR"
                    },
                    {
                        label: this.$scope.tr("hosting_tab_menu_resiliate"),
                        target: `#/billing/autoRenew?selectedType=HOSTING_WEB&searchText=${this.$stateParams.productId}`,
                        type: "LINK",
                        styles: "text-warning"
                    }
                ]
            };

            this.setSelectedTab = this.setSelectedTab.bind(this);

            if (this.$stateParams.tab && ~this.tabs.indexOf(angular.uppercase(this.$stateParams.tab))) {
                this.setSelectedTab(angular.uppercase(this.$stateParams.tab));
            } else {
                this.setSelectedTab(this.defaultTab);
            }

            this.$q
                .all({
                    indys: this.HostingIndy.getIndys(this.$stateParams.productId),
                    freedoms: this.HostingFreedom.getFreedoms(this.$stateParams.productId, { forceRefresh: false })
                })
                .then(({ indys, freedoms }) => {
                    if (!_.isEmpty(indys)) {
                        this.tabMenu.items.splice(4, 0, {
                            label: this.$scope.i18n.hosting_tab_INDY,
                            target: "INDY",
                            type: "SWITCH_TABS"
                        });
                    }

                    if (!_.isEmpty(freedoms)) {
                        this.tabMenu.items.splice(4, 0, {
                            label: this.$scope.i18n.hosting_tab_FREEDOM,
                            target: "FREEDOM",
                            type: "SWITCH_TABS"
                        });
                    }
                });
        }

        setSelectedTab (tab) {
            if (_.includes(this.tabs, tab)) {
                this.selectedTab = tab;
            } else if (_.includes(_.map(this.tabMenu.items, (item) => item.type === "SWITCH_TABS" && item.target), tab)) {
                this.selectedTab = tab;
            } else {
                this.selectedTab = this.defaultTab;
            }
            this.$location.search("tab", this.selectedTab);
        }

        static toKebabCase (str) {
            return _.kebabCase(str);
        }
    }
);
