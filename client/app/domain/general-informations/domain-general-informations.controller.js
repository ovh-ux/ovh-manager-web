angular.module('App').controller(
  'DomainTabGeneralInformationsCtrl',
  class DomainTabGeneralInformationsCtrl {
    constructor(
      $q,
      $rootScope,
      $scope,
      $stateParams,
      $translate,
      Alerter,
      constants,
      Domain,
      DomainsOwo,
      Hosting,
      HostingDomain,
      OvhApiScreenshot,
      User,
      WucAllDom,
      DOMAIN,
    ) {
      this.$scope = $scope;
      this.$rootScope = $rootScope;
      this.$q = $q;
      this.$stateParams = $stateParams;
      this.$translate = $translate;
      this.Alerter = Alerter;
      this.WucAllDom = WucAllDom;
      this.Domain = Domain;
      this.DomainsOwo = DomainsOwo;
      this.Hosting = Hosting;
      this.HostingDomain = HostingDomain;
      this.OvhApiScreenshot = OvhApiScreenshot.Aapi();
      this.User = User;
      this.constants = constants;
      this.DOMAIN = DOMAIN;
    }

    $onInit() {
      this.domain = this.$scope.ctrlDomain.domain;
      this.domainInfos = this.$scope.ctrlDomain.domainInfos;
      this.allDom = this.$scope.ctrlDomain.allDom;
      this.allDomInfos = this.$scope.ctrlDomain.allDomInfos;
      this.displayAllOwoSwitch = false;
      this.displayFreeHosting = false;
      this.domainUnlockRegistry = this.constants.DOMAIN.domainUnlockRegistry[
        _.last(this.domain.displayName.split('.')).toUpperCase()
      ];
      this.hasHostingAssociate = false;
      this.hasStart10mOffer = false;
      this.isAllDom = this.$rootScope.currentSectionInformation === 'all_dom';
      this.isUK = _.last(this.domain.name.split('.')).toUpperCase() === 'UK';
      this.lastOwoSupportedValue = false;
      this.loading = {
        allDom: false,
        associatedHosting: false,
        dnsStatus: false,
        hosting: false,
        screenshot: false,
        domainInfos: this.$scope.ctrlDomain.loading.domainInfos,
        changeOwner: false,
      };
      this.initActions();
      this.dnsStatus = {
        isOk: null,
        isHosted: null,
        refreshAlert: false,
      };
      this.owoFields = ['address', 'email', 'phone'];
      this.vm = {
        protection: { uiSwitch: {} },
        dnssec: { uiSwitch: {} },
        owo: {
          general: { uiSwitch: {} },
          address: { uiSwitch: {} },
          email: { uiSwitch: {} },
          phone: { uiSwitch: {} },
        },
        hosting: {
          web: {
            sites: [],
            selected: {
              info: {},
            },
          },
        },
      };

      _.forEach(
        [
          'transfertLock.get.done',
          'dnssec.get.done',
          'domain.refreshData.done',
          'domain.protection.lock.error',
          'domain.protection.unlock.error',
          'domain.dnssec.lock.unlock.error',
        ],
        (event) => {
          this.$scope.$on(event, () => {
            this.domain = this.$scope.ctrlDomain.domain;
            this.setSwitchStates();
          });
        },
      );
      this.$scope.$on('domain.protection.lock.cancel', () => {
        this.vm.protection.uiSwitch.checked = false;
      });
      this.$scope.$on('domain.protection.unlock.cancel', () => {
        this.vm.protection.uiSwitch.checked = true;
      });
      this.$scope.$on('domain.dnssec.lock.unlock.cancel', () => {
        this.vm.dnssec.uiSwitch.checked = !this.vm.dnssec.uiSwitch.checked;
      });

      if (!this.domain.isExpired) {
        this.getScreenshoot(this.domain.name);
      }
      this.User.getUrlOf('start10mMarket').then((start10mMarket) => {
        this.start10MarketUrl = start10mMarket;
      });

      this.setSwitchStates();
      this.getAllNameServer(this.domain.name);
      this.getHostingInfos(this.domain.name);
      this.getAssociatedHosting(this.domain.name);
      this.updateOwnerUrl = this.getUpdateOwnerUrl(this.domain);

      if (this.isAllDom) {
        this.getAllDomInfos(this.$stateParams.allDom);
      }
    }

    initActions() {
      this.actions = {
        manageContact: {
          text: this.$translate.instant('common_manage_contacts'),
          href: `#/useraccount/contacts?tab=SERVICES&serviceName=${
            this.domain.name
          }&category=DOMAIN`,
          isAvailable: () => true,
        },
        changeOwner: {
          text: this.$translate.instant('core_change_owner'),
          href: '',
          isAvailable: () => true,
        },
        manageAutorenew: {
          text: this.$translate.instant('common_manage'),
          href: `#/billing/autoRenew?searchText=${
            this.domain.name
          }&selectedType=DOMAIN`,
          isAvailable: () => true,
        },
        manageAlldom: {
          text: this.$translate.instant('common_manage'),
          href: `#/billing/autoRenew?searchText=${
            this.allDom
          }&selectedType=ALL_DOM`,
          isAvailable: () => true,
        },
      };
      this.loading.changeOwner = true;
      if (_.isObject(this.domain.whoisOwner)) {
        return this.$q
          .all({
            domainOrderTradeUrl: this.User.getUrlOf('domainOrderTrade'),
            orderServiceOption: this.Domain.getOrderServiceOption(this.domain.name),
          })
          .then(({ domainOrderTradeUrl, orderServiceOption }) => {
            if (_.find(orderServiceOption, opt => opt.family === 'trade')) {
              this.actions.changeOwner.href = domainOrderTradeUrl.replace(
                '{domain}',
                this.domain.name,
              );
            }
          }).catch(() => {
            this.Alerter.error(
              this.$translate.instant('domain_configuration_fetch_fail'),
              this.$scope.alerts.main,
            );
          }).finally(() => { this.loading.changeOwner = false; });
      }

      const changeOwnerClassic = !_.includes(
        this.Domain.extensionsChangeOwnerByOrder,
        _.last(this.domain.name.split('.')),
      );

      return this.User.getUrlOf(changeOwnerClassic ? 'changeOwner' : 'domainOrderChange')
        .then((changeOwnerUrl) => {
          if (changeOwnerClassic) {
            this.actions.changeOwner.href = changeOwnerUrl;
          } else {
            this.actions.changeOwner.href = `${changeOwnerUrl}?domain=${
              this.domain.name
            }`;
          }
        }).catch(() => {
          this.Alerter.error(
            this.$translate.instant('domain_configuration_fetch_fail'),
            this.$scope.alerts.main,
          );
        }).finally(() => { this.loading.changeOwner = false; });
    }

    getAllDomInfos(serviceName) {
      this.loading.allDom = true;
      this.WucAllDom.getAllDom(serviceName)
        .then((allDom) => {
          this.allDom = allDom;
          this.$q
            .all({
              allDomDomains: this.WucAllDom.getDomains(serviceName),
              domains: this.Domain.getDomains(),
            })
            .then(({ allDomDomains, domains }) => {
              this.allDomDomains = _.map(allDomDomains, domain => ({
                name: domain,
                isIncluded: domains.indexOf(domain) !== -1,
              }));
            })
            .catch(err => this.Alerter.alertFromSWS(
              this.$translate.instant('domain_tab_GLUE_table_error'),
              err,
              this.$scope.alerts.page,
            ))
            .finally(() => {
              this.loading.allDom = false;
            });
        })
        .catch((err) => {
          this.loading.allDom = false;
          this.Alerter.alertFromSWS(
            this.$translate.instant('domain_tab_GLUE_table_error'),
            err,
            this.$scope.alerts.page,
          );
        });
    }

    getHostingInfos(serviceName) {
      this.loading.hosting = true;
      return this.$q
        .all({
          sites: this.Hosting.getHostings(),
          hostingInfo: this.Hosting.getSelected(serviceName),
        })
        .then(({ sites, hostingInfo }) => {
          this.vm.hosting.web.sites = sites;
          this.vm.hosting.web.selected.info = hostingInfo;
          this.hasStart10mOffer = hostingInfo.offer
            === this.constants.HOSTING.OFFERS.START_10_M.TYPE_VALUE;
          this.displayFreeHosting = _.isEmpty(sites) || this.hasStart10mOffer;
        })
        .finally(() => {
          this.loading.hosting = false;
        });
    }

    getAllNameServer(serviceName) {
      this.loading.dnsStatus = true;
      return this.Domain.getAllNameServer(serviceName)
        .then((nameServers) => {
          this.nameServers = nameServers;
          return this.$q.all(_.map(
            nameServers,
            nameServer => this.Domain.getNameServerStatus(serviceName, nameServer.id),
          ));
        })
        .then((nameServersStatus) => {
          if (!_.isEmpty(nameServersStatus)) {
            this.dnsStatus.isOk = !_.some(nameServersStatus, { state: 'ko' });
            this.dnsStatus.isHosted = !_.some(nameServersStatus, {
              type: 'external',
            });

            const lastUpdated = _.max(
              nameServersStatus,
              nameServer => new Date(nameServer.usedSince).getTime(),
            );
            this.dnsStatus.refreshAlert = moment().diff(lastUpdated.usedSince, 'days') <= 2;
          }
        })
        .finally(() => {
          this.loading.dnsStatus = false;
        });
    }

    getAssociatedHosting(serviceName) {
      this.loading.associatedHosting = true;
      this.hostingAssociated = [];
      return this.HostingDomain.getAttachedDomains(serviceName, {
        returnErrorKey: '',
      })
        .then((response) => {
          if (_.isArray(response) && !_.isEmpty(response)) {
            this.hasHostingAssociate = true;

            // I would say I should get the first item only,
            // but the api returns an array, so I assume there can be multiple attached domains.
            this.hostingAssociated = _.map(response, item => ({
              name: item,
              url: `#/configuration/hosting/${item}`,
            }));
          }
        })
        .catch((err) => {
          if (err.status !== 404) {
            this.Alerter.alertFromSWS(
              this.$translate.instant('domain_configuration_web_hosting_fail'),
              _.get(err, 'data'),
              this.$scope.alerts.page,
            );
          }
        })
        .finally(() => {
          this.loading.associatedHosting = false;
        });
    }

    getScreenshoot(serviceName) {
      this.loading.screenshot = true;
      return this.OvhApiScreenshot.get({ url: serviceName })
        .$promise
        .then((screenshot) => {
          this.screenshot = screenshot;
        })
        .finally(() => {
          this.loading.screenshot = false;
        });
    }

    isOwoSupported() {
      if (!angular.isUndefined(this.domain.owoSupported)) {
        // avoid flashing information
        this.lastOwoSupportedValue = this.domain.owoSupported;
      }
      return this.lastOwoSupportedValue;
    }

    owoStateHaveChange(field) {
      const activated = [];
      const desactivated = [];

      if (field === 'all') {
        _.forEach(this.owoFields, (fieldName) => {
          if (
            this.vm.owo[fieldName].uiSwitch.checked
            !== this.vm.owo.general.uiSwitch.checked
          ) {
            this.vm.owo[
              fieldName
            ].uiSwitch.checked = this.vm.owo.general.uiSwitch.checked;
            if (this.vm.owo[fieldName].uiSwitch.checked) {
              activated.push(fieldName.toUpperCase());
            } else {
              desactivated.push(fieldName.toUpperCase());
            }
          }
        });
      } else {
        if (this.vm.owo[field].uiSwitch.checked) {
          activated.push(field.toUpperCase());
        } else {
          desactivated.push(field.toUpperCase());
        }

        if (
          this.vm.owo.address.uiSwitch.checked
            === this.vm.owo.email.uiSwitch.checked
          && this.vm.owo.address.uiSwitch.checked
            === this.vm.owo.phone.uiSwitch.checked
        ) {
          this.vm.owo.general.uiSwitch.checked = this.vm.owo.address.uiSwitch.checked;
        } else {
          this.vm.owo.general.uiSwitch.partial = true;
        }
      }

      this.DomainsOwo.updateOwoFields(activated, desactivated, [
        this.domain.name,
      ])
        .then((data) => {
          if (data.state !== 'OK') {
            let message = '';
            let hasHttpErr409 = false;
            _.forEach(data.messages, (msg) => {
              if (msg.type === 'ERROR') {
                message += `${msg.message}`;
              }
              if (!hasHttpErr409) {
                hasHttpErr409 = msg.code === 409;
              }
            });
            if (hasHttpErr409) {
              this.Alerter.error(
                this.$translate.instant('domain_configuration_whois_contracts'),
                this.$scope.alerts.main,
              );
            } else {
              this.Alerter.alertFromSWS(
                this.$translate.instant('domain_configuration_whois_fail'),
                { message },
                this.$scope.alerts.main,
              );
            }
          }
        })
        .catch((err) => {
          this.vm.owo[field].uiSwitch.checked = !this.vm.owo[field].uiSwitch
            .checked;
          if (err.data.code === 409) {
            this.Alerter.error(
              this.$translate.instant('domain_configuration_whois_contracts'),
              this.$scope.alerts.main,
            );
          } else {
            this.Alerter.alertFromSWS(
              this.$translate.instant('domain_configuration_whois_fail'),
              err,
              this.$scope.alerts.main,
            );
          }
        })
        .finally(() => this.$scope.ctrlDomain.reloadDomain(true));
    }

    setSwitchStates() {
      this.vm.protection.uiSwitch.checked = this.domain.protection === 'locked'
        || this.domain.protection === 'locking';
      this.vm.protection.uiSwitch.pending = /ing$/i.test(this.domain.protection);
      this.vm.protection.uiSwitch.disabled = /ing$/i.test(this.domain.protection)
        || this.domain.protection === 'unavailable';

      this.vm.dnssec.uiSwitch.checked = /enable/i.test(this.domain.dnssecStatus);
      this.vm.dnssec.uiSwitch.pending = /progress/i.test(this.domain.dnssecStatus);
      this.vm.dnssec.uiSwitch.disabled = this.vm.dnssec.uiSwitch.pending;

      if (this.domain.whoisFields.length === this.owoFields.length) {
        this.vm.owo.general.uiSwitch.checked = true;
      } else {
        this.vm.owo.general.uiSwitch.checked = false;
        this.vm.owo.general.uiSwitch.partial = !_.isEmpty(this.domain.whoisFields);
      }

      if (!this.domain.whoisActivable) {
        this.vm.owo.general.uiSwitch.disabled = true;
      }

      _.forEach(this.owoFields, (fieldName) => {
        this.vm.owo[fieldName].uiSwitch.checked = _.includes(
          this.domain.whoisFields,
          fieldName.toUpperCase(),
        );
        if (!this.domain.whoisActivable) {
          this.vm.owo[fieldName].uiSwitch.disabled = true;
        }
      });
    }

    getUpdateOwnerUrl(domain) {
      const ownerUrlInfo = { target: '', error: '' };
      if (_.has(domain, 'name') && _.has(domain, 'whoisOwner.id')) {
        ownerUrlInfo.target = `#/useraccount/contact/${domain.name}/${domain.whoisOwner.id}`;
      } else if (!_.has(domain, 'name')) {
        ownerUrlInfo.error = this.$translate.instant('domain_tab_REDIRECTION_add_step4_server_cname_error');
      } else {
        switch (domain.whoisOwner) {
          case this.DOMAIN.whoIsStatus.PENDING:
            ownerUrlInfo.error = this.$translate.instant('domain_dashboard_whois_pending');
            break;
          case this.DOMAIN.whoIsStatus.INVALID_CONTACT:
            ownerUrlInfo.error = this.$translate.instant('domain_dashboard_whois_invalid_contact');
            break;
          default:
            ownerUrlInfo.error = this.$translate.instant('domain_dashboard_whois_error');
        }
      }

      if (ownerUrlInfo.error) {
        this.Alerter.error(ownerUrlInfo.error, this.$scope.alerts.page);
      }

      return ownerUrlInfo;
    }

    // Actions --------------------------------------------
    goToDnsManagement() {
      this.$scope.setAction('dns/management/domain-dns-management', {
        domain: this.domain,
        nameServers: this.nameServers,
        dnsStatus: this.dnsStatus,
      });
    }

    showWebHostingOrderWithStartOffer() {
      const domain = angular.copy(this.domain);
      _.set(
        domain,
        'selected.offer',
        this.constants.HOSTING.OFFERS.START_10_M.LIST_VALUE,
      );
      this.$scope.setAction(
        'webhosting-enable/domain-enable-web-hosting',
        domain,
      );
    }

    switchTheStateOfProtection() {
      if (this.vm.protection.uiSwitch.checked) {
        this.$scope.setAction('lock/enable/domain-lock-enable', this.domain);
      } else {
        this.$scope.setAction('lock/disable/domain-lock-disable', this.domain);
      }
    }

    // Utilities ------------------------------------------

    static parseType(type) {
      return type.replace(/\+/g, '-');
    }
  },
);
