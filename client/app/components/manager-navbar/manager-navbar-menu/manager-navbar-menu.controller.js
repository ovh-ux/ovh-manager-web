angular.module("App")
    .controller("managerNavbarMenuCtrl", class ManagerNavbarMenuCtrl {
        constructor ($element, ManagerNavbarService) {
            this.$element = $element;
            this.managerNavbarService = ManagerNavbarService;
        }

        toggleMenu (state, isInternalNav) {
            // Update navbar navigation
            this.navbarNav = this.managerNavbarService.toggleMenu(state, isInternalNav);
        }

        /* eslint-disable class-methods-use-this */
        // Return value of "ui-sref"
        getFullSref (item) {
            return `${item.state}(${JSON.stringify(item.stateParams)})`;
        }
        /* eslint-disable class-methods-use-this */

        // Build breadcrumb for child menu
        getChildBreadcrumb () {
            return this.headerBreadcrumb ? `${this.headerBreadcrumb} › ${this.headerTitle}` : this.headerTitle;
        }

        $postLink () {
            // Add classnames on root $element
            this.$element.addClass("oui-navbar-menu oui-navbar-menu_fixed oui-navbar-menu_right");
        }
    });
