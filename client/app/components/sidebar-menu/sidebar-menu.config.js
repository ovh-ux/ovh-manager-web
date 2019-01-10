angular.module('App').run((
  $q,
  $translate,
  SidebarMenu,
  WucProducts,
  User,
  atInternet,
  constants,
) => {
  const menuOptions = [];

  function buildMenuOptions() {
    return $q.all([
      User.getUrlOf('domainOrder'),
      User.getUrlOfEndsWithSubsidiary('hosting'),
      User.getUrlOfEndsWithSubsidiary('cloudweb'),
      User.getUrlOf('emailproOrder'),
      User.getUrlOf('office365Order')])
      .then(([domainOrderUrl, hostingUrl, cloudWebUrl, emailproOrderUrl, office365OrderUrl]) => {
        menuOptions.push({
          id: 'order-domain',
          title: $translate.instant('navigation_left_order_domain'),
          icon: 'ovh-font ovh-font-domain',
          href: domainOrderUrl,
          target: '_blank',
        });
        menuOptions.push({
          id: 'order-dnszone',
          title: $translate.instant('navigation_left_order_dnszone'),
          icon: 'ovh-font ovh-font-domain',
          state: 'app.dns-zone-new',
        });
        menuOptions.push({
          id: 'order-private-database',
          title: $translate.instant('navigation_left_order_private_database'),
          icon: 'ovh-font ovh-font-database',
          state: 'app.sql-order',
        });
        menuOptions.push({
          id: 'order-hosting',
          title: $translate.instant('navigation_left_hosting'),
          icon: 'ovh-font ovh-font-hosting',
          href: hostingUrl,
          target: '_blank',
        });
        menuOptions.push({
          id: 'order-cloudweb',
          title: $translate.instant('navigation_left_order_cloudweb'),
          icon: 'ovh-font ovh-font-hosting',
          href: cloudWebUrl,
          target: '_blank',
        });
        menuOptions.push({
          id: 'order-emailpro',
          title: $translate.instant('navigation_left_order_emailpro'),
          icon: 'ovh-font ovh-font-mail',
          href: emailproOrderUrl,
          target: '_blank',
        });
        menuOptions.push({
          id: 'order-mxplan',
          title: $translate.instant('navigation_left_order_mxplan'),
          icon: 'ovh-font ovh-font-mail',
          state: 'app.mx-plan',
        });
        menuOptions.push({
          id: 'order-exchange',
          title: $translate.instant('navigation_left_order_exchange'),
          icon: 'ms-Icon ms-Icon--ExchangeLogo',
          state: 'app.microsoft.exchange.order',
        });
        menuOptions.push({
          id: 'order-office365',
          title: $translate.instant('navigation_left_office365_order'),
          icon: 'ms-Icon ms-Icon--OfficeLogo',
          href: office365OrderUrl,
          target: '_blank',
        });
        menuOptions.push({
          id: 'order-office-reseller',
          title: $translate.instant('navigation_left_office_reseller_order'),
          icon: 'ms-Icon ms-Icon--OfficeLogo',
          href: `${constants.MANAGER_URLS.sunrise}csp2`,
        });
        menuOptions.push({
          id: 'order-sharepoint',
          title: $translate.instant('navigation_left_sharepoint_order'),
          icon: 'ms-Icon ms-Icon--SharepointLogo',
          state: 'app.microsoft.sharepoint.order',
        });
      });
  }

  function getDomainIcons(domain) {
    if (domain.type === 'ALL_DOM' || domain.type === 'DOMAIN') {
      return 'ovh-font ovh-font-domain';
    }
    return 'oui-icon oui-icon-domain-dns icon-white-background';
  }

  function addDomainItems(products) {
    const domainItem = SidebarMenu.addMenuItem({
      title: $translate.instant('navigation_left_domains'),
      category: 'domain',
      icon: 'ovh-font ovh-font-domain',
      allowSubItems: true,
      loadOnState: 'app.domain',
      allowSearch: true,
      infiniteScroll: true,
    });

    SidebarMenu.addMenuItems([{
      title: $translate.instant('navigation_left_all_domains'),
      category: 'domain',
      icon: 'ovh-font ovh-font-network',
      state: 'app.domain.all',
      isActive: true,
    }, {
      title: $translate.instant('navigation_left_all_domains_operations'),
      category: 'domain',
      icon: 'ovh-font ovh-font-config',
      state: 'app.domain.operation',
    }], domainItem);

    const allDoms = _.chain(products.domains).filter({ hasSubComponent: true }).sortBy('name').value();
    const domains = _.union(
      allDoms,
      _.chain(products.domains).without(allDoms).sortBy('name').value(),
    );

    _.forEach(domains, (domain) => {
      if (domain.hasSubComponent) {
        const allDomItem = SidebarMenu.addMenuItem({
          title: domain.displayName,
          category: 'domain',
          icon: getDomainIcons(domain),
          allowSubItems: true,
          loadOnState: 'app.domain.alldom',
          loadOnStateParams: {
            allDom: domain.displayName,
          },
        }, domainItem);

        _.forEach(_.sortBy(domain.subProducts, 'name'), (subDomain) => {
          SidebarMenu.addMenuItem({
            title: subDomain.displayName,
            category: 'domain',
            icon: getDomainIcons(subDomain),
            state: 'app.domain.alldom',
            stateParams: {
              allDom: domain.displayName,
              productId: subDomain.name,
            },
          }, allDomItem);
        });
      } else {
        SidebarMenu.addMenuItem({
          title: domain.displayName,
          category: 'domain',
          icon: getDomainIcons(domain),
          state: domain.type === 'ZONE' ? 'app.domain.dns-zone' : 'app.domain.product',
          stateParams: {
            productId: domain.name,
          },
        }, domainItem);
      }
    });
  }

  function addHostingItems(products) {
    const hostingItem = SidebarMenu.addMenuItem({
      title: $translate.instant('navigation_left_hosting'),
      category: 'hosting',
      icon: 'ovh-font ovh-font-hosting',
      allowSubItems: true,
      loadOnState: 'app.hosting',
      allowSearch: true,
      infiniteScroll: true,
    });

    const hostings = _(products.hostings)
      .filter(elt => elt.type === 'HOSTING')
      .sortBy(elt => angular.lowercase(elt.displayName || elt.name))
      .sortBy(elt => elt.type)
      .value();

    _.forEach(hostings, (elt) => {
      SidebarMenu.addMenuItem({
        title: elt.displayName || elt.name,
        category: 'hosting',
        icon: 'ovh-font ovh-font-server',
        state: 'app.hosting',
        stateParams: {
          productId: elt.name,
        },
      }, hostingItem);
    });
  }

  function addDatabaseItems(products) {
    const databaseItem = SidebarMenu.addMenuItem({
      title: $translate.instant('navigation_left_database'),
      category: 'database',
      icon: 'ovh-font ovh-font-database',
      allowSubItems: true,
      loadOnState: 'app.private-database',
      allowSearch: true,
      infiniteScroll: true,
    });

    const databases = _(products.hostings)
      .filter(elt => elt.type === 'PRIVATE_DATABASE')
      .sortBy(elt => angular.lowercase(elt.displayName || elt.name))
      .sortBy(elt => elt.type)
      .value();

    _.forEach(databases, (elt) => {
      SidebarMenu.addMenuItem({
        title: elt.displayName || elt.name,
        category: 'private_database',
        icon: 'ovh-font ovh-font-database',
        state: 'app.private-database',
        stateParams: {
          productId: elt.name,
        },
      }, databaseItem);
    });
  }

  function addEmailProItems(products) {
    const emailProItem = SidebarMenu.addMenuItem({
      title: $translate.instant('navigation_left_emailPro'),
      category: 'emailPro',
      icon: 'ovh-font ovh-font-mail',
      allowSubItems: true,
      loadOnState: 'app.email-pro',
      allowSearch: true,
      infiniteScroll: true,
    });

    const emailProsItems = _.sortBy(products.emailPros, elt => angular.lowercase(elt.name));

    _.forEach(emailProsItems, (elt) => {
      SidebarMenu.addMenuItem({
        title: elt.displayName || elt.name,
        category: 'emailPro',
        icon: 'ovh-font ovh-font-mail',
        state: 'app.email-pro',
        stateParams: {
          productId: elt.name,
        },
      }, emailProItem);
    });
  }

  function addEmailItems(products) {
    const emailMainMenuItem = SidebarMenu.addMenuItem({
      title: $translate.instant('navigation_left_email'),
      category: 'email',
      icon: 'ovh-font ovh-font-mail',
      allowSubItems: true,
      loadOnState: 'app.email',
      allowSearch: true,
      infiniteScroll: true,
    });

    const emailProMXPlanProducts = _.get(
      products,
      'emailsProMXPlan',
      [],
    );

    const emailProducts = _.sortBy(
      [
        ...products.emails,
        ...emailProMXPlanProducts,
      ],
      emailProduct => (emailProduct.displayName || emailProduct.name || '').toLowerCase(),
    );

    _.forEach(emailProducts, (emailProduct) => {
      let state;
      switch (emailProduct.type) {
        case 'EMAIL_DELEGATE':
          state = 'app.email.delegate';
          break;
        case 'EMAIL_PRO_MXPLAN':
          state = 'app.email.mxplan';
          break;
        default:
          state = 'app.email.domain';
      }

      SidebarMenu.addMenuItem(
        {
          title: emailProduct.displayName || emailProduct.name,
          category: 'email',
          icon: 'ovh-font ovh-font-mail',
          state,
          stateParams: {
            productId: emailProduct.name,
          },
        },
        emailMainMenuItem,
      );
    });
  }

  function addMicrosoftItems(products) {
    const microsoftItem = SidebarMenu.addMenuItem({
      title: $translate.instant('navigation_left_microsoft'),
      category: 'microsoft',
      icon: 'ms-Icon ms-Icon--WindowsLogo',
      allowSubItems: true,
      loadOnState: 'app.microsoft',
      allowSearch: true,
    });

    // Exchange
    const exchangesItem = SidebarMenu.addMenuItem({
      title: $translate.instant('navigation_left_exchange'),
      category: 'microsoft',
      icon: 'ms-Icon ms-Icon--ExchangeLogo',
      allowSubItems: true,
      loadOnState: 'app.microsoft.exchange',
    }, microsoftItem);

    const exchangeProductTypes = {
      EXCHANGE_PROVIDER: 'app.microsoft.exchange.provider',
      EXCHANGE_DEDICATED: 'app.microsoft.exchange.dedicated',
      EXCHANGE_DEDICATEDCLUSTER: 'app.microsoft.exchange.dedicatedCluster',
    };

    _.forEach(_.sortBy(
      products.exchanges,
      elt => angular.lowercase(elt.displayName || elt.name),
    ), (elt) => {
      SidebarMenu.addMenuItem({
        title: elt.displayName || elt.name,
        category: 'microsoft',
        icon: 'ms-Icon ms-Icon--ExchangeLogo',
        state: _(exchangeProductTypes[elt.type]).isString() ? exchangeProductTypes[elt.type] : 'app.microsoft.exchange.hosted',
        stateParams: {
          organization: elt.organization,
          productId: elt.name,
        },
      }, exchangesItem);
    });

    // Office
    const officesItem = SidebarMenu.addMenuItem({
      title: $translate.instant('navigation_left_office'),
      category: 'microsoft',
      icon: 'ms-Icon ms-Icon--OfficeLogo',
      allowSubItems: true,
      loadOnState: 'app.microsoft.office',
    }, microsoftItem);

    _.forEach(_.sortBy(
      products.licenseOffice,
      elt => angular.lowercase(elt.displayName || elt.name),
    ), (elt) => {
      SidebarMenu.addMenuItem({
        title: elt.displayName || elt.name,
        category: 'microsoft',
        icon: 'ms-Icon ms-Icon--OfficeLogo',
        state: 'app.microsoft.office.product',
        stateParams: {
          serviceName: elt.name,
        },
      }, officesItem);
    });

    // Sharepoint
    const sharepointItems = SidebarMenu.addMenuItem({
      title: $translate.instant('navigation_left_sharepoint'),
      category: 'microsoft',
      icon: 'ms-Icon ms-Icon--SharepointLogo',
      allowSubItems: true,
      loadOnState: 'app.microsoft.sharepoint',
    }, microsoftItem);

    _.forEach(_.sortBy(
      products.sharepoints,
      elt => angular.lowercase(elt.displayName || elt.name),
    ), (elt) => {
      SidebarMenu.addMenuItem({
        title: elt.displayName || elt.name,
        category: 'microsoft',
        icon: 'ms-Icon ms-Icon--SharepointLogo',
        state: 'app.microsoft.sharepoint.product',
        stateParams: {
          exchangeId: elt.exchangeId,
          productId: elt.name,
        },
      }, sharepointItems);
    });
  }

  const productsPromise = WucProducts.getProductsByType()
    .then(products => $q.all(
      addDomainItems(products),
      addHostingItems(products),
      addDatabaseItems(products),
      addEmailProItems(products),
      addEmailItems(products),
      addMicrosoftItems(products),
    ))
    .then(() => buildMenuOptions());

  SidebarMenu.loadDeferred.promise.then(() => {
    SidebarMenu.manageStateChange();
    SidebarMenu.addActionsMenuOptions(menuOptions);
    SidebarMenu.addActionsMenuItemClickHandler((id) => {
      atInternet.trackClick({
        name: id,
        type: 'action',
      });
    });
  });

  SidebarMenu.setInitializationPromise(productsPromise);
});
