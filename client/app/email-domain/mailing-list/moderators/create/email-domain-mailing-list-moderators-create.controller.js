angular.module("App").controller(
    "MailingListsCreateModeratorCtrl",
    class MailingListsCreateModeratorCtrl {
        /**
         * Constructor
         * @param $scope
         * @param $stateParams
         * @param Alerter
         * @param MailingLists
         */
        constructor ($scope, $stateParams, Alerter, MailingLists) {
            this.$scope = $scope;
            this.$stateParams = $stateParams;
            this.Alerter = Alerter;
            this.MailingLists = MailingLists;
        }

        $onInit () {
            this.errors = [];
            this.mailingList = angular.copy(this.$scope.currentActionData.mailingList);
            this.moderators = angular.copy(this.$scope.currentActionData.moderators);
            this.loading = false;
            this.selection = [];

            this.$scope.createModerator = () => this.createModerator();
        }

        static addressValidator (addr) {
            return validator.isEmail(addr) && /^[\w@\.\-_]+$/.test(addr);
        }

        createModerator () {
            this.loading = true;
            const moderatorsToAdd = _.uniq(this.selection);

            return this.MailingLists
                .addModerators(this.$stateParams.productId, {
                    mailingList: this.mailingList.name,
                    users: moderatorsToAdd,
                    type: "moderator"
                })
                .then((tasks) => {
                    this.Alerter.alertFromSWSBatchResult(
                        {
                            OK: this.$scope.tr(moderatorsToAdd.length === 1 ? "mailing_list_tab_modal_create_moderator_success" : "mailing_list_tab_modal_create_moderators_success"),
                            PARTIAL: this.$scope.tr("mailing_list_tab_modal_create_moderators_error"),
                            ERROR: this.$scope.tr("mailing_list_tab_modal_create_moderators_error")
                        },
                        tasks,
                        this.$scope.alerts.main
                    );

                    this.MailingLists.pollState(this.$stateParams.productId, {
                        id: tasks.task,
                        mailingList: this.mailingList,
                        successStates: ["noState"],
                        namespace: "mailingLists.moderators.poll"
                    });
                })
                .catch((err) => {
                    this.Alerter.alertFromSWS(
                        this.$scope.tr(moderatorsToAdd.length === 1 ? "mailing_list_tab_modal_create_moderator_error" : "mailing_list_tab_modal_create_moderators_error"),
                        err,
                        this.$scope.alerts.main
                    );
                })
                .finally(() => {
                    this.loading = false;
                    this.$scope.resetAction();
                });
        }
    }
);
