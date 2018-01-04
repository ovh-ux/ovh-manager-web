angular.module("App")
    .controller("managerNavbarMenuCtrl", class ManagerNavbarMenuCtrl {
        constructor ($element, $timeout, ManagerNavbarService, KeyboardNavigationService) {
            this.$element = $element;
            this.$timeout = $timeout;
            this.managerNavbarService = ManagerNavbarService;
            this.keyboardNavigationService = KeyboardNavigationService;
        }

        toggleMenu (state, isInternalNav) {
            // Update navbar navigation
            this.navbarNav = this.managerNavbarService.toggleMenu(state, isInternalNav);
        }

        closeMenu (state, isInternalNav) {
            // Update navbar navigation
            this.navbarNav = this.managerNavbarService.toggleMenu(state, isInternalNav);

            // Set focus on menu toggler, preceding $element
            this.$element.prev().trigger("focus");
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

        // Create guard focus for keyboard navigation
        setKeyboardNavigation (isLast) {
            // Check if last item from ngRepeat
            if (isLast) {
                this.tabbableItems = this.$element.find("a, button");

                const keys = {};
                const lastIndex = this.tabbableItems.length - 1;

                // Bind only tabbable items
                this.tabbableItems
                    .on("keydown", (e) => {
                        if (/(9|16)/.test(e.which) && this.isOpen) {
                            e.preventDefault();

                            let index = this.tabbableItems.index(e.target);
                            keys[e.which] = true;

                            if (keys[9] && !keys[16]) {
                                // Move Down
                                index = index >= lastIndex ? 0 : index + 1;
                            } else if (keys[9] && keys[16]) {
                                // Move Up
                                index = index < 0 ? lastIndex - 1 : index - 1;
                            }

                            // Focus next/prev tabbable item
                            this.tabbableItems.eq(index).trigger("focus");
                        }
                    })
                    .on("keyup", (e) => {
                        delete keys[e.which];
                    });
            }
        }

        $onChanges () {
            // Focus first list item when opened
            if (this.isOpen && this.tabbableItems.length) {
                // Add a little delay to avoid transition bug on Webkit
                this.$timeout(() => this.tabbableItems.eq(0).trigger("focus"), 100);
            }
        }

        $postLink () {
            // Add classnames on root $element
            this.$element.addClass("oui-navbar-menu oui-navbar-menu_fixed oui-navbar-menu_right");
        }
    });
