angular
    .module("App")
    .factory("serviceTypeInterceptor", () => {
        "use strict";
        return {
            request: (config) => {
                if (/^(\/?engine\/)?2api(\-m)?\//.test(config.url)) {
                    config.url = config.url.replace(/^(\/?engine\/)?2api(\-m)?/, "");
                    config.serviceType = "aapi";
                }

                if (/^apiv6\//.test(config.url)) {
                    config.url = config.url.replace(/^apiv6/, "");
                    config.serviceType = "apiv6";
                }

                if (/^apiv7\//.test(config.url)) {
                    config.url = config.url.replace(/^apiv7/, "");
                    config.serviceType = "apiv7";
                }

                return config;
            }
        };
    })
    .factory("ravenInterceptor", [
        "$q",
        "Raven",
        ($q, Raven) => {
            "use strict";
            return {
                responseError: (response) => {
                    if (response.status === 429 || response.status >= 500) {
                        Raven.captureMessage([response.status, response.config.url, JSON.stringify(response.data)].join(" - "), {
                            extra: {
                                "x-ovh-queryid": response.headers("x-ovh-queryid")
                            }
                        });
                    }
                    return $q.reject(response);
                }
            };
        }
    ])
    .config([
        "$qProvider",
        function ($qProvider) {
            "use strict";
            $qProvider.errorOnUnhandledRejections(false);
        }
    ])
    .config([
        "$httpProvider",
        "constants",
        ($httpProvider, constants) => {
            "use strict";
            if (constants.prodMode) {
                $httpProvider.interceptors.push("ravenInterceptor");
            }
        }
    ])
    .config([
        "ovh-proxy-request.proxyProvider",
        (proxy) => {
            "use strict";
            proxy.proxy("$http");
            proxy.pathPrefix("apiv6");
        }
    ])
    .config([
        "ssoAuthenticationProvider",
        "$httpProvider",
        "constants",
        (authentication, $httpProvider, constants) => {
            "use strict";

            authentication.setLoginUrl(constants.loginUrl);
            authentication.setLogoutUrl(`${constants.loginUrl}?action=disconnect`);

            if (!constants.prodMode) {
                authentication.setUserUrl("engine/apiv6/me");
            }

            authentication.setConfig([
                {
                    serviceType: "apiv6",
                    urlPrefix: constants.prodMode ? "/engine/apiv6" : "engine/apiv6"
                },
                {
                    serviceType: "aapi",
                    urlPrefix: constants.prodMode ? "/engine/2api" : "engine/2api"
                },
                {
                    serviceType: "apiv7",
                    urlPrefix: constants.prodMode ? "/engine/apiv7" : "engine/apiv7"
                },
                {
                    serviceType: "external",
                    urlPrefix: ""
                }
            ]);
            $httpProvider.interceptors.push("serviceTypeInterceptor");
            $httpProvider.interceptors.push("ssoAuthInterceptor");
        }
    ])
    .config([
        "tmhDynamicLocaleProvider",
        (tmhDynamicLocaleProvider) => {
            "use strict";
            tmhDynamicLocaleProvider.localeLocationPattern("resources/angular/i18n/angular-locale_{{locale}}.js");
        }
    ])
    .config([
        "OvhHttpProvider",
        "constants",
        (OvhHttpProvider, constants) => {
            "use strict";
            OvhHttpProvider.rootPath = constants.swsProxyPath;
            OvhHttpProvider.clearCacheVerb = ["POST", "PUT", "DELETE"];
            OvhHttpProvider.returnSuccessKey = "data"; // By default, request return response.data
            OvhHttpProvider.returnErrorKey = "data"; // By default, request return error.data
        }
    ])
    .config([
        "LANGUAGES",
        "translatorProvider",
        (LANGUAGES, translator) => {
            "use strict";
            translator.setAvailableLanguages(LANGUAGES);
        }
    ])
    .config([
        "$compileProvider",
        "$logProvider",
        "constants",
        ($compileProvider, $logProvider, constants) => {
            "use strict";

            // Debug mode and logs are disabled in production
            $compileProvider.debugInfoEnabled(!constants.prodMode);
            $logProvider.debugEnabled(!constants.prodMode);
        }
    ])
    .config([
        "atInternetProvider",
        "atInternetUiRouterPluginProvider",
        "constants",
        (atInternetProvider, atInternetUiRouterPluginProvider, constants) => {
            "use strict";

            atInternetProvider.setEnabled(constants.prodMode && window.location.port.length <= 3);
            atInternetProvider.setDebug(!constants.prodMode);

            atInternetUiRouterPluginProvider.setTrackStateChange(constants.prodMode && window.location.port.length <= 3);
            atInternetUiRouterPluginProvider.addStateNameFilter((routeName) => routeName ? routeName.replace(/^app/, "web").replace(/\./g, "::") : "");
        }
    ])
    .constant("TRACKING", {
        config: {
            level2: "2"
        }
    })
    .run((atInternet, TRACKING, OvhApiMe) => {
        "use strict";

        const config = TRACKING.config;

        OvhApiMe.Lexi().get().$promise
            .then((me) => {
                config.countryCode = me.country;
                config.currencyCode = me.currency && me.currency.code;
                config.visitorId = me.customerCode;
                atInternet.setDefaults(config);
            });
    })
    .config([
        "$locationProvider",
        function ($locationProvider) {
            "use strict";
            $locationProvider.hashPrefix("");
        }
    ])
    .constant("URLS_REDIRECTED_TO_DEDICATED", [new RegExp("/useraccount/.*"), new RegExp("/billing/.*")])
    .config([
        "$stateProvider",
        "$urlRouterProvider",
        "URLS_REDIRECTED_TO_DEDICATED",
        ($stateProvider, $urlRouterProvider, URLS_REDIRECTED_TO_DEDICATED) => {
            "use strict";

            /*
            * ALL DOM
            */
            $stateProvider.state("app.alldom", {
                url: "/configuration/all_dom/:allDom/:productId",
                templateUrl: "domain/domain.html",
                controller: "DomainCtrl",
                resolve: {
                    navigationInformations: [
                        "Navigator",
                        "$rootScope",
                        (Navigator, $rootScope) => {
                            $rootScope.currentSectionInformation = "all_dom";
                            return Navigator.setNavigationInformation({
                                leftMenuVisible: true,
                                configurationSelected: true
                            });
                        }
                    ],
                    translator: [
                        "translator",
                        function (translator) {
                            return translator.load(["domain", "hosting"]).then(() => translator);
                        }
                    ],
                    currentSection: () => "all_dom"
                }
            });

            _(URLS_REDIRECTED_TO_DEDICATED)
                .forEach((url) => {
                    $urlRouterProvider.when(url, [
                        "$window",
                        "constants",
                        "$location",
                        ($window, constants, $location) => {
                            const lastPartOfUrl = $location.url().substring(1);
                            $window.location = `${constants.MANAGER_URLS.dedicated}${lastPartOfUrl}`;
                        }
                    ]);
                })
                .value();

            $urlRouterProvider.otherwise("/configuration");
        }
    ])
    .constant("COMPOSED_TLD", [
        "org.pl",
        "net.pl",
        "com.pl",
        "miasto.pl",
        "co.uk",
        "me.uk",
        "org.uk",
        "ac.uk",
        "asn.au",
        "com.au",
        "net.au",
        "id.au",
        "org.au",
        "edu.au",
        "gov.au",
        "csiro.au",
        "act.au",
        "nsw.au",
        "nt.au",
        "qld.au",
        "sa.au",
        "tas.au",
        "vic.au",
        "wa.au",
        "ac.za",
        "gov.za",
        "law.za",
        "mil.za",
        "school.za",
        "net.za",
        "ltd.uk",
        "plc.uk",
        "net.uk",
        "sch.uk",
        "gov.uk",
        "mod.uk",
        "mil.uk",
        "nhs.uk",
        "police.uk",
        "tm.fr",
        "com.fr",
        "asso.fr",
        "gov.fr",
        "ovh.net",
        "com.af",
        "org.af",
        "net.af",
        "edu.af",
        "ac.be",
        "ab.ca",
        "bc.ca",
        "mb.ca",
        "nb.ca",
        "nf.ca",
        "nl.ca",
        "ns.ca",
        "nt.ca",
        "nu.ca",
        "on.ca",
        "pe.ca",
        "qc.ca",
        "sk.ca",
        "yk.ca",
        "aeroport.fr",
        "assedic.fr",
        "avocat.fr",
        "avoues.fr",
        "cci.fr",
        "chambagri.fr",
        "chirurgiens-dentistes.fr",
        "experts-comptables.fr",
        "geometre-expert.fr",
        "gouv.fr",
        "greta.fr",
        "huissier-justice.fr",
        "medecin.fr",
        "notaires.fr",
        "pharmacien.fr",
        "port.fr",
        "veterinaire.fr",
        "aid.pl",
        "agro.pl",
        "atm.pl",
        "auto.pl",
        "biz.pl",
        "edu.pl",
        "gmina.pl",
        "gsm.pl",
        "info.pl",
        "mail.pl",
        "miasta.pl",
        "media.pl",
        "mil.pl",
        "nieruchomosci.pl",
        "nom.pl",
        "pc.pl",
        "powiat.pl",
        "priv.pl",
        "realestate.pl",
        "rel.pl",
        "sex.pl",
        "shop.pl",
        "sklep.pl",
        "sos.pl",
        "szkola.pl",
        "targi.pl",
        "tm.pl",
        "tourism.pl",
        "travel.pl",
        "turystyka.pl"
    ])
    .run([
        "constants",
        "$location",
        "URLS_REDIRECTED_TO_DEDICATED",
        (constants, $location, URLS_REDIRECTED_TO_DEDICATED) => {
            "use strict";
            _(URLS_REDIRECTED_TO_DEDICATED)
                .chain()
                .filter((url) => url.test(window.location.href))
                .forEach(() => {
                    const lastPartOfUrl = $location.url().substring(1);
                    window.location = `${constants.MANAGER_URLS.dedicated}${lastPartOfUrl}`;
                })
                .value();
        }
    ])
    .run([
        "ssoAuthentication",
        "URLS_REDIRECTED_TO_DEDICATED",
        (authentication, URLS_REDIRECTED_TO_DEDICATED) => {
            "use strict";
            _(URLS_REDIRECTED_TO_DEDICATED)
                .chain()
                .filter((url) => !url.test(window.location.href))
                .forEach(() => {
                    authentication.login();
                })
                .value();
        }
    ])
    .run([
        "$rootScope",
        ($rootScope) => {
            "use strict";
            $rootScope.$on("$locationChangeStart", () => {
                delete $rootScope.isLeftMenuVisible;
            });
        }
    ])
    .run([
        "$location",
        ($location) => {
            "use strict";
            const queryParams = $location.search();

            if (queryParams && queryParams.redirectTo) {
                $location.path(queryParams.redirectTo);
                delete queryParams.redirectTo;
                $location.search(queryParams);
            }
        }
    ])
    .run([
        "translator",
        (translator) => {
            "use strict";
            translator.load(["core", "doubleAuth"]);

            const selectedLanguage = translator.getSelectedAvailableLanguage();
            const selectedLanguageValue = _(selectedLanguage).get("value", null);

            if (_(moment).isObject() && _(selectedLanguageValue).isString()) {
                const locale = selectedLanguageValue.replace(/_/, "-");
                moment.locale(locale);
            }
        }
    ])
    .run([
        "storage",
        (storage) => {
            "use strict";
            storage.setKeyPrefix("UNIVERS-WEB");
        }
    ])
    .run((editableOptions, editableThemes) => {
        "use strict";
        editableOptions.theme = "default";

        // overwrite submit button template
        editableThemes.default.submitTpl = ["<button style=\"background:none;border:none\" type=\"submit\">", "<i class=\"fa fa-check green\"></i>", "</button>"].join("");

        editableThemes.default.cancelTpl = ["<button style=\"background:none;border:none\" ng-click=\"$form.$cancel()\">", "<i class=\"fa fa-times red\"></i>", "</button>"].join("");
    })
    .factory("translateInterceptor", ($q) => {
        "use strict";

        const regexp = new RegExp(/Messages\w+\.json$/i);
        return {
            responseError (rejection) {
                if (regexp.test(rejection.config.url)) {
                    return {};
                }
                return $q.reject(rejection);
            }
        };
    })
    .factory("translateMissingTranslationHandler", ($sanitize) => {
        "use strict";
        return function (translationId) {
            // Fix security issue: https://github.com/angular-translate/angular-translate/issues/1418
            return $sanitize(translationId);
        };
    })
    .config((LANGUAGES, $translateProvider, constants) => {
        "use strict";

        let defaultLanguage = "fr_FR";

        if (localStorage["univers-selected-language"]) {
            defaultLanguage = localStorage["univers-selected-language"];
        } else {
            localStorage["univers-selected-language"] = defaultLanguage;
        }

        $translateProvider.useLoader("$translatePartialLoader", {
            urlTemplate: constants.prodMode ? "{part}/translations/Messages_{lang}.json" : "app/{part}/translations/Messages_{lang}.json"
        });

        $translateProvider.useMissingTranslationHandler("translateMissingTranslationHandler");
        $translateProvider.useLoaderCache(true);
        $translateProvider.useSanitizeValueStrategy("sanitizeParameters");

        $translateProvider.preferredLanguage(defaultLanguage);
        $translateProvider.use(defaultLanguage);
        $translateProvider.fallbackLanguage("fr_FR");
    })
    .config(($stateProvider, $httpProvider) => {
        "use strict";

        $httpProvider.interceptors.push("translateInterceptor");

        $stateProvider.decorator("translations", (state) => {
            const routeOption = state.self;

            if (routeOption.translations) {

                const templateUrlTab = [];
                let translationsTab = routeOption.translations;

                if (routeOption.views) {
                    angular.forEach(routeOption.views, (value) => {

                        if (_.isUndefined(value.noTranslations) && !value.noTranslations) {
                            if (value.templateUrl) {
                                templateUrlTab.push(value.templateUrl);
                            }
                            if (value.translations) {
                                translationsTab = _.union(translationsTab, value.translations);
                            }
                        }

                    });
                }

                angular.forEach(templateUrlTab, (templateUrl) => {
                    let routeTmp = templateUrl.substring(templateUrl.indexOf("/") + 1, templateUrl.lastIndexOf("/"));
                    let index = routeTmp.lastIndexOf("/");

                    while (index > 0) {
                        translationsTab.push(routeTmp);
                        routeTmp = routeTmp.substring(0, index);
                        index = routeTmp.lastIndexOf("/");
                    }

                    translationsTab.push(routeTmp);
                });

                // mmmhhh... It seems that we have to refresh after each time a part is added

                translationsTab = _.uniq(translationsTab);

                state.resolve.translations = ["$translate", "$translatePartialLoader", function ($translate, $translatePartialLoader) {
                    // load translation parts
                    angular.forEach(translationsTab, (part) => {
                        $translatePartialLoader.addPart(part);
                    });

                    return $translate.refresh();

                }];

                return translationsTab;
            }

            return null;
        });
    })
    .constant("UNIVERSE", "WEB")
    .constant("MANAGER_URLS", {
        web: "https://www.ovh.com/manager/web/index.html#/",
        dedicated: "https://www.ovh.com/manager/dedicated/index.html#/",
        cloud: "https://www.ovh.com/manager/cloud/index.html#/",
        telecom: "https://www.ovhtelecom.fr/manager/index.html#/",
        sunrise: "https://www.ovh.com/manager/sunrise/index.html#/",
        v3: "https://www.ovh.com/managerv3/home.pl",
        portal: "https://www.ovh.com/manager/portal/index.html#/",
        partners: "https://www.ovh.com/manager/partners/",
        labs: "https://www.ovh.com/manager/sunrise/uxlabs/#!/"
    })
    .run(($rootScope, translator,
          ouiDatagridConfiguration, ouiPaginationConfiguration) => {
        "use strict";

        const off = $rootScope.$on("$stateChangeSuccess", () => {
            ouiDatagridConfiguration.translations = {
                emptyPlaceholder: translator.tr("common_ouidatagrid_nodata")
            };

            ouiPaginationConfiguration.translations = {
                resultsPerPage: translator.tr("common_ouipagination_resultsperpage")
                    .replace("CURRENT_PAGE", "{{currentPage}}")
                    .replace("PAGE_COUNT", "{{pageCount}}"),
                ofNResults: translator.tr("common_ouipagination_ofnresults")
                    .replace("TOTAL_ITEMS", "{{totalItems}}"),
                currentPageOfPageCount: translator.tr("common_ouipagination_currentpageofpagecount"),
                previousPage: translator.tr("common_ouipagination_previous"),
                nextPage: translator.tr("common_ouipagination_next")
            };

            off();
        });
    });

