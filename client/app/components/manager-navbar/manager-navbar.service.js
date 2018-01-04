angular.module("App")
    .service("ManagerNavbarService", class ManagerNavbarService {
        constructor ($q, constants, translator, Products, User, LANGUAGES, OtrsPopupService, ssoAuthentication) {
            this.$q = $q;
            this.constants = constants;
            this.translator = translator;
            this.products = Products;
            this.user = User;
            this.LANGUAGES = LANGUAGES;
            this.navbarNav = {};
            this.otrsPopupService = OtrsPopupService;
            this.ssoAuthentication = ssoAuthentication;
        }

        getLanguageChangingMenuObject () {
            const languageChangingMenuObject = _(this.LANGUAGES)
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
        }

        getCurrentLanguageName () {
            const currentLanguage = _(this.LANGUAGES).find({ value: this.translator.getLanguage() });
            const currentLanguageName = _(currentLanguage).get("name");

            return currentLanguageName;
        }

        /* eslint-disable class-methods-use-this */
        getProductsMenu (categoryName, products) {
            return _.map(products, (product) => ({
                label: product.displayName || product.name,
                title: product.displayName || product.name,
                state: `app.${categoryName}`,
                stateParams: {
                    productId: product.name
                }
            }));
        }
        /* eslint-disable class-methods-use-this */

        getDomainsMenu (domains) {
            const domainsMenu = [{
                label: this.translator.tr("navigation_left_all_domains"),
                title: this.translator.tr("navigation_left_all_domains"),
                state: "app.domain.all"
            }, {
                label: this.translator.tr("navigation_left_all_domains_operations"),
                title: this.translator.tr("navigation_left_all_domains_operations"),
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
                    domainItem.subLinks = _.map(domain.subProducts, (subDomain) => ({
                        name: subDomain.name,
                        label: subDomain.displayName,
                        title: subDomain.displayName,
                        state: "app.domain.alldom",
                        stateParams: {
                            allDom: domain.displayName,
                            productId: subDomain.name
                        }
                    }));
                }

                domainsMenu.push(domainItem);
            });

            return domainsMenu;
        }

        getMicrosoftMenu (products) {
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
                label: this.translator.tr("navigation_left_exchange"),
                subLinks: exchangeLinks
            }, {
                name: "microsoft.office",
                label: this.translator.tr("navigation_left_office"),
                subLinks: officeLinks
            }, {
                name: "microsoft.sharepoint",
                label: this.translator.tr("navigation_left_sharepoint"),
                subLinks: sharepointLinks
            }];
        }

        getUniverseMenu (products) {
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
                label: this.translator.tr("navigation_left_domains"),
                subLinks: this.getDomainsMenu(domainProducts)
            }, {
                name: "hosting",
                label: this.translator.tr("navigation_left_hosting"),
                subLinks: this.getProductsMenu("hosting", hostingProducts)
            }, {
                name: "private-database",
                label: this.translator.tr("navigation_left_database"),
                subLinks: this.getProductsMenu("private-database", databaseProducts)
            }, {
                name: "email-pro",
                label: this.translator.tr("navigation_left_emailPro"),
                subLinks: this.getProductsMenu("email-pro", emailProProducts)
            }, {
                name: "email",
                label: this.translator.tr("navigation_left_email"),
                subLinks: this.getProductsMenu("email.domain", emailProducts)
            }, {
                name: "microsoft",
                label: this.translator.tr("navigation_left_microsoft"),
                subLinks: this.getMicrosoftMenu(products)
            }];
        }

        getAssistanceMenu (currentUser) {
            const currentSubsidiaryURLs = this.constants.urls[currentUser.ovhSubsidiary];
            const assistanceMenu = [];

            // Guides (External)
            if (_(currentSubsidiaryURLs).has("guides.home")) {
                assistanceMenu.push({
                    label: this.translator.tr("common_menu_support_all_guides"),
                    url: currentSubsidiaryURLs.guides.home,
                    isExternal: true
                });
            }

            // New ticket
            assistanceMenu.push({
                label: this.translator.tr("common_menu_support_new_ticket"),
                click: (callback) => {
                    if (!this.otrsPopupService.isLoaded()) {
                        this.otrsPopupService.init();
                    } else {
                        this.otrsPopupService.toggle();
                    }

                    if (typeof callback === "function") {
                        callback();
                    }
                }
            });

            // Tickets list
            assistanceMenu.push({
                label: this.translator.tr("common_menu_support_list_ticket"),
                url: "#/support"
            });

            // Telephony (External)
            if (_(currentSubsidiaryURLs).has("support_contact")) {
                assistanceMenu.push({
                    label: this.translator.tr("common_menu_support_telephony_contact"),
                    url: currentSubsidiaryURLs.support_contact,
                    isExternal: true
                });
            }

            return {
                name: "assistance",
                label: this.translator.tr("common_menu_support_assistance"),
                iconClass: "icon-assistance",
                subLinks: assistanceMenu
            };
        }

        getInternalLinks (currentUser) {
            const internalLinks = [];
            const currentLanguageName = this.getCurrentLanguageName();
            const currentLanguageDetectedCorrectly = _(currentLanguageName).isString();

            // Language
            if (currentLanguageDetectedCorrectly) {
                internalLinks.push({
                    name: "languages",
                    label: currentLanguageName,
                    iconClass: "icon-languages",
                    subLinks: this.getLanguageChangingMenuObject()
                });
            }

            // Assistance
            internalLinks.push(this.getAssistanceMenu(currentUser));

            // User
            internalLinks.push({
                name: "user",
                label: currentUser.firstName,
                iconClass: "icon-user",
                subLinks: [
                    {
                        label: this.translator.tr("global_account"),
                        url: "#/useraccount/infos"
                    }, {
                        label: this.translator.tr("global_billing"),
                        url: "#/billing/history"
                    }, {
                        label: this.translator.tr("global_renew"),
                        url: "#/billing/autoRenew"
                    }, {
                        label: this.translator.tr("global_orders"),
                        url: "#/billing/orders"
                    }, {
                        label: this.translator.tr("global_contacts"),
                        url: "#/useraccount/contacts?tab=SERVICES"
                    }, {
                        label: this.translator.tr("global_conso"),
                        url: "#/billing/consumptionsTelephony"
                    }, {
                        label: this.translator.tr("global_list_ticket"),
                        url: "#/ticket"
                    }, {
                        label: this.translator.tr("global_logout"),
                        variantClass: "logout",
                        click: (callback) => {
                            this.ssoAuthentication.logout();

                            if (typeof callback === "function") {
                                callback();
                            }
                        }
                    }
                ]
            });

            return internalLinks;
        }

        // Get navbar navigation and user infos
        getNavbar () {
            const currentUniverse = this.constants.UNIVERS;
            const managerUrls = this.constants.MANAGER_URLS;
            const managerNames = Object.keys(managerUrls);

            return this.$q.all([
                this.products.getProductsByType(),
                this.user.getUser()
            ]).then((result) => {
                const products = result[0];
                const currentUser = result[1];

                const navigation = {
                    brand: {
                        label: this.translator.tr("universe_univers-portal_name"),
                        title: this.translator.tr("universe_univers-portal_name"),
                        url: managerUrls.portal
                    },

                    // Set Internal Links
                    internalLinks: this.getInternalLinks(currentUser),

                    // Set Manager Links
                    managerLinks: _.map(managerNames, (managerName) => {
                        const managerLink = {
                            name: managerName,
                            label: this.translator.tr(`universe_univers-${managerName}_name`),
                            title: this.translator.tr(`universe_univers-${managerName}_name`),
                            url: managerUrls[managerName],
                            isPrimary: ["partners", "v3", "labs"].indexOf(managerName) === -1
                        };

                        if (managerName === currentUniverse) {
                            managerLink.subLinks = this.getUniverseMenu(products);
                        }

                        return managerLink;
                    })
                };

                return {
                    currentUser,
                    navigation
                };
            });
        }

        // Toggle menu from button click
        toggleMenu (state, isInternalNav) {
            if (state) {
                if (!isInternalNav && (!this.navbarNav || !this.navbarNav[state])) {
                    this.navbarNav = {};
                }

                if (isInternalNav || !this.navbarNav[state]) {
                    this.navbarNav[state] = !this.navbarNav[state];
                } else if (this.navbarNav[state]) {
                    this.navbarNav = null;
                }
            } else {
                this.navbarNav = null;
            }

            return this.navbarNav;
        }
    });
