angular.module("App")
    .controller("managerNavbarMenuCtrl", function ($element, ManagerNavbarService) {
        "use strict";

        this.toggleMenu = (state, isInternalNav) => {
            this.navbarNav = ManagerNavbarService.toggleMenu(state, isInternalNav);
        };

        // Return value of "ui-sref"
        this.getFullSref = (item) => `${item.state}(${JSON.stringify(item.stateParams)})`;

        // Build breadcrumb for child menu
        this.getChildBreadcrumb = () => this.headerBreadcrumb ? `${this.headerBreadcrumb} › ${this.headerTitle}` : this.headerTitle;

        this.$postLink = () => {
            $element.addClass("oui-navbar-menu oui-navbar-menu_fixed oui-navbar-menu_right");
        };
    });
