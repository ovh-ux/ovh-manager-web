class SessionService {
  constructor(
    $q,
    $translate,
    constants,
    LANGUAGES,
    NavbarNotificationService,
    OtrsPopupService,
    Products,
    ssoAuthentication,
    User,
  ) {
    this.$q = $q;
    this.$translate = $translate;
    this.constants = constants;
    this.LANGUAGES = LANGUAGES;
    this.navbarNotificationService = NavbarNotificationService;
    this.otrsPopupService = OtrsPopupService;
    this.products = Products;
    this.ssoAuthentication = ssoAuthentication;
    this.user = User;
  }

  static getProductsMenu(categoryName, products) {
    return _.map(products, product => ({
      title: product.displayName || product.name,
      state: `app.${categoryName}`,
      stateParams: {
        productId: product.name,
      },
    }));
  }

  getDomainsMenu(domains) {
    const domainsMenu = [{
      title: this.$translate.instant('navigation_left_all_domains'),
      state: 'app.domain.all',
    }, {
      title: this.$translate.instant('navigation_left_all_domains_operations'),
      state: 'app.domain.operation',
    }];

    _.forEach(domains, (domain) => {
      const domainItem = {
        name: domain.name,
        title: domain.displayName || domain.name,
        state: domain.type === 'ZONE' ? 'app.domain.dns-zone' : 'app.domain.product',
        stateParams: {
          productId: domain.name,
        },
      };

      if (domain.subProducts) {
        domainItem.subLinks = _.map(domain.subProducts, subDomain => ({
          name: subDomain.name,
          title: subDomain.displayName,
          state: 'app.domain.alldom',
          stateParams: {
            allDom: domain.displayName,
            productId: subDomain.name,
          },
        }));
      }

      domainsMenu.push(domainItem);
    });

    return domainsMenu;
  }

  getMicrosoftMenu(products) {
    const exchangeProductTypes = {
      EXCHANGE_PROVIDER: 'app.microsoft.exchange.provider',
      EXCHANGE_DEDICATED: 'app.microsoft.exchange.dedicated',
      EXCHANGE_DEDICATEDCLUSTER: 'app.microsoft.exchange.dedicatedCluster',
    };

    // Exchange products
    const exchangeProducts = _.sortBy(
      products.exchanges,
      elt => angular.lowercase(elt.displayName || elt.name),
    );
    const exchangeLinks = _.map(exchangeProducts, elt => ({
      name: elt.name,
      title: elt.displayName || elt.name,
      state: _(exchangeProductTypes[elt.type]).isString() ? exchangeProductTypes[elt.type] : 'app.microsoft.exchange.hosted',
      stateParams: {
        organization: elt.organization,
        productId: elt.name,
      },
    }));

    // Office products
    const officeProducts = _.sortBy(
      products.licenseOffice,
      elt => angular.lowercase(elt.displayName || elt.name),
    );
    const officeLinks = _.map(officeProducts, elt => ({
      name: elt.name,
      title: elt.displayName || elt.name,
      state: 'app.microsoft.office.product',
      stateParams: {
        serviceName: elt.name,
      },
    }));

    // SharePoint products
    const sharepointProducts = _.sortBy(
      products.sharepoints,
      elt => angular.lowercase(elt.displayName || elt.name),
    );
    const sharepointLinks = _.map(sharepointProducts, elt => ({
      name: elt.name,
      title: elt.displayName || elt.name,
      state: 'app.microsoft.sharepoint.product',
      stateParams: {
        exchangeId: elt.exchangeId,
        productId: elt.name,
      },
    }));

    // Build Microsoft menu
    return [{
      name: 'microsoft.exchange',
      title: this.$translate.instant('navigation_left_exchange'),
      subLinks: exchangeLinks,
    }, {
      name: 'microsoft.office',
      title: this.$translate.instant('navigation_left_office'),
      subLinks: officeLinks,
    }, {
      name: 'microsoft.sharepoint',
      title: this.$translate.instant('navigation_left_sharepoint'),
      subLinks: sharepointLinks,
    }];
  }

  getUniverseMenu(products) {
    const domainProducts = products.domains;
    const emailProProducts = _.sortBy(products.emailPros, elt => angular.lowercase(elt.name));
    const emailProducts = _.sortBy(
      products.emails,
      elt => angular.lowercase(elt.displayName || elt.name),
    );

    // Products filtered
    const hostingProducts = _(products.hostings)
      .filter(elt => elt.type === 'HOSTING')
      .sortBy(elt => angular.lowercase(elt.displayName || elt.name))
      .sortBy(elt => elt.type)
      .value();
    const databaseProducts = _(products.hostings)
      .filter(elt => elt.type === 'PRIVATE_DATABASE')
      .sortBy(elt => angular.lowercase(elt.displayName || elt.name))
      .sortBy(elt => elt.type)
      .value();

    return [{
      name: 'domain',
      title: this.$translate.instant('navigation_left_domains'),
      subLinks: this.getDomainsMenu(domainProducts),
    }, {
      name: 'hosting',
      title: this.$translate.instant('navigation_left_hosting'),
      subLinks: this.constructor.getProductsMenu('hosting', hostingProducts),
    }, {
      name: 'private-database',
      title: this.$translate.instant('navigation_left_database'),
      subLinks: this.constructor.getProductsMenu('private-database', databaseProducts),
    }, {
      name: 'email-pro',
      title: this.$translate.instant('navigation_left_emailPro'),
      subLinks: this.constructor.getProductsMenu('email-pro', emailProProducts),
    }, {
      name: 'email',
      title: this.$translate.instant('navigation_left_email'),
      subLinks: this.constructor.getProductsMenu('email.domain', emailProducts),
    }, {
      name: 'microsoft',
      title: this.$translate.instant('navigation_left_microsoft'),
      subLinks: this.getMicrosoftMenu(products),
    }];
  }

  getAssistanceMenu(currentUser) {
    const currentSubsidiaryURLs = this.constants.urls[currentUser.ovhSubsidiary];
    const assistanceMenu = [];

    // Guides (External)
    if (_(currentSubsidiaryURLs).has('guides.home')) {
      assistanceMenu.push({
        title: this.$translate.instant('common_menu_support_all_guides'),
        url: currentSubsidiaryURLs.guides.home,
        isExternal: true,
      });
    }

    // New ticket
    assistanceMenu.push({
      title: this.$translate.instant('common_menu_support_new_ticket'),
      click: (callback) => {
        if (!this.otrsPopupService.isLoaded()) {
          this.otrsPopupService.init();
        } else {
          this.otrsPopupService.toggle();
        }

        if (_.isFunction(callback)) {
          callback();
        }
      },
    });

    // Tickets list
    assistanceMenu.push({
      title: this.$translate.instant('common_menu_support_list_ticket'),
      url: _.get(this.constants, 'REDIRECT_URLS.listTicket', ''),
    });

    // Telephony (External)
    if (_(currentSubsidiaryURLs).has('support_contact')) {
      assistanceMenu.push({
        title: this.$translate.instant('common_menu_support_telephony_contact'),
        url: currentSubsidiaryURLs.support_contact,
        isExternal: true,
      });
    }

    return {
      name: 'assistance',
      title: this.$translate.instant('common_menu_support_assistance'),
      iconClass: 'icon-assistance',
      subLinks: assistanceMenu,
    };
  }

  getLanguageMenu() {
    const currentLanguage = _(this.LANGUAGES).find({ value: this.$translate.use() });

    return {
      name: 'languages',
      label: _(currentLanguage).get('name'),
      class: 'oui-navbar-menu_language',
      title: _(currentLanguage).get('value').split('_')[0].toUpperCase(),
      headerTitle: this.$translate.instant('global_language'),
      subLinks: _(this.LANGUAGES)
        .filter(language => _(language).has('name', 'value'))
        .map(language => ({
          title: language.name,
          isActive: language.value === currentLanguage.value,
          click: (callback) => {
            localStorage['univers-selected-language'] = language.value;
            window.location.reload();

            if (_.isFunction(callback)) {
              callback();
            }
          },
          lang: _(language.value).chain()
            .words()
            .head()
            .value(),
        }))
        .value(),
    };
  }

  getCurrentLocale() {
    this.$translate.use().replace('_', '-').toLowerCase();
  }

  getUserMenu(currentUser) {
    return {
      name: 'user',
      title: currentUser.firstName,
      iconClass: 'icon-user',
      nichandle: currentUser.nichandle,
      fullName: `${currentUser.firstName} ${currentUser.lastName}`,
      subLinks: [
        // My Account
        {
          name: 'user.account',
          title: this.$translate.instant('global_account'),
          url: '#/useraccount/infos',
          subLinks: [{
            title: this.$translate.instant('global_account_infos'),
            url: '#/useraccount/infos',
          }, {
            title: this.$translate.instant('global_account_security'),
            url: '#/useraccount/security',
          },
          (this.constants.target === 'EU' || this.constants.target === 'CA') && {
            title: this.$translate.instant('global_account_emails'),
            url: '#/useraccount/emails',
          },
          (this.constants.target === 'EU') && {
            title: this.$translate.instant('global_account_subscriptions'),
            url: '#/useraccount/subscriptions',
          }, {
            title: this.$translate.instant('global_account_ssh'),
            url: '#/useraccount/ssh',
          }, {
            title: this.$translate.instant('global_account_advanced'),
            url: '#/useraccount/advanced',
          }],
        },

        // Billing
        !currentUser.isEnterprise && {
          name: 'user.billing',
          title: this.$translate.instant('global_billing'),
          url: '#/billing/history',
          subLinks: [{
            title: this.$translate.instant('global_billing_history'),
            url: '#/billing/history',
          }, {
            title: this.$translate.instant('global_billing_payments'),
            url: '#/billing/payments',
          }],
        },

        // Services
        (this.constants.target === 'EU' || this.constants.target === 'CA') && (!currentUser.isEnterprise ? {
          name: 'user.services',
          title: this.$translate.instant('global_renew'),
          url: '#/billing/autoRenew',
          subLinks: [{
            title: this.$translate.instant('global_renew_management'),
            url: '#/billing/autoRenew',
          }, {
            title: this.$translate.instant('global_renew_agreements'),
            url: '#/useraccount/agreements',
          }],
        } : {
          title: this.$translate.instant('global_renew_agreements'),
          url: '#/useraccount/agreements',
        }),

        // Payment
        !currentUser.isEnterprise && {
          name: 'user.payment',
          title: this.$translate.instant('global_means'),
          url: '#/billing/mean',
          subLinks: [{
            title: this.$translate.instant('global_means_mean'),
            url: '#/billing/mean',
          },
          (this.constants.target === 'EU' || this.constants.target === 'CA') && {
            title: this.$translate.instant('global_means_ovhaccount'),
            url: '#/billing/ovhaccount',
          },
          (this.constants.target === 'EU' || this.constants.target === 'CA') && {
            title: this.$translate.instant('global_means_vouchers'),
            url: '#/billing/vouchers',
          }, {
            title: this.$translate.instant('global_means_refunds'),
            url: '#/billing/refunds',
          },
          (this.constants.target === 'EU') && {
            title: this.$translate.instant('global_means_fidelity'),
            url: '#/billing/fidelity',
          }, {
            title: this.$translate.instant('global_means_credits'),
            url: '#/billing/credits',
          }],
        },

        // Orders
        (!currentUser.isEnterprise && this.constants.target === 'EU' && currentUser.ovhSubsidiary === 'FR') && {
          title: this.$translate.instant('global_orders'),
          url: '#/billing/orders',
        },

        // Contacts
        (this.constants.target === 'EU') && {
          title: this.$translate.instant('global_contacts'),
          url: '#/useraccount/contacts?tab=SERVICES',
        },

        // Tickets
        {
          title: this.$translate.instant('global_list_ticket'),
          url: '#/ticket',
        },

        // Logout
        {
          title: this.$translate.instant('global_logout'),
          class: 'logout',
          click: (callback) => {
            this.ssoAuthentication.logout();

            if (_.isFunction(callback)) {
              callback();
            }
          },
        },
      ],
    };
  }

  loadTranslations() {
    // Add all $translatePartialLoader for Navbar here
    // Not used for the moment
    return this.$translate.refresh();
  }

  // Get managers links for main-links attribute
  getManagerLinks(products) {
    const currentUniverse = this.constants.UNIVERS;
    const managerUrls = this.constants.MANAGER_URLS;
    const managerNames = Object.keys(managerUrls);

    return _.map(managerNames, (managerName) => {
      const managerLink = {
        name: managerName,
        class: managerName,
        title: this.$translate.instant(`universe_univers-${managerName}_name`),
        url: managerUrls[managerName],
        isPrimary: ['partners', 'labs'].indexOf(managerName) === -1,
      };

      if (products && managerName === currentUniverse) {
        managerLink.subLinks = this.getUniverseMenu(products);
      }

      return managerLink;
    });
  }

  // Get products and build responsive menu
  getResponsiveLinks() {
    return this.products.getProductsByType()
      .then(products => this.getManagerLinks(products))
      .catch(() => this.getManagerLinks());
  }

  // Get navbar navigation and user infos
  getNavbar() {
    const managerUrls = this.constants.MANAGER_URLS;

    // Get base structure for the navbar
    const getBaseNavbar = (user, notificationsMenu) => {
      const baseNavbar = {
        // Set OVH Logo
        brand: {
          label: this.$translate.instant('universe_univers-web_name'),
          url: managerUrls.web,
          iconAlt: 'OVH',
          iconClass: 'navbar-logo',
          iconSrc: 'assets/images/navbar/icon-logo-ovh.svg',
        },

        // Set Manager Links
        managerLinks: this.getManagerLinks(),
      };

      // Set Internal Links
      if (user) {
        baseNavbar.internalLinks = [
          this.getLanguageMenu(), // Language
          this.getAssistanceMenu(user), // Assistance
          this.getUserMenu(user), // User
        ];
      }

      if (notificationsMenu.show) {
        baseNavbar.internalLinks.splice(1, 0, notificationsMenu);
      }

      return baseNavbar;
    };

    return this.$q
      .all({
        translate: this.loadTranslations(),
        user: this.user.getUser(),
        notifications: this.navbarNotificationService.getNavbarContent(),
      })
      .then(({ user, notifications }) => getBaseNavbar(user, notifications))
      .catch(() => getBaseNavbar());
  }
}

angular.module('services')
  .service('SessionService', SessionService);
