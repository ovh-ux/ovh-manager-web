angular.module("App")
    .controller("managerNavbarCtrl", class ManagerNavbarCtrl {
        constructor ($element, $document, $location, $anchorScroll, $timeout, constants, translator, ManagerNavbarService) {
            this.$element = $element;
            this.$document = $document;
            this.$location = $location;
            this.$anchorScroll = $anchorScroll;
            this.$timeout = $timeout;
            this.tr = translator.tr;
            this.currentUniverse = constants.UNIVERS;
            this.managerNavbarService = ManagerNavbarService;
        }

        toggleMenu (state, isInternalNav) {
            // Update navbar navigation
            this.navbarNav = this.managerNavbarService.toggleMenu(state, isInternalNav);
        }

        scrollToMainContent () {
            const id = "maincontent";

            // Add hash to url and scroll to anchor
            this.$location.hash(id);
            this.$anchorScroll();

            // Set focus to target
            this.$document.find(`#${id}`)[0].focus();
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
            this.$document.on("click", () => {
                if (this.navbarNav) {
                    this.$timeout(() => this.toggleMenu());
                }
            });

            // Avoid click propagation on $element
            this.$element.on("click", (e) => {
                e.stopPropagation();
            });

            // Support keyboard
            this.$document.on("keydown", (e) => {
                // ESC to close menu
                if (this.navbarNav && e.which === 27) {
                    this.$timeout(() => this.toggleMenu());
                }
            });
        }
    });
