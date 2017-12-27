angular.module("App").run(($q, SidebarMenu, Products, User, constants, translator) => {
    "use strict";

    const menuOptions = [];

    function addDomainItems (products) {
        const domainItem = SidebarMenu.addMenuItem({
            title: translator.tr("navigation_left_domains"),
            category: "domain",
            icon: "ovh-font ovh-font-domain",
            allowSubItems: true,
            loadOnState: "app.domain",
            allowSearch: true
        });

        return User.getUrlOf("domainOrder").then((link) => {
            menuOptions.push({
                title: translator.tr("navigation_left_order_domain"),
                icon: "ovh-font ovh-font-domain",
                href: link,
                target: "_blank"
            });
        }).finally(() => {
            menuOptions.push({
                title: translator.tr("navigation_left_order_dnszone"),
                icon: "ovh-font ovh-font-domain",
                state: "app.dns-zone-new"
            });

            SidebarMenu.addMenuItems([{
                title: translator.tr("navigation_left_all_domains"),
                category: "domain",
                icon: "ovh-font ovh-font-network",
                state: "app.domain.all",
                isActive: true
            }, {
                title: translator.tr("navigation_left_all_domains_operations"),
                category: "domain",
                icon: "ovh-font ovh-font-config",
                state: "app.domain.operation"
            }], domainItem);

            _.forEach(products.domains, (domain) => {
                if (domain.hasSubComponent) {
                    const allDomItem = SidebarMenu.addMenuItem({
                        title: domain.displayName,
                        category: "domain",
                        icon: "ovh-font ovh-font-domain",
                        allowSubItems: true,
                        loadOnState: "app.domain.alldom",
                        loadOnStateParams: {
                            allDom: domain.displayName
                        }
                    }, domainItem);

                    _.forEach(domain.subProducts, (subDomain) => {
                        SidebarMenu.addMenuItem({
                            title: subDomain.displayName,
                            category: "domain",
                            icon: "ovh-font ovh-font-domain",
                            state: "app.domain.alldom",
                            stateParams: {
                                allDom: domain.displayName,
                                productId: subDomain.name
                            }
                        }, allDomItem);
                    });
                } else {
                    SidebarMenu.addMenuItem({
                        title: domain.displayName,
                        category: "domain",
                        icon: "ovh-font ovh-font-domain",
                        state: domain.type === "ZONE" ? "app.domain.dns-zone" : "app.domain.product",
                        stateParams: {
                            productId: domain.name
                        }
                    }, domainItem);
                }
            });
        });
    }

    function addHostingItems (products) {
        const hostingItem = SidebarMenu.addMenuItem({
            title: translator.tr("navigation_left_hosting"),
            category: "hosting",
            icon: "ovh-font ovh-font-hosting",
            allowSubItems: true,
            loadOnState: "app.hosting",
            allowSearch: true
        });

        const hostings = _(products.hostings)
            .filter((elt) => elt.type === "HOSTING")
            .sortBy((elt) => angular.lowercase(elt.displayName || elt.name))
            .sortBy((elt) => elt.type)
            .value();

        _.forEach(hostings, (elt) => {
            SidebarMenu.addMenuItem({
                title: elt.displayName || elt.name,
                category: "hosting",
                icon: "ovh-font ovh-font-server",
                state: "app.hosting",
                stateParams: {
                    productId: elt.name
                }
            }, hostingItem);
        });
    }

    function addDatabaseItems (products) {
        const databaseItem = SidebarMenu.addMenuItem({
            title: translator.tr("navigation_left_database"),
            category: "database",
            icon: "ovh-font ovh-font-database",
            allowSubItems: true,
            loadOnState: "app.private-database",
            allowSearch: true
        });

        menuOptions.push({
            title: translator.tr("navigation_left_order_private_database"),
            icon: "ovh-font ovh-font-database",
            state: "app.sql-order"
        });

        const databases = _(products.hostings)
            .filter((elt) => elt.type === "PRIVATE_DATABASE")
            .sortBy((elt) => angular.lowercase(elt.displayName || elt.name))
            .sortBy((elt) => elt.type)
            .value();

        _.forEach(databases, (elt) => {
            SidebarMenu.addMenuItem({
                title: elt.displayName || elt.name,
                category: "private_database",
                icon: "ovh-font ovh-font-database",
                state: "app.private-database",
                stateParams: {
                    productId: elt.name
                }
            }, databaseItem);
        });
    }

    function addEmailProItems (products) {
        const emailProItem = SidebarMenu.addMenuItem({
            title: translator.tr("navigation_left_emailPro"),
            category: "emailPro",
            icon: "ovh-font ovh-font-mail",
            allowSubItems: true,
            loadOnState: "app.email-pro",
            allowSearch: true
        });

        return User.getUrlOf("emailproOrder").then((link) => {
            menuOptions.push({
                title: translator.tr("navigation_left_order_emailpro"),
                icon: "ovh-font ovh-font-mail",
                href: link,
                target: "_blank"
            });
        }).finally(() => {
            const emailProsItems = _.sortBy(products.emailPros, (elt) => angular.lowercase(elt.name));

            _.forEach(emailProsItems, (elt) => {
                SidebarMenu.addMenuItem({
                    title: elt.displayName || elt.name,
                    category: "emailPro",
                    icon: "ovh-font ovh-font-mail",
                    state: "app.email-pro",
                    stateParams: {
                        productId: elt.name
                    }
                }, emailProItem);
            });
        });
    }

    function addEmailItems (products) {
        const emailsItem = SidebarMenu.addMenuItem({
            title: translator.tr("navigation_left_email"),
            category: "email",
            icon: "ovh-font ovh-font-mail",
            allowSubItems: true,
            loadOnState: "app.email",
            allowSearch: true
        });

        menuOptions.push({
            title: translator.tr("navigation_left_order_mxplan"),
            icon: "ovh-font ovh-font-mail",
            state: "app.mx-plan"
        });

        const emailItems = _.sortBy(products.emails, (elt) => angular.lowercase(elt.displayName || elt.name));

        _.forEach(emailItems, (elt) => {
            SidebarMenu.addMenuItem({
                title: elt.displayName || elt.name,
                category: "email",
                icon: "ovh-font ovh-font-mail",
                state: elt.type === "EMAIL_DELEGATE" ? "app.email.delegate" : "app.email.domain",
                stateParams: {
                    productId: elt.name
                }
            }, emailsItem);
        });

    }

    function addMicrosoftItems (products) {
        const microsoftItem = SidebarMenu.addMenuItem({
            title: translator.tr("navigation_left_microsoft"),
            category: "microsoft",
            icon: "ms-Icon ms-Icon--WindowsLogo",
            allowSubItems: true,
            loadOnState: "app.microsoft",
            allowSearch: true
        });

        return User.getUrlOf("office365Order").then((link) => {
            menuOptions.push({
                title: translator.tr("navigation_left_order_exchange"),
                icon: "ms-Icon ms-Icon--ExchangeLogo",
                state: "app.microsoft.exchange.order"
            });

            menuOptions.push({
                title: translator.tr("navigation_left_office365_order"),
                icon: "ms-Icon ms-Icon--OfficeLogo",
                href: link,
                target: "_blank"
            });

            menuOptions.push({
                title: translator.tr("navigation_left_office_reseller_order"),
                icon: "ms-Icon ms-Icon--OfficeLogo",
                href: `${constants.MANAGER_URLS.sunrise}csp2`
            });

            menuOptions.push({
                title: translator.tr("navigation_left_sharepoint_order"),
                icon: "ms-Icon ms-Icon--SharepointLogo",
                state: "app.microsoft.sharepoint.order"
            });
        }).finally(() => {
            // Exchange
            const exchangesItem = SidebarMenu.addMenuItem({
                title: translator.tr("navigation_left_exchange"),
                category: "microsoft",
                icon: "ms-Icon ms-Icon--ExchangeLogo",
                allowSubItems: true,
                loadOnState: "app.microsoft.exchange"
            }, microsoftItem);

            _.forEach(_.sortBy(products.exchanges, (elt) => angular.lowercase(elt.displayName || elt.name)), (elt) => {
                SidebarMenu.addMenuItem({
                    title: elt.displayName || elt.name,
                    category: "microsoft",
                    icon: "ms-Icon ms-Icon--ExchangeLogo",
                    state: elt.type === "EXCHANGE_PROVIDER" ? "app.microsoft.exchange.provider" : elt.type === "EXCHANGE_DEDICATED" ? "app.microsoft.exchange.dedicated" : "app.microsoft.exchange.hosted",
                    stateParams: {
                        organization: elt.organization,
                        productId: elt.name
                    }
                }, exchangesItem);
            });

            // Office

            const officesItem = SidebarMenu.addMenuItem({
                title: translator.tr("navigation_left_office"),
                category: "microsoft",
                icon: "ms-Icon ms-Icon--OfficeLogo",
                allowSubItems: true,
                loadOnState: "app.microsoft.office"
            }, microsoftItem);

            _.forEach(_.sortBy(products.licenseOffice, (elt) => angular.lowercase(elt.displayName || elt.name)), (elt) => {
                SidebarMenu.addMenuItem({
                    title: elt.displayName || elt.name,
                    category: "microsoft",
                    icon: "ms-Icon ms-Icon--OfficeLogo",
                    state: "app.microsoft.office.product",
                    stateParams: {
                        serviceName: elt.name
                    }
                }, officesItem);
            });

            // Sharepoint

            const sharepointItems = SidebarMenu.addMenuItem({
                title: translator.tr("navigation_left_sharepoint"),
                category: "microsoft",
                icon: "ms-Icon ms-Icon--SharepointLogo",
                allowSubItems: true,
                loadOnState: "app.microsoft.sharepoint"
            }, microsoftItem);

            _.forEach(_.sortBy(products.sharepoints, (elt) => angular.lowercase(elt.displayName || elt.name)), (elt) => {
                SidebarMenu.addMenuItem({
                    title: elt.displayName || elt.name,
                    category: "microsoft",
                    icon: "ms-Icon ms-Icon--SharepointLogo",
                    state: "app.microsoft.sharepoint.product",
                    stateParams: {
                        exchangeId: elt.exchangeId,
                        productId: elt.name
                    }
                }, sharepointItems);
            });
        });
    }

    const productsPromise = Products.getProductsByType()
        .then((products) => $q.all(
            addDomainItems(products),
            addHostingItems(products),
            addDatabaseItems(products),
            addEmailProItems(products),
            addEmailItems(products),
            addMicrosoftItems(products)
        ));

    SidebarMenu.setInitializationPromise(productsPromise);

    SidebarMenu.loadDeferred.promise.then(() => {
        SidebarMenu.manageStateChange();
        SidebarMenu.addActionsMenuOptions(menuOptions);
    });
});
