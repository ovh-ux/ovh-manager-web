angular
    .module("App")
    .config((SidebarMenuProvider) => {
        "use strict";

        SidebarMenuProvider.clearTranslationPath();
        SidebarMenuProvider.addTranslationPath("../node_modules/ovh-angular-sidebar-menu/dist/ovh-angular-sidebar-menu");
    });
