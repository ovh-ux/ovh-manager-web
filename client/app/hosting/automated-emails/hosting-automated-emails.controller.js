angular.module('App').controller(
  'HostingTabAutomatedEmailsCtrl',
  class HostingTabAutomatedEmailsCtrl {
    constructor(
      $scope,
      $stateParams,
      $timeout,
      HostingAutomatedEmails,
      Alerter,
      $filter,
      User,
      ChartjsFactory,
      HOSTING_AUTOMATED_EMAILS,
      translator,
    ) {
      this.$scope = $scope;
      this.$stateParams = $stateParams;
      this.$timeout = $timeout;
      this.HostingAutomatedEmails = HostingAutomatedEmails;
      this.Alerter = Alerter;
      this.$filter = $filter;
      this.User = User;
      this.ChartjsFactory = ChartjsFactory;
      this.HOSTING_AUTOMATED_EMAILS = HOSTING_AUTOMATED_EMAILS;
      this.translator = translator;
    }

    $onInit() {
      this.automatedEmails = null;
      this.bounces = [];
      this.currentView = 'INFORMATIONS_VIEW';

      this.loaders = {
        loading: false,
        volumes: false,
        bounces: false,
      };

      this.limits = {
        bounces: 20,
      };

      this.stats = {};

      this.thereAreEmailsInError = true;
      this.isPurging = false;
      this.hasBeenPurge = false;
      this.poll = null;

      this.$scope.$on('hosting.automatedEmails.request.changed', () => {
        this.retrievingAutomatedEmails();
      });

      this.User.getUrlOf('guides').then((guides) => {
        this.guide = _.get(guides, 'hostingScriptEmail', null);
      });

      this.retrievingAutomatedEmails();
    }

    retrievingAutomatedEmails() {
      this.loaders.loading = true;
      this.Alerter.resetMessage(this.$scope.alerts.main);

      return this.HostingAutomatedEmails.getAutomatedEmails(this.$stateParams.productId)
        .then((data) => {
          if (
            !_.isEmpty(this.automatedEmails)
            && this.automatedEmails.state !== data.state
            && data.state === 'purging'
          ) {
            this.polling();
          }

          this.automatedEmails = data;
          this.retrievingVolumes();
          this.retrievingBounces();
        })
        .catch((err) => {
          _.set(err, 'type', err.type || 'ERROR');
          this.Alerter.alertFromSWS(
            this.translator.tr('hosting_tab_AUTOMATED_EMAILS_error'),
            err,
            this.$scope.alerts.main,
          );
        })
        .finally(() => {
          this.loaders.loading = false;
        });
    }

    retrievingVolumes() {
      this.loaders.volumes = true;

      return this.HostingAutomatedEmails.retrievingVolumes(this.$stateParams.productId)
        .then((data) => {
          this.stats.chart = new this.ChartjsFactory(angular.copy(this
            .HOSTING_AUTOMATED_EMAILS.chart));
          this.stats.chart.setAxisOptions('yAxes', {
            type: 'linear',
          });

          this.stats.chart.addSerie(
            this.translator.tr('hosting_tab_AUTOMATED_EMAILS_emails_sent'),
            data.data.reverse().map(d => ({
              x: moment.utc(new Date(d.date)).valueOf(),
              y: d.volume,
            })),
            {
              dataset: {
                fill: true,
                borderWidth: 1,
              },
            },
          );
        })
        .catch((err) => {
          if (err.status !== 404) {
            this.Alerter.alertFromSWS(
              this.translator.tr('hosting_tab_AUTOMATED_EMAILS_error'),
              _.get(err, 'data', err),
              this.$scope.alerts.main,
            );
          }
        })
        .finally(() => {
          this.loaders.volumes = false;
        });
    }

    retrievingBounces() {
      if (this.bounceLimitForm.$dirty && !this.bounceLimitForm.$valid) {
        return null;
      }

      this.loaders.bounces = true;

      return this.HostingAutomatedEmails.retrievingBounces(
        this.$stateParams.productId,
        this.limits.bounces,
      )
        .then((data) => {
          this.thereAreEmailsInError = !_.isEmpty(data.data);
          this.bounces = data.data;
        })
        .catch((err) => {
          if (err.status !== 404) {
            this.Alerter.alertFromSWS(
              this.translator.tr('hosting_tab_AUTOMATED_EMAILS_error'),
              _.get(err, 'data', err),
              this.$scope.alerts.main,
            );
          } else {
            this.thereAreEmailsInError = false;
          }
        })
        .finally(() => {
          this.loaders.bounces = false;
        });
    }

    changeViewToBounces() {
      this.retrievingBounces();
      this.currentView = 'BOUNCES_VIEW';
    }

    purge() {
      if (
        this.automatedEmails.state !== 'ko'
        && this.automatedEmails.state !== 'spam'
        && this.automatedEmails.state !== 'bounce'
      ) {
        return;
      }

      this.$scope.setAction(
        'automated-emails/request/hosting-automated-emails-request',
        {
          automatedEmails: this.automatedEmails,
          action: 'PURGE',
        },
      );
    }

    polling() {
      return this.HostingAutomatedEmails
        .getAutomatedEmails(this.$stateParams.productId)
        .then((data) => {
          if (data.state === 'purging') {
            this.isPurging = true;
            this.poll = this.$timeout(this.polling, 3000);
          } else {
            this.isPurging = false;
            this.hasBeenPurge = true;
            this.$timeout.cancel(this.poll);
            this.retrievingAutomatedEmails();
          }
        });
    }
  },
);
