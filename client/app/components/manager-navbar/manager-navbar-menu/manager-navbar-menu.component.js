angular.module("App")
    .component("managerNavbarMenu", {
        bindings: {
            headerTitle: "@?",
            headerBreadcrumb: "@?",
            menuName: "@",
            menuLinks: "<",
            navbarNav: "="
        },
        controller: "managerNavbarMenuCtrl",
        controllerAs: "$ctrl",
        templateUrl: "components/manager-navbar/manager-navbar-menu/manager-navbar-menu.html"
    });
