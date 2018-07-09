angular.module('App').controller(
  'MailingListsModeratorsCtrl',
  class MailingListsModeratorsCtrl {
    /**
     * Constructor
     * @param $scope
     * @param $filter
     * @param $stateParams
     * @param Alerter
     * @param MailingLists
     */
    constructor($scope, $filter, $stateParams, Alerter, MailingLists) {
      this.$scope = $scope;
      this.$filter = $filter;
      this.$stateParams = $stateParams;
      this.Alerter = Alerter;
      this.MailingLists = MailingLists;
    }

    $onInit() {
      this.mailingList = this.$scope.ctrlTabView.currentMailingList;
      this.moderators = {
        selected: [],
        updating: false,
      };
      this.loading = {
        moderators: false,
        pager: false,
      };
      this.search = { moderators: '' };

      this.$scope.$on('hosting.tabs.mailingLists.moderators.refresh', () =>
        this.refreshTableModerators());
      this.$scope.$on(
        'mailingLists.moderators.poll.start',
        (pollObject, task) => {
          if (task.account === this.mailingList.name) {
            const action = task.action.split(':')[0];
            if (_.indexOf(['addm', 'delm'], action) !== -1) {
              this.moderators.updating = true;
            }
          }
        },
      );
      this.$scope.$on(
        'mailingLists.moderators.poll.done',
        (pollObject, task) => {
          if (task.account === this.mailingList.name) {
            const action = task.action.split(':')[0];
            if (_.indexOf(['addm', 'delm'], action) !== -1) {
              this.runPolling().then((hasPolling) => {
                if (!hasPolling) {
                  this.moderators.updating = false;
                  this.Alerter.resetMessage(this.$scope.alerts.main);
                  this.refreshTableModerators(true);
                }
              });
            }
          }
        },
      );
      this.$scope.$on('$destroy', () => {
        this.MailingLists.killAllPolling({
          namespace: 'mailingLists.moderators.poll',
        });
      });

      this.refreshTableModerators();
      this.runPolling();
    }

    //---------------------------------------------
    // Search
    //---------------------------------------------

    emptySearch() {
      this.search.moderators = '';
      this.refreshTableModerators(true);
    }

    goSearch() {
      this.refreshTableModerators(true);
    }

    //---------------------------------------------
    // Selector
    //---------------------------------------------

    globalCheckboxStateChange(state) {
      if (this.moderators.details.length) {
        switch (state) {
          case 0:
            this.moderators.selected = [];
            break;
          case 1:
            this.moderators.selected = _.filter(
              _.map(this.moderators.details, 'email'),
              result => !_.some(this.moderators.selected, result.email),
            );
            break;
          case 2:
            this.moderators.selected = this.moderators.ids;
            break;
          default:
            this.moderators.selected = [];
        }
        this.applySelection(this.moderators.details);
      }
    }

    toggleModerator(email) {
      this.moderators.selected = _.xor(this.moderators.selected, [email]);
    }

    applySelection(moderators) {
      _.forEach(moderators, (moderator) => {
        moderator.selected = // eslint-disable-line no-param-reassign
          _.indexOf(this.moderators.selected, moderator.email) !== -1;
      });
    }

    //---------------------------------------------
    // Moderators
    //---------------------------------------------

    refreshTableModerators(forceRefresh) {
      this.loading.moderators = true;
      this.moderators.ids = null;
      this.moderators.selected = [];

      return this.MailingLists.getModerators(this.$stateParams.productId, {
        name: this.mailingList.name,
        email: this.search.moderators ? `%${this.search.moderators}%` : null,
        forceRefresh,
      })
        .then((data) => {
          this.moderators.ids = this.$filter('orderBy')(data);
        })
        .catch(err =>
          this.Alerter.alertFromSWS(
            this.$scope.tr('mailing_list_tab_modal_get_lists_error'),
            err,
            this.$scope.alerts.main,
          ))
        .finally(() => {
          if (_.isEmpty(this.moderators.ids)) {
            this.loading.moderators = false;
          }
        });
    }

    transformItemModerator(item) {
      return this.MailingLists.getModerator(
        this.$stateParams.productId,
        this.mailingList.name,
        item,
      );
    }

    onTransformItemModeratorDone(items) {
      this.applySelection(items);
      this.loading.moderators = false;
      this.loading.pager = false;
    }

    runPolling() {
      return this.MailingLists.getTaskIds(this.$stateParams.productId, {
        account: this.mailingList.name,
      })
        .then((tasks) => {
          if (tasks.length > 0) {
            this.MailingLists.pollState(this.$stateParams.productId, {
              id: _.max(tasks),
              mailingList: this.mailingList,
              successStates: ['noState'],
              namespace: 'mailingLists.moderators.poll',
            });
          }
          return tasks.length > 0;
        })
        .catch(() => false);
    }
  },
);
