angular.module("App").controller("HostingTabsCtrl", ($scope, $stateParams, $location, HostingIndy, HostingFreedom, $q) => {
    "use strict";

    const defaultTab = "GENERAL_INFORMATIONS";
    $scope.toKebabCase = _.kebabCase;

    $scope.tabs = ["GENERAL_INFORMATIONS", "MULTISITE", "MODULE", "FTP", "DATABASE", "TASK"];

    $scope.tabMenu = {
        title: $scope.tr("navigation_more"),
        items: [
            {
                label: $scope.tr("hosting_tab_AUTOMATED_EMAILS"),
                text: $scope.tr("hosting_tab_AUTOMATED_EMAILS_desc"),
                target: "AUTOMATED_EMAILS",
                type: "SWITCH_TABS"
            },
            {
                label: $scope.tr("hosting_tab_menu_crons"),
                target: "CRON",
                type: "SWITCH_TABS"
            },
            {
                label: $scope.tr("hosting_tab_USER_LOGS"),
                target: "USER_LOGS",
                type: "SWITCH_TABS"
            },
            {
                label: $scope.tr("hosting_tab_BOOST"),
                target: "BOOST",
                type: "SWITCH_TABS"
            },
            {
                type: "SEPARATOR"
            },
            {
                label: $scope.tr("hosting_tab_menu_emails"),
                target: `#/configuration/email-domain/${$scope.hosting.serviceName}?tab=MAILING_LIST`,
                type: "LINK"
            },
            {
                label: $scope.tr("contacts_management"),
                target: `#/useraccount/contacts?tab=SERVICES&serviceName=${$scope.hosting.serviceName}`,
                text: $scope.tr("hosting_tab_menu_contacts"),
                type: "LINK"
            },
            {
                label: $scope.tr("core_change_owner"),
                target: $scope.changeOwnerUrl,
                type: "EXTERNAL_LINK"
            },
            {
                type: "SEPARATOR"
            },
            {
                label: $scope.tr("hosting_tab_menu_resiliate"),
                target: `#/billing/autoRenew?selectedType=HOSTING_WEB&searchText=${$scope.hosting.serviceName}`,
                type: "LINK",
                styles: "text-warning"
            }
        ]
    };

    $scope.setSelectedTab = (tab) => {
        if (tab !== undefined && tab !== null && tab !== "") {
            $scope.selectedTab = tab;
        } else {
            $scope.selectedTab = defaultTab;
        }
        $location.search("tab", $scope.selectedTab);
    };

    if ($stateParams.tab && ~$scope.tabs.indexOf(angular.uppercase($stateParams.tab))) {
        $scope.setSelectedTab(angular.uppercase($stateParams.tab));
    } else {
        $scope.setSelectedTab(defaultTab);
    }

    $scope.displayTabs = { cron: true, databases: true, modules: true };

    $q.all([HostingIndy.getIndys($stateParams.productId), HostingFreedom.getFreedoms($stateParams.productId, { forceRefresh: false })]).then((data) => {
        const indys = data[0];
        const freedoms = data[1];

        if (indys.length > 0) {
            $scope.tabMenu.items.splice(4, 0, {
                label: $scope.i18n.hosting_tab_INDY,
                target: "INDY",
                type: "SWITCH_TABS"
            });
        }

        if (freedoms.length > 0) {
            $scope.tabMenu.items.splice(4, 0, {
                label: $scope.i18n.hosting_tab_FREEDOM,
                target: "FREEDOM",
                type: "SWITCH_TABS"
            });
        }
    });
});
