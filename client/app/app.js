import { Environment } from '@ovh-ux/manager-config';
import ovhManagerCore from '@ovh-ux/manager-core';
import ngAtInternet from '@ovh-ux/ng-at-internet';
import ngAtInternetUiRouterPlugin from '@ovh-ux/ng-at-internet-ui-router-plugin';
import ngOvhApiWrappers from '@ovh-ux/ng-ovh-api-wrappers';
import ngOvhChatbot from '@ovh-ux/ng-ovh-chatbot';
import ngOvhHttp from '@ovh-ux/ng-ovh-http';
import ngOvhSsoAuth from '@ovh-ux/ng-ovh-sso-auth';
import ngOvhSsoAuthModalPlugin from '@ovh-ux/ng-ovh-sso-auth-modal-plugin';
import ngOvhSwimmingPoll from '@ovh-ux/ng-ovh-swimming-poll';
import ngOvhProxyRequest from '@ovh-ux/ng-ovh-proxy-request';
import ngOvhUserPref from '@ovh-ux/ng-ovh-user-pref';
import ngOvhWebUniverseComponents from '@ovh-ux/ng-ovh-web-universe-components';
import ngTranslateAsyncLoader from '@ovh-ux/ng-translate-async-loader';
import ovhManagerNavbar from '@ovh-ux/manager-navbar';
import uiRouter from '@uirouter/angularjs';
import ngOvhOtrs from '@ovh-ux/ng-ovh-otrs';
import ovhManagerServerSidebar from '@ovh-ux/manager-server-sidebar';
import domainEmailObfuscation from './domain/email-obfuscation/index';
import domainOptin from './domain/optin/index';
import config from './config/config';
import navbar from './components/navbar';

Environment.setRegion(__WEBPACK_REGION__);

angular
  .module('App', [
    ovhManagerCore,
    'ovh-angular-pagination-front',
    'ovh-utils-angular',
    'ui.bootstrap',
    'ngAria',
    'ngRoute',
    'ngResource',
    'ngSanitize',
    'controllers',
    'services',
    'filters',
    'directives',
    'ovh-angular-q-allSettled',
    'ngMessages',
    'ngFlash',
    'vs-repeat',
    'ovh-angular-export-csv',
    'ngFileUpload',
    'xeditable',
    ngAtInternet,
    ngAtInternetUiRouterPlugin,
    ngOvhApiWrappers,
    ngOvhChatbot,
    ngOvhHttp,
    ngOvhSsoAuth,
    ngOvhSsoAuthModalPlugin,
    ngOvhSwimmingPoll,
    ngOvhProxyRequest,
    ngOvhUserPref,
    ngOvhWebUniverseComponents,
    ngTranslateAsyncLoader,
    ovhManagerServerSidebar,
    uiRouter,
    'pascalprecht.translate',
    'ovh-angular-responsive-tabs',
    'ovh-angular-tail-logs',
    ngOvhOtrs,
    'ovh-api-services',
    'ovh-angular-toaster',
    ovhManagerNavbar,
    'ngCkeditor',
    'moment-picker',
    'oui',
    'Module.exchange',
    'Module.microsoft',
    'Module.sharepoint',
    'Module.emailpro',
    domainEmailObfuscation,
    domainOptin,
    navbar,
  ])
  .constant('constants', {
    prodMode: config.prodMode,
    aapiRootPath: config.aapiRootPath,
    target: config.target,
    renew: config.constants.RENEW_URL,
    loginUrl: config.constants.loginUrl,
    urls: config.constants.URLS,
    comodo: config.constants.COMODO,
    CHATBOT_URL: config.constants.CHATBOT_URL,
    AUTORENEW_URL: config.constants.AUTORENEW_URL,
    BILLING_URL: config.constants.BILLING_URL,
    UNIVERS: config.constants.UNIVERS,
    UNIVERSES: config.constants.UNIVERSES,
    TOP_GUIDES: config.constants.TOP_GUIDES,
    swsProxyRootPath: 'apiv6/',
    urchin: config.constants.LOGS_URCHIN,
    urchin_gra: config.constants.LOGS_URCHIN_GRA,
    stats_logs: config.constants.STATS_LOGS,
    stats_logs_gra: config.constants.STATS_LOGS_GRA,
    aapiHeaderName: 'X-Ovh-Session',
    flags_options: config.constants.flags_options,
    algorithm_options: config.constants.algorithm_options,
    MANAGER_URLS: config.constants.MANAGER_URLS,
    HOSTING: config.constants.HOSTING,
    NO_AUTORENEW_COUNTRIES: config.constants.NO_AUTORENEW_COUNTRIES,
    DOMAIN: config.constants.DOMAIN,
    WEBSITE_URLS: config.constants.website_url,
    new_bdd_user_grant_options: config.constants.new_bdd_user_grant_options,
    REDIRECT_URLS: config.constants.REDIRECT_URLS,
  })
  .constant('LANGUAGES', config.constants.LANGUAGES)
  .constant('website_url', config.constants.website_url)
  .factory('serviceTypeInterceptor', () => ({
    request: (config) => { // eslint-disable-line
      if (/^(\/?engine\/)?2api(-m)?\//.test(config.url)) {
        _.set(config, 'url', config.url.replace(/^(\/?engine\/)?2api(-m)?/, ''));
        _.set(config, 'serviceType', 'aapi');
      }

      if (/^apiv6\//.test(config.url)) {
        _.set(config, 'url', config.url.replace(/^apiv6/, ''));
        _.set(config, 'serviceType', 'apiv6');
      }

      if (/^apiv7\//.test(config.url)) {
        _.set(config, 'url', config.url.replace(/^apiv7/, ''));
        _.set(config, 'serviceType', 'apiv7');
      }

      return config;
    },
  }))
  .config([
    '$qProvider',
    ($qProvider) => {
      $qProvider.errorOnUnhandledRejections(false);
    },
  ])
  .config(/* @ngInject */(ovhProxyRequestProvider) => {
    ovhProxyRequestProvider.proxy('$http');
    ovhProxyRequestProvider.pathPrefix('apiv6');
  })
  .config([
    'tmhDynamicLocaleProvider',
    (tmhDynamicLocaleProvider) => {
      tmhDynamicLocaleProvider.localeLocationPattern('resources/angular/i18n/angular-locale_{{locale}}.js');
    },
  ])
  .config([
    'OvhHttpProvider',
    'constants',
    (OvhHttpProvider, constants) => {
      _.set(OvhHttpProvider, 'rootPath', constants.swsProxyPath);
      _.set(OvhHttpProvider, 'clearCacheVerb', ['POST', 'PUT', 'DELETE']);
      _.set(OvhHttpProvider, 'returnSuccessKey', 'data'); // By default, request return response.data
      _.set(OvhHttpProvider, 'returnErrorKey', 'data'); // By default, request return error.data
    },
  ])
  .config([
    '$compileProvider',
    '$logProvider',
    'constants',
    ($compileProvider, $logProvider, constants) => {
      // Debug mode and logs are disabled in production
      $compileProvider.debugInfoEnabled(!constants.prodMode);
      $logProvider.debugEnabled(!constants.prodMode);
    },
  ])
  .config([
    'atInternetProvider',
    'atInternetUiRouterPluginProvider',
    'constants',
    (atInternetProvider, atInternetUiRouterPluginProvider, constants) => {
      atInternetProvider.setEnabled(constants.prodMode && window.location.port.length <= 3);
      atInternetProvider.setDebug(!constants.prodMode);

      atInternetUiRouterPluginProvider
        .setTrackStateChange(constants.prodMode && window.location.port.length <= 3);
      atInternetUiRouterPluginProvider.addStateNameFilter(routeName => (routeName ? routeName.replace(/^app/, 'web').replace(/\./g, '::') : ''));
    },
  ])
  .constant('TRACKING', {
    config: {
      level2: '2',
    },
  })
  .run((atInternet, TRACKING, OvhApiMe) => {
    const { config } = TRACKING; // eslint-disable-line

    OvhApiMe.v6().get().$promise
      .then((me) => {
        config.countryCode = me.country;
        config.currencyCode = me.currency && me.currency.code;
        config.visitorId = me.customerCode;
        atInternet.setDefaults(config);
      });
  })
  .config([
    '$locationProvider',
    ($locationProvider) => {
      $locationProvider.hashPrefix('');
    },
  ])
  .constant('URLS_REDIRECTED_TO_DEDICATED', [new RegExp('/useraccount/.*'), new RegExp('/billing/.*')])
  .config([
    '$stateProvider',
    '$urlRouterProvider',
    'URLS_REDIRECTED_TO_DEDICATED',
    ($stateProvider, $urlRouterProvider, URLS_REDIRECTED_TO_DEDICATED) => {
      /**
       * ALL DOM
       */
      $stateProvider.state('app.alldom', {
        url: '/configuration/all_dom/:allDom/:productId',
        templateUrl: 'domain/domain.html',
        controller: 'DomainCtrl',
        resolve: {
          navigationInformations: [
            'Navigator',
            '$rootScope',
            (Navigator, $rootScope) => {
              _.set($rootScope, 'currentSectionInformation', 'all_dom');
              return Navigator.setNavigationInformation({
                leftMenuVisible: true,
                configurationSelected: true,
              });
            },
          ],
          currentSection: () => 'all_dom',
        },
        translations: { value: ['domain', 'hosting'], format: 'json' },
      });

      _(URLS_REDIRECTED_TO_DEDICATED)
        .forEach((url) => {
          $urlRouterProvider.when(url, [
            '$window',
            'constants',
            '$location',
            ($window, constants, $location) => {
              const lastPartOfUrl = $location.url().substring(1);
              _.set($window, 'location', `${constants.MANAGER_URLS.dedicated}${lastPartOfUrl}`);
            },
          ]);
        })
        .value();

      $urlRouterProvider.otherwise('/configuration');
    },
  ])
  .constant('COMPOSED_TLD', [
    'org.pl',
    'net.pl',
    'com.pl',
    'miasto.pl',
    'co.uk',
    'me.uk',
    'org.uk',
    'ac.uk',
    'asn.au',
    'com.au',
    'net.au',
    'id.au',
    'org.au',
    'edu.au',
    'gov.au',
    'csiro.au',
    'act.au',
    'nsw.au',
    'nt.au',
    'qld.au',
    'sa.au',
    'tas.au',
    'vic.au',
    'wa.au',
    'ac.za',
    'gov.za',
    'law.za',
    'mil.za',
    'school.za',
    'net.za',
    'ltd.uk',
    'plc.uk',
    'net.uk',
    'sch.uk',
    'gov.uk',
    'mod.uk',
    'mil.uk',
    'nhs.uk',
    'police.uk',
    'tm.fr',
    'com.fr',
    'asso.fr',
    'gov.fr',
    'ovh.net',
    'com.af',
    'org.af',
    'net.af',
    'edu.af',
    'ac.be',
    'ab.ca',
    'bc.ca',
    'mb.ca',
    'nb.ca',
    'nf.ca',
    'nl.ca',
    'ns.ca',
    'nt.ca',
    'nu.ca',
    'on.ca',
    'pe.ca',
    'qc.ca',
    'sk.ca',
    'yk.ca',
    'aeroport.fr',
    'assedic.fr',
    'avocat.fr',
    'avoues.fr',
    'cci.fr',
    'chambagri.fr',
    'chirurgiens-dentistes.fr',
    'experts-comptables.fr',
    'geometre-expert.fr',
    'gouv.fr',
    'greta.fr',
    'huissier-justice.fr',
    'medecin.fr',
    'notaires.fr',
    'pharmacien.fr',
    'port.fr',
    'veterinaire.fr',
    'aid.pl',
    'agro.pl',
    'atm.pl',
    'auto.pl',
    'biz.pl',
    'edu.pl',
    'gmina.pl',
    'gsm.pl',
    'info.pl',
    'mail.pl',
    'miasta.pl',
    'media.pl',
    'mil.pl',
    'nieruchomosci.pl',
    'nom.pl',
    'pc.pl',
    'powiat.pl',
    'priv.pl',
    'realestate.pl',
    'rel.pl',
    'sex.pl',
    'shop.pl',
    'sklep.pl',
    'sos.pl',
    'szkola.pl',
    'targi.pl',
    'tm.pl',
    'tourism.pl',
    'travel.pl',
    'turystyka.pl',
  ])
  .run([
    'constants',
    '$location',
    'URLS_REDIRECTED_TO_DEDICATED',
    (constants, $location, URLS_REDIRECTED_TO_DEDICATED) => {
      _(URLS_REDIRECTED_TO_DEDICATED)
        .chain()
        .filter(url => url.test(window.location.href))
        .forEach(() => {
          const lastPartOfUrl = $location.url().substring(1);
          window.location = `${constants.MANAGER_URLS.dedicated}${lastPartOfUrl}`;
        })
        .value();
    },
  ])
  .run([
    'ssoAuthentication',
    'URLS_REDIRECTED_TO_DEDICATED',
    (authentication, URLS_REDIRECTED_TO_DEDICATED) => {
      _(URLS_REDIRECTED_TO_DEDICATED)
        .chain()
        .filter(url => !url.test(window.location.href))
        .forEach(() => {
          authentication.login();
        })
        .value();
    },
  ])
  .run([
    '$rootScope',
    ($rootScope) => {
      $rootScope.$on('$locationChangeStart', () => {
        delete $rootScope.isLeftMenuVisible; // eslint-disable-line
      });
    },
  ])
  .run([
    '$location',
    ($location) => {
      const queryParams = $location.search();

      if (queryParams && queryParams.redirectTo) {
        $location.path(queryParams.redirectTo);
        delete queryParams.redirectTo;
        $location.search(queryParams);
      }
    },
  ])
  .run([
    '$translate',
    ($translate) => {
      const selectedLanguageValue = $translate.use();

      if (_(moment).isObject() && _(selectedLanguageValue).isString()) {
        const locale = selectedLanguageValue.replace(/_/, '-');
        moment.locale(locale);
      }
    },
  ])
  .run([
    'storage',
    (storage) => {
      storage.setKeyPrefix('UNIVERS-WEB');
    },
  ])
  .run((editableOptions, editableThemes) => {
    _.set(editableOptions, 'theme', 'default');

    // overwrite submit button template
    _.set(editableThemes, 'default.submitTpl', ['<button style="background:none;border:none" type="submit">', '<i class="fa fa-check green"></i>', '</button>'].join(''));
    _.set(editableThemes, 'default.cancelTpl', ['<button style="background:none;border:none" ng-click="$form.$cancel()">', '<i class="fa fa-times red"></i>', '</button>'].join(''));
  })
  .config((OtrsPopupProvider, constants) => {
    OtrsPopupProvider.setBaseUrlTickets(_.get(constants, 'REDIRECT_URLS.listTicket', null));
  })
  .constant('UNIVERSE', 'WEB')
  .constant('MANAGER_URLS', {
    web: 'https://www.ovh.com/manager/web/index.html#/',
    dedicated: 'https://www.ovh.com/manager/dedicated/index.html#/',
    cloud: 'https://www.ovh.com/manager/cloud/index.html#/',
    telecom: 'https://www.ovhtelecom.fr/manager/index.html#/',
    sunrise: 'https://www.ovh.com/manager/sunrise/index.html#/',
    portal: 'https://www.ovh.com/manager/portal/index.html#/',
    partners: 'https://www.ovh.com/manager/partners/',
    labs: 'https://www.ovh.com/manager/sunrise/uxlabs/#!/',
  })
  .run((
    $rootScope,
    $transitions,
    $translate,
    ouiClipboardConfiguration,
    ouiCriteriaAdderConfiguration,
    ouiDatagridConfiguration,
    ouiFieldConfiguration,
    ouiNavbarConfiguration,
    ouiPaginationConfiguration,
    ouiStepperConfiguration,
  ) => {
    const removeHook = $transitions.onSuccess({}, () => {
      _.set(ouiClipboardConfiguration, 'translations', {
        copyToClipboardLabel: $translate.instant('common_clipboard_copy_to_clipboard'),
        copiedLabel: $translate.instant('common_clipboard_copied'),
        notSupported: $translate.instant('common_clipboard_not_supported'),
      });

      _.set(ouiCriteriaAdderConfiguration, 'translations', {
        column_label: $translate.instant('common_criteria_adder_column_label'),
        operator_label: $translate.instant('common_criteria_adder_operator_label'),

        operator_boolean_is: $translate.instant('common_criteria_adder_operator_boolean_is'),
        operator_boolean_isNot: $translate.instant('common_criteria_adder_operator_boolean_isNot'),

        operator_string_contains: $translate.instant('common_criteria_adder_operator_string_contains'),
        operator_string_containsNot: $translate.instant('common_criteria_adder_operator_string_containsNot'),
        operator_string_startsWith: $translate.instant('common_criteria_adder_operator_string_startsWith'),
        operator_string_endsWith: $translate.instant('common_criteria_adder_operator_string_endsWith'),
        operator_string_is: $translate.instant('common_criteria_adder_operator_string_is'),
        operator_string_isNot: $translate.instant('common_criteria_adder_operator_string_isNot'),

        operator_number_is: $translate.instant('common_criteria_adder_operator_number_is'),
        operator_number_smaller: $translate.instant('common_criteria_adder_operator_number_smaller'),
        operator_number_bigger: $translate.instant('common_criteria_adder_operator_number_bigger'),

        operator_date_is: $translate.instant('common_criteria_adder_operator_date_is'),
        operator_date_isBefore: $translate.instant('common_criteria_adder_operator_date_isBefore'),
        operator_date_isAfter: $translate.instant('common_criteria_adder_operator_date_isAfter'),

        operator_options_is: $translate.instant('common_criteria_adder_operator_options_is'),
        operator_options_isNot: $translate.instant('common_criteria_adder_operator_options_isNot'),

        true_label: $translate.instant('common_criteria_adder_true_label'),
        false_label: $translate.instant('common_criteria_adder_false_label'),

        value_label: $translate.instant('common_criteria_adder_value_label'),
        submit_label: $translate.instant('common_criteria_adder_submit_label'),
      });

      _.set(ouiDatagridConfiguration, 'translations', {
        emptyPlaceholder: $translate.instant('common_datagrid_nodata'),
      });

      _.set(ouiFieldConfiguration, 'translations', {
        errors: {
          required: $translate.instant('common_field_error_required'),
          number: $translate.instant('common_field_error_number'),
          email: $translate.instant('common_field_error_email'),
          min: $translate.instant('common_field_error_min', { min: '{{min}}' }),
          max: $translate.instant('common_field_error_max', { max: '{{max}}' }),
          minlength: $translate.instant('common_field_error_minlength', { minlength: '{{minlength}}' }),
          maxlength: $translate.instant('common_field_error_maxlength', { maxlength: '{{maxlength}}' }),
          pattern: $translate.instant('common_field_error_pattern'),
        },
      });

      _.set(ouiNavbarConfiguration, 'translations', {
        notification: {
          errorInNotification: $translate.instant('common_navbar_notification_error_in_notification'),
          errorInNotificationDescription: $translate.instant('common_navbar_notification_error_in_notification_description'),
          markRead: $translate.instant('common_navbar_notification_mark_as_read'),
          markUnread: $translate.instant('common_navbar_notification_mark_as_unread'),
          noNotification: $translate.instant('common_navbar_notification_none'),
          noNotificationDescription: $translate.instant('common_navbar_notification_none_description'),
        },
      });

      _.set(ouiPaginationConfiguration, 'translations', {
        resultsPerPage: $translate.instant('common_pagination_resultsperpage'),
        ofNResults: $translate.instant('common_pagination_ofnresults')
          .replace('TOTAL_ITEMS', '{{totalItems}}'),
        currentPageOfPageCount: $translate.instant('common_pagination_currentpageofpagecount')
          .replace('CURRENT_PAGE', '{{currentPage}}')
          .replace('PAGE_COUNT', '{{pageCount}}'),
        previousPage: $translate.instant('common_pagination_previous'),
        nextPage: $translate.instant('common_pagination_next'),
      });

      _.set(ouiStepperConfiguration, 'translations', {
        optionalLabel: $translate.instant('common_stepper_optional_label'),
        modifyThisStep: $translate.instant('common_stepper_modify_this_step'),
        skipThisStep: $translate.instant('common_stepper_skip_this_step'),
        nextButtonLabel: $translate.instant('common_stepper_next_button_label'),
        submitButtonLabel: $translate.instant('common_stepper_submit_button_label'),
      });

      removeHook();
    });
  });
