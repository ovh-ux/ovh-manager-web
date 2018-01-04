angular.module("App")
    .service("KeyboardNavigationService", class KeyboardNavigationService {
        constructor () {
            this.keyboardNav = {};
        }

        addItemToGroup (item, groupName) {
            // Create the group if it doesn't exist
            if (angular.isUndefined(this.keyboardNav[groupName])) {
                this.keyboardNav[groupName] = {
                    items: [],
                    isOpen: false
                };
            }

            // Add item to the group
            this.keyboardNav[groupName].items.push(item);
        }

        bindGroup (groupName) {
            const keys = {};
            const tabbableItems = angular.element(this.keyboardNav[groupName].items);
            const lastIndex = tabbableItems.length - 1;

            tabbableItems
                .on("keydown", (e) => {
                    if (/(9|16)/.test(e.which) && this.keyboardNav[groupName].isOpen) {
                        e.preventDefault();

                        let index = tabbableItems.index(e.target);
                        keys[e.which] = true;

                        if (keys[9] && !keys[16]) {
                            // Move Down
                            index = index >= lastIndex ? 0 : index + 1;
                        } else if (keys[9] && keys[16]) {
                            // Move Up
                            index = index < 0 ? lastIndex : index - 1;
                        }

                        // Focus next/prev tabbable item
                        tabbableItems.eq(index).trigger("focus");
                    }
                })
                .on("keyup", (e) => {
                    delete keys[e.which];
                });
        }

        toggleGroup (groupName, isOpen) {
            this.keyboardNav[groupName].isOpen = isOpen;
        }
    });
