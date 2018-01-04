angular.module("App")
    .component("managerNavbarMenu", {
        bindings: {
            headerTitle: "@?",
            headerBreadcrumb: "@?",
            menuName: "@",
            menuLinks: "<",
            navbarNav: "=",
            isOpen: "<"
        },
        controller: "managerNavbarMenuCtrl",
        templateUrl: "components/manager-navbar/manager-navbar-menu/manager-navbar-menu.html"
    });
