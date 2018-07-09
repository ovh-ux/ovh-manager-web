angular.module('App').controller(
  'DomainCtrl',
  class DomainCtrl {
    constructor(
      $scope,
      $rootScope,
      $q,
      $stateParams,
      $timeout,
      Alerter,
      AllDom,
      Domain,
      Hosting,
      User,
    ) {
      this.$scope = $scope;
      this.$rootScope = $rootScope;
      this.$q = $q;
      this.$stateParams = $stateParams;
      this.$timeout = $timeout;
      this.Alerter = Alerter;
      this.AllDom = AllDom;
      this.Domain = Domain;
      this.Hosting = Hosting;
      this.User = User;
    }

    $onInit() {
      this.canOrderHosting = false;
      this.domain = null;
      this.isAllDom = this.$rootScope.currentSectionInformation === 'all_dom';
      this.hasZoneDns = false;
      this.loading = {
        domainInfos: true,
      };
      this.stepPath = '';

      this.$scope.alerts = {
        page: 'domain_alert_page',
        tabs: 'domain_alert_tabs',
        main: 'domain_alert_main',
      };
      this.$scope.currentAction = null;
      this.$scope.currentActionData = null;

      this.$scope.resetAction = () => this.$scope.setAction(false);

      this.$scope.setAction = (action, data) => {
        this.$scope.currentAction = action;
        this.$scope.currentActionData = data;

        if (action) {
          this.stepPath = `domain/${this.$scope.currentAction}.html`;
          $('#currentAction').modal({
            keyboard: true,
            backdrop: 'static',
          });
        } else {
          $('#currentAction').modal('hide');
          this.$scope.currentActionData = null;
          this.$timeout(() => {
            this.stepPath = '';
          }, 300);
        }
      };

      this.$scope.$on('domain.dashboard.refresh', () =>
        this.reloadDomain(true));
      this.$scope.$on('$locationChangeStart', () => this.$scope.resetAction());
      this.$scope.$on('transfertLock.get.done', (e, infos) => {
        this.domain.protection = infos.transferLockStatus;
      });
      this.$scope.$on('$destroy', () => this.Domain.killDomainPolling());

      this.$q
        .all({
          user: this.User.getUser(),
          domain: this.Domain.getServiceInfo(this.$stateParams.productId),
          allDom: this.isAllDom
            ? this.AllDom.getServiceInfos(this.$stateParams.allDom)
            : null,
          alldomOrder: !this.isAllDom ? this.User.getUrlOf('alldomOrder') : null,
        })
        .then(({
          user, domain, allDom, alldomOrder,
        }) => {
          this.isAdmin =
            domain.contactAdmin === user.nichandle ||
            domain.contactTech === user.nichandle;
          this.domainInfos = domain;
          if (this.isAllDom) {
            this.allDom = this.$stateParams.allDom;
            this.allDomInfos = allDom;
          } else if (alldomOrder) {
            this.alldomURL =
              alldomOrder +
              new URI(`http://${domain.domain}`).tld('alldom').domain();
          }
        })
        .catch(() => {
          this.isAdmin = false;
        });

      this.loadDomain();
    }

    loadDomain() {
      return this.Domain.getSelected(this.$stateParams.productId, true)
        .then((domain) => {
          this.domain = domain;

          // translation key like: "domain_configuration_dnssec_" +
          // domain.dnssecStatus > DNSSEC is not activated.
          if (!domain.dnssecStatus) {
            this.domain.dnssecStatus = 'DISABLED';
          }

          if (/IN_PROGRESS/.test(domain.dnssecStatus)) {
            this.Domain.pollDnsSec(
              domain.name,
              domain.dnssecStatus === 'ENABLE_IN_PROGRESS',
            );
          }

          if (/locking|unlocking/.test(domain.protection)) {
            this.Domain.pollTransfertLock(
              domain.name,
              domain.protection === 'locking',
            );
          }

          if (domain.messages.length > 0) {
            const messages = domain.isExpired
              ? _.filter(
                domain.messages,
                message => !/service(\s\w+\s)?expired/i.test(message.message),
              )
              : domain.messages;

            if (messages.length > 0) {
              this.Alerter.alertFromSWS(
                this.$scope.tr('domain_dashboard_loading_error'),
                { state: 'ERROR', messages },
                this.$scope.alerts.page,
              );
            }
          }

          return this.$q.allSettled([
            this.Hosting.getHosting(domain.name, [404])
              .then((data) => {
                this.canOrderHosting = data === null;
              })
              .catch(() => {
                this.canOrderHosting = false;
              }),

            // load the dns zones in order to display or hide the dynhost tab
            // we set recordCount to 1 since we only want to know if it exists one or more dns zones
            this.Domain.getTabZoneDns(domain.name, 1)
              .then((tabZone) => {
                this.hasZoneDns = !!tabZone;
              })
              .catch(() => {
                this.hasZoneDns = false;
              }),

            // get the status of the zone to display a notification
            // icon on the zone tab if there are errors
            this.Domain.getZoneStatus(domain.name)
              .then((data) => {
                this.zoneStatus = data || { errors: [], warnings: [] };
              })
              .catch(() => {
                this.zoneStatus = { errors: [], warnings: [] };
              }),

            this.Hosting.getHostings().then((hostings) => {
              this.hostings = hostings;
            }),
          ]);
        })
        .catch(() =>
          this.Alerter.error(
            this.$scope.tr('domain_dashboard_loading_error'),
            this.$scope.alerts.page,
          ))
        .finally(() => {
          this.loading.domainInfos = false;
          this.$scope.$broadcast('domain.refreshData.done');
        });
    }

    reloadDomain(transparentReload) {
      if (!transparentReload) {
        this.loading.domainInfos = true;
        this.Alerter.resetMessage(this.$scope.alerts.page);
      }

      return this.loadDomain();
    }
  },
);
