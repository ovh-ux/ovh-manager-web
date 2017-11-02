angular.module("App").run((LANGUAGES, managerNavbar, User, constants, translator, ssoAuthentication, OtrsPopupService) => {

    User.getUser().then((user) => {
        const universes = Object.keys(constants.MANAGER_URLS)
                                .map((k) => ({
                                    universe: k,
                                    icon: k === "labs" ? "fa fa-flask fs24" : null,
                                    title: translator.tr(`universe_univers-${k}_name`),
                                    label: k === "labs" ? null : translator.tr(`universe_univers-${k}_name`),
                                    url: constants.MANAGER_URLS[k]
                                }))
                                .filter((u) => u.universe === "partners" || u.universe === "labs" ? user.ovhSubsidiary === "FR" : true);

        managerNavbar.setExternalLinks(universes);

        managerNavbar.setInternalLinks([
            {
                label: translator.tr("common_menu_support_assistance"),
                subLinks: [
                    {
                        label: translator.tr("common_menu_support_all_guides"),
                        url: constants.urls[user.ovhSubsidiary].guides.home
                    },
                    {
                        label: translator.tr("common_menu_support_new_ticket"),
                        click: () => {
                            if (!OtrsPopupService.isLoaded()) {
                                OtrsPopupService.init();
                            } else {
                                OtrsPopupService.toggle();
                            }
                        }
                    }, {
                        label: translator.tr("common_menu_support_list_ticket"),
                        url: "#/support"
                    }, {
                        label: translator.tr("common_menu_support_telephony_contact"),
                        url: constants.urls[user.ovhSubsidiary].support_contact
                    }
                ]
            },
            {
                label: translator.tr("global_billing"),
                url: constants.BILLING_URL
            },
            {
                label: (function () {
                    const selectedLang = _.find(LANGUAGES, { value: translator.getLanguage() });
                    return _.get(selectedLang, "name");
                })(),
                subLinks: (function () {
                    const subLinksLang = [];
                    angular.forEach(LANGUAGES, (lang) => {
                        subLinksLang.push({
                            label: lang.name,
                            click: () => {
                                localStorage["univers-selected-language"] = lang.value;
                                window.location.reload();
                            },
                            lang: _.chain(lang.value).words().head().value()
                        });
                    });
                    return subLinksLang;
                })()
            },
            {
                label: `${user.firstName} ${user.lastName} (${user.nichandle})`,
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
                        label: translator.tr("global_logout"),
                        click: () => {
                            ssoAuthentication.logout();
                        }
                    }
                ]
            }
        ]);
    });
});
