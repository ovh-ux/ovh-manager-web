angular
    .module("App")
    .run((constants, LANGUAGES, managerNavbar, OtrsPopupService, ssoAuthentication, translator, User) => {
        return User.getUser()
            .then((currentUser) => {
                setMenuItemssToOtherUniverses(currentUser);
                setGeneralMenuItems(currentUser);
            });

        function setMenuItemssToOtherUniverses (currentUser) {
            const universeMenuItems = Object.keys(constants.MANAGER_URLS)
                .map((universeName) => ({
                    icon: universeName === "labs" ? "fa fa-flask fs24" : null,
                    label: universeName === "labs" ? null : translator.tr(`universe_univers-${universeName}_name`),
                    title: translator.tr(`universe_univers-${universeName}_name`),
                    universe: universeName,
                    url: constants.MANAGER_URLS[universeName]
                }))
                .filter((universeMenuItem) => universeMenuItem.universe === "partners" || universeMenuItem.universe === "labs" ? currentUser.ovhSubsidiary === "FR" : true);

            managerNavbar.setExternalLinks(universeMenuItems);
        }

        function setGeneralMenuItems (currentUser) {
            const generalMenuItems = buildGeneralMenuItems(currentUser);
            managerNavbar.setInternalLinks(generalMenuItems);
        }

        function buildGeneralMenuItems (currentUser) {
            const assistanceMenuItem = buildAssistanceMenuItem(currentUser);

            const generalMenuItems = [
                assistanceMenuItem,
                {
                    label: translator.tr("global_billing"),
                    url: constants.BILLING_URL
                }
            ];

            const currentLanguageName = getCurrentLanguageName();
            const currentLanguageDetectedCorrectly = _(currentLanguageName).isString();

            if (currentLanguageDetectedCorrectly) {
                generalMenuItems.push({
                    label: currentLanguageName,
                    subLinks: getLanguageChangingMenuObject()
                });
            }

            generalMenuItems.push({
                label: `${currentUser.firstName} ${currentUser.lastName} (${currentUser.nichandle})`,
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
            });

            return generalMenuItems;
        }

        function buildAssistanceMenuItem (currentUser) {
            const currentSubsidiaryURLs = constants.urls[currentUser.ovhSubsidiary];

            const assistanceMenuItems = [];
            if (_(currentSubsidiaryURLs).has("guides.home")) {
                assistanceMenuItems.push({
                    label: translator.tr("common_menu_support_all_guides"),
                    url: currentSubsidiaryURLs.guides.home
                });
            }

            assistanceMenuItems.push({
                label: translator.tr("common_menu_support_new_ticket"),
                click: () => {
                    if (!OtrsPopupService.isLoaded()) {
                        OtrsPopupService.init();
                    } else {
                        OtrsPopupService.toggle();
                    }
                }
            });

            assistanceMenuItems.push({
                label: translator.tr("common_menu_support_list_ticket"),
                url: "#/support"
            });

            if (_(currentSubsidiaryURLs).has("support_contact")) {
                assistanceMenuItems.push({
                    label: translator.tr("common_menu_support_telephony_contact"),
                    url: currentSubsidiaryURLs.support_contact
                });
            }

            return {
                label: translator.tr("common_menu_support_assistance"),
                subLinks: assistanceMenuItems
            };
        }

        function getCurrentLanguageName () {
            const currentLanguage = _(LANGUAGES).find({ value: translator.getLanguage() });
            const currentLanguageName = _(currentLanguage).get("name");

            return currentLanguageName;
        }

        function getLanguageChangingMenuObject () {
            const languageChangingMenuObject = _(LANGUAGES)
                .filter((language) => _(language).has("name", "value"))
                .map((language) => ({
                    label: language.name,
                    click: () => {
                        localStorage["univers-selected-language"] = language.value;
                        window.location.reload();
                    },
                    lang: _(language.value).chain()
                        .words()
                        .head()
                        .value()
                }))
                .value();

            return languageChangingMenuObject;
        }
    });
