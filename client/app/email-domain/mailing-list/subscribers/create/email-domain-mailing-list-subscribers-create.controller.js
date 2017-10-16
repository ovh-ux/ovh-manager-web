angular.module("App").controller(
    "MailingListsCreateSubscriberCtrl",
    class MailingListsCreateSubscriberCtrl {
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

            this.$scope.createSubscriber = () => this.createSubscriber();
        }

        static addressValidator (addr) {
            return validator.isEmail(addr) && /^[\w@\.\-_]+$/.test(addr);
        }

        createSubscriber () {
            this.loading = true;
            const subscribersToAdd = _.uniq(this.selection);

            return this.MailingLists
                .addSubscribers(this.$stateParams.productId, {
                    mailingList: this.mailingList.name,
                    users: subscribersToAdd,
                    type: "subscriber"
                })
                .then((tasks) => {
                    this.Alerter.alertFromSWSBatchResult(
                        {
                            OK: this.$scope.tr(subscribersToAdd.length === 1 ? "mailing_list_tab_modal_create_subscriber_success" : "mailing_list_tab_modal_create_subscribers_success"),
                            PARTIAL: this.$scope.tr("mailing_list_tab_modal_create_subscribers_error"),
                            ERROR: this.$scope.tr("mailing_list_tab_modal_create_subscribers_error")
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
                        this.$scope.tr(subscribersToAdd.length === 1 ? "mailing_list_tab_modal_create_subscriber_error" : "mailing_list_tab_modal_create_subscribers_error"),
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
