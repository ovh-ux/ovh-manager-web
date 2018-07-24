angular.module('App').controller(
  'MailingListsTabModulesCtrl',
  class MailingListsTabModulesCtrl {
    /**
     * Constructor
     * @param $scope
     * @param $filter
     * @param $stateParams
     * @param Alerter
     * @param Emails
     * @param MailingLists
     */
    constructor($scope, $filter, $stateParams, Alerter, Emails, MailingLists) {
      this.$scope = $scope;
      this.$filter = $filter;
      this.$stateParams = $stateParams;
      this.Alerter = Alerter;
      this.Emails = Emails;
      this.MailingLists = MailingLists;
    }

    $onInit() {
      this.mailingListsDetails = [];
      this.loading = {
        mailingLists: false,
        pager: false,
        quotas: false,
      };
      this.search = {
        mailingLists: '',
      };

      this.$scope.$on('hosting.tabs.mailingLists.refresh', () => this.refreshTableMailingLists(true));
      this.$scope.$on('mailingLists.update.poll.done', () => this.refreshTableMailingLists(true));
      this.$scope.$on('$destroy', () => {
        this.Alerter.resetMessage(this.$scope.alerts.tabs);
        this.MailingLists.killAllPolling({
          namespace: 'mailingLists.update.poll',
        });
      });

      this.getQuotas().then(() => this.refreshTableMailingLists());
    }

    //---------------------------------------------
    // Search
    //---------------------------------------------

    emptySearch() {
      this.search.mailingLists = '';
      this.refreshTableMailingLists(true);
    }

    goSearch() {
      this.refreshTableMailingLists(true);
    }

    //---------------------------------------------
    // Mailing lists
    //---------------------------------------------

    getQuotas() {
      this.loading.quotas = true;
      return this.Emails.getQuotas(this.$stateParams.productId)
        .then((quotas) => {
          this.quotas = quotas;
        })
        .catch((err) => {
          _.set(err, 'type', err.type || 'ERROR');
          this.Alerter.alertFromSWS(
            this.$scope.tr('mailing_list_tab_modal_get_lists_error'),
            err,
            this.$scope.alerts.tabs,
          );
        })
        .finally(() => {
          this.loading.quotas = false;
        });
    }

    refreshTableMailingLists(forceRefresh) {
      this.loading.mailingLists = true;
      this.mailingLists = null;

      return this.MailingLists.getMailingLists(this.$stateParams.productId, {
        name: `%${this.search.mailingLists}%`,
        forceRefresh,
      })
        .then((data) => {
          this.mailingLists = this.$filter('orderBy')(data);
        })
        .catch((err) => {
          _.set(err, 'type', err.type || 'ERROR');
          this.Alerter.alertFromSWS(
            this.$scope.tr('mailing_list_tab_modal_get_lists_error'),
            err,
            this.$scope.alerts.main,
          );
        })
        .finally(() => {
          if (_.isEmpty(this.mailingLists)) {
            this.loading.mailingLists = false;
          }
        });
    }

    transformItem(item) {
      return this.MailingLists.getMailingList(
        this.$stateParams.productId,
        item,
      );
    }

    onTransformItemDone() {
      this.loading.mailingLists = false;
      this.loading.pager = false;
    }
  },
);
