angular.module("App")
    .controller("managerNavbarCtrl", class ManagerNavbarCtrl {
        constructor ($element, $document, $timeout, constants, translator, ManagerNavbarService) {
            this.$element = $element;
            this.$document = $document;
            this.$timeout = $timeout;
            this.tr = translator.tr;
            this.currentUniverse = constants.UNIVERS;
            this.managerNavbarService = ManagerNavbarService;
        }

        toggleMenu (state, isInternalNav) {
            // Update navbar navigation
            this.navbarNav = this.managerNavbarService.toggleMenu(state, isInternalNav);
        }

        $onInit () {
            // Get navbar navigation and user infos
            this.managerNavbarService.getNavbar()
                .then((navbar) => {
                    this.currentUser = navbar.currentUser;
                    this.navigation = navbar.navigation;
                });
        }

        $postLink () {
            // Close dropdown menu on document click, only if a menu is open
            angular.element(this.$document).on("click", () => {
                if (this.navbarNav) {
                    this.$timeout(() => this.toggleMenu());
                }
            });

            // Avoid click propagation on $element
            angular.element(this.$element).on("click", (e) => {
                e.stopPropagation();
            });
        }
    });
