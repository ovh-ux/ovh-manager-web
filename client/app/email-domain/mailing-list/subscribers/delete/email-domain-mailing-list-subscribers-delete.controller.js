angular.module("App").controller(
    "MailingListsDeleteSubscribersCtrl",
    class MailingListsDeleteSubscribersCtrl {
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
            this.subscribers = angular.copy(this.$scope.currentActionData.subscribers);
            this.loading = false;
            this.selection = [];

            this.$scope.deleteSubscribers = () => this.deleteSubscribers();
        }

        static addressValidator (addr) {
            return validator.isEmail(addr) && /^[\w@\.\-_]+$/.test(addr);
        }

        deleteSubscribers () {
            this.loading = true;
            const subscribersToDelete = _.uniq(this.selection);

            return this.MailingLists
                .deleteSubscribers(this.$stateParams.productId, {
                    mailingList: this.mailingList.name,
                    users: subscribersToDelete,
                    type: "subscriber"
                })
                .then((tasks) => {
                    this.Alerter.alertFromSWSBatchResult(
                        {
                            OK: this.$scope.tr(subscribersToDelete.length === 1 ? "mailing_list_tab_modal_subscriber_delete_success" : "mailing_list_tab_modal_subscribers_delete_success"),
                            PARTIAL: this.$scope.tr("mailing_list_tab_modal_subscribers_delete_error"),
                            ERROR: this.$scope.tr("mailing_list_tab_modal_subscribers_delete_error")
                        },
                        tasks,
                        this.$scope.alerts.main
                    );

                    this.MailingLists.pollState(this.$stateParams.productId, {
                        id: tasks.task,
                        successStates: ["noState"],
                        namespace: "mailingLists.subscribers.poll"
                    });
                })
                .catch((err) => {
                    this.Alerter.alertFromSWS(
                        this.$scope.tr(subscribersToDelete.length === 1 ? "mailing_list_tab_modal_subscriber_delete_error" : "mailing_list_tab_modal_subscribers_delete_error"),
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
