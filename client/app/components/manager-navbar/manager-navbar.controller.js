angular.module("App")
    .controller("managerNavbarCtrl", function ($element, $document, $timeout, constants, translator, ManagerNavbarService) {
        "use strict";

        this.toggleMenu = (state, isInternalNav) => {
            this.navbarNav = ManagerNavbarService.toggleMenu(state, isInternalNav);
        };

        this.$onInit = () => {
            this.tr = translator.tr;
            this.currentUniverse = constants.UNIVERS;

            // Get navbar navigation and user infos
            ManagerNavbarService.getNavbar()
                .then((navbar) => {
                    this.currentUser = navbar.currentUser;
                    this.navigation = navbar.navigation;
                });
        };

        this.$postLink = () => {
            // Close dropdown menu on document click, only if a menu is open
            angular.element($document).on("click", () => {
                if (this.navbarNav) {
                    $timeout(() => this.toggleMenu());
                }
            });

            // Avoid click propagation on $element
            angular.element($element).on("click", (e) => {
                e.stopPropagation();
            });
        };
    });
