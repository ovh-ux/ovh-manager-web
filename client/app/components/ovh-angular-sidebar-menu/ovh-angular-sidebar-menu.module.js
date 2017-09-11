angular
    .module("App")
    .config((SidebarMenuProvider) => {
        "use strict";

        SidebarMenuProvider.clearTranslationPath();
        SidebarMenuProvider.addTranslationPath("bower_components/ovh-angular-sidebar-menu/dist/ovh-angular-sidebar-menu");
    });
