angular.module("App")
    .service("ManagerNavbarService", function ($q, constants, translator, Products, User, LANGUAGES, OtrsPopupService, ssoAuthentication) {
        "use strict";

        const getLanguageChangingMenuObject = () => {
            const languageChangingMenuObject = _(LANGUAGES)
                .filter((language) => _(language).has("name", "value"))
                .map((language) => ({
                    label: language.name,
                    click: (callback) => {
                        localStorage["univers-selected-language"] = language.value;
                        window.location.reload();

                        if (typeof callback === "function") {
                            callback();
                        }
                    },
                    lang: _(language.value).chain()
                        .words()
                        .head()
                        .value()
                }))
                .value();

            return languageChangingMenuObject;
        };

        const getCurrentLanguageName = () => {
            const currentLanguage = _(LANGUAGES).find({ value: translator.getLanguage() });
            const currentLanguageName = _(currentLanguage).get("name");

            return currentLanguageName;
        };

        const getProductsMenu = (categoryName, products) => {
            const productsMenu = [];

            _.forEach(products, (product) =>
                productsMenu.push({
                    label: product.displayName || product.name,
                    title: product.displayName || product.name,
                    state: `app.${categoryName}`,
                    stateParams: {
                        productId: product.name
                    }
                })
            );

            return productsMenu;
        };

        const getDomainsMenu = (domains) => {
            const domainsMenu = [{
                label: translator.tr("navigation_left_all_domains"),
                title: translator.tr("navigation_left_all_domains"),
                state: "app.domain.all"
            }, {
                label: translator.tr("navigation_left_all_domains_operations"),
                title: translator.tr("navigation_left_all_domains_operations"),
                state: "app.domain.operation"
            }];

            _.forEach(domains, (domain) => {
                const domainItem = {
                    name: domain.name,
                    label: domain.displayName || domain.name,
                    title: domain.displayName || domain.name,
                    state: domain.type === "ZONE" ? "app.domain.dns-zone" : "app.domain.product",
                    stateParams: {
                        productId: domain.name
                    }
                };

                if (domain.subProducts) {
                    const subLinks = [{
                        label: domain.displayName,
                        title: domain.displayName,
                        loadOnState: "app.domain.alldom",
                        loadOnStateParams: {
                            allDom: domain.displayName
                        }
                    }];

                    _.forEach(domain.subProducts, (subDomain) =>
                        subLinks.push({
                            name: subDomain.name,
                            label: subDomain.displayName,
                            title: subDomain.displayName,
                            state: "app.domain.alldom",
                            stateParams: {
                                allDom: domain.displayName,
                                productId: subDomain.name
                            }
                        })
                    );

                    domainItem.subLinks = subLinks;
                }

                domainsMenu.push(domainItem);
            });

            return domainsMenu;
        };

        const getMicrosoftMenu = (products) => {
            // Exchange products
            const exchangeLinks = [];
            const exchangeProducts = _.sortBy(products.exchanges, (elt) => angular.lowercase(elt.displayName || elt.name));

            _.forEach(exchangeProducts, (elt) =>
                exchangeLinks.push({
                    name: elt.name,
                    label: elt.displayName || elt.name,
                    title: elt.displayName || elt.name,
                    state: elt.type === "EXCHANGE_PROVIDER" ? "app.microsoft.exchange.provider" : elt.type === "EXCHANGE_DEDICATED" ? "app.microsoft.exchange.dedicated" : "app.microsoft.exchange.hosted",
                    stateParams: {
                        organization: elt.organization,
                        productId: elt.name
                    }
                })
            );

            // Office products
            const officeLinks = [];
            const officeProducts = _.sortBy(products.licenseOffice, (elt) => angular.lowercase(elt.displayName || elt.name));

            _.forEach(officeProducts, (elt) =>
                officeLinks.push({
                    name: elt.name,
                    label: elt.displayName || elt.name,
                    title: elt.displayName || elt.name,
                    state: "app.microsoft.office.product",
                    stateParams: {
                        serviceName: elt.name
                    }
                })
            );

            // SharePoint products
            const sharepointLinks = [];
            const sharepointProducts = _.sortBy(products.sharepoints, (elt) => angular.lowercase(elt.displayName || elt.name));

            _.forEach(sharepointProducts, (elt) =>
                sharepointLinks.push({
                    name: elt.name,
                    label: elt.displayName || elt.name,
                    title: elt.displayName || elt.name,
                    state: "app.microsoft.sharepoint.product",
                    stateParams: {
                        exchangeId: elt.exchangeId,
                        productId: elt.name
                    }
                })
            );

            // Build Microsoft menu
            return [{
                name: "microsoft.exchange",
                label: translator.tr("navigation_left_exchange"),
                subLinks: exchangeLinks
            }, {
                name: "microsoft.office",
                label: translator.tr("navigation_left_office"),
                subLinks: officeLinks
            }, {
                name: "microsoft.sharepoint",
                label: translator.tr("navigation_left_sharepoint"),
                subLinks: sharepointLinks
            }];
        };

        const getUniverseMenu = (products) => {
            const domainProducts = products.domains;
            const emailProProducts = _.sortBy(products.emailPros, (elt) => angular.lowercase(elt.name));
            const emailProducts = _.sortBy(products.emails, (elt) => angular.lowercase(elt.displayName || elt.name));

            // Products filtered
            const hostingProducts = _(products.hostings)
                .filter((elt) => elt.type === "HOSTING")
                .sortBy((elt) => angular.lowercase(elt.displayName || elt.name))
                .sortBy((elt) => elt.type)
                .value();
            const databaseProducts = _(products.hostings)
                .filter((elt) => elt.type === "PRIVATE_DATABASE")
                .sortBy((elt) => angular.lowercase(elt.displayName || elt.name))
                .sortBy((elt) => elt.type)
                .value();

            return [{
                name: "domain",
                label: translator.tr("navigation_left_domains"),
                subLinks: getDomainsMenu(domainProducts)
            }, {
                name: "hosting",
                label: translator.tr("navigation_left_hosting"),
                subLinks: getProductsMenu("hosting", hostingProducts)
            }, {
                name: "private-database",
                label: translator.tr("navigation_left_database"),
                subLinks: getProductsMenu("private-database", databaseProducts)
            }, {
                name: "email-pro",
                label: translator.tr("navigation_left_emailPro"),
                subLinks: getProductsMenu("email-pro", emailProProducts)
            }, {
                name: "email",
                label: translator.tr("navigation_left_email"),
                subLinks: getProductsMenu("email.domain", emailProducts)
            }, {
                name: "microsoft",
                label: translator.tr("navigation_left_microsoft"),
                subLinks: getMicrosoftMenu(products)
            }];
        };

        const getAssistanceMenu = (currentUser) => {
            const currentSubsidiaryURLs = constants.urls[currentUser.ovhSubsidiary];
            const assistanceMenu = [];

            // Guides (External)
            if (_(currentSubsidiaryURLs).has("guides.home")) {
                assistanceMenu.push({
                    label: translator.tr("common_menu_support_all_guides"),
                    url: currentSubsidiaryURLs.guides.home,
                    isExternal: true
                });
            }

            // New ticket
            assistanceMenu.push({
                label: translator.tr("common_menu_support_new_ticket"),
                click: (callback) => {
                    if (!OtrsPopupService.isLoaded()) {
                        OtrsPopupService.init();
                    } else {
                        OtrsPopupService.toggle();
                    }

                    if (typeof callback === "function") {
                        callback();
                    }
                }
            });

            // Tickets list
            assistanceMenu.push({
                label: translator.tr("common_menu_support_list_ticket"),
                url: "#/support"
            });

            // Telephony (External)
            if (_(currentSubsidiaryURLs).has("support_contact")) {
                assistanceMenu.push({
                    label: translator.tr("common_menu_support_telephony_contact"),
                    url: currentSubsidiaryURLs.support_contact,
                    isExternal: true
                });
            }

            return {
                name: "assistance",
                label: translator.tr("common_menu_support_assistance"),
                iconClass: "icon-assistance",
                subLinks: assistanceMenu
            };
        };

        const getInternalLinks = (currentUser) => {
            const internalLinks = [];
            const currentLanguageName = getCurrentLanguageName();
            const currentLanguageDetectedCorrectly = _(currentLanguageName).isString();

            // Language
            if (currentLanguageDetectedCorrectly) {
                internalLinks.push({
                    name: "languages",
                    label: currentLanguageName,
                    iconClass: "icon-languages",
                    subLinks: getLanguageChangingMenuObject()
                });
            }

            // Assistance
            internalLinks.push(getAssistanceMenu(currentUser));

            // User
            internalLinks.push({
                name: "user",
                label: currentUser.firstName,
                iconClass: "icon-user",
                subLinks: [
                    {
                        label: translator.tr("global_account"),
                        url: "#/useraccount/infos"
                    }, {
                        label: translator.tr("global_billing"),
                        url: "#/billing/history"
                    }, {
                        label: translator.tr("global_renew"),
                        url: "#/billing/autoRenew"
                    }, {
                        label: translator.tr("global_orders"),
                        url: "#/billing/orders"
                    }, {
                        label: translator.tr("global_contacts"),
                        url: "#/useraccount/contacts?tab=SERVICES"
                    }, {
                        label: translator.tr("global_conso"),
                        url: "#/billing/consumptionsTelephony"
                    }, {
                        label: translator.tr("global_list_ticket"),
                        url: "#/ticket"
                    }, {
                        label: translator.tr("global_logout"),
                        variantClass: "logout",
                        click: (callback) => {
                            ssoAuthentication.logout();

                            if (typeof callback === "function") {
                                callback();
                            }
                        }
                    }
                ]
            });

            return internalLinks;
        };

        // Get navbar navigation and user infos
        this.getNavbar = () => {
            const currentUniverse = constants.UNIVERS;
            const managerUrls = constants.MANAGER_URLS;
            const managerNames = Object.keys(managerUrls);

            return $q.all([
                Products.getProductsByType(),
                User.getUser()
            ]).then((result) => {
                const products = result[0];
                const currentUser = result[1];

                const navigation = {
                    brand: {
                        label: translator.tr("universe_univers-portal_name"),
                        title: translator.tr("universe_univers-portal_name"),
                        url: managerUrls.portal
                    },

                    // Set Internal Links
                    internalLinks: getInternalLinks(currentUser),

                    // Set Manager Links
                    managerLinks: _.map(managerNames, (managerName) => {
                        const managerLink = {
                            name: managerName,
                            label: translator.tr(`universe_univers-${managerName}_name`),
                            title: translator.tr(`universe_univers-${managerName}_name`),
                            url: managerUrls[managerName],
                            isPrimary: ["partners", "v3", "labs"].indexOf(managerName) === -1
                        };

                        if (managerName === currentUniverse) {
                            managerLink.subLinks = getUniverseMenu(products);
                        }

                        return managerLink;
                    })
                };

                return {
                    currentUser,
                    navigation
                };
            });
        };

        // Toggle menu from button click
        let navbarNav;
        this.toggleMenu = (state, isInternalNav) => {
            if (state) {
                if (!isInternalNav && (!navbarNav || !navbarNav[state])) {
                    navbarNav = {};
                }

                if (isInternalNav || !navbarNav[state]) {
                    navbarNav[state] = !navbarNav[state];
                } else if (navbarNav[state]) {
                    navbarNav = null;
                }
            } else {
                navbarNav = null;
            }

            return navbarNav;
        };
    });
