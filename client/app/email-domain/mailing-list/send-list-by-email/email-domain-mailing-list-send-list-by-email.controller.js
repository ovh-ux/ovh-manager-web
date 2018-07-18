angular.module('App').controller(
  'MailingListsSendListByEmailCtrl',
  class MailingListsSendListByEmailCtrl {
    constructor($scope, $stateParams, Alerter, MailingLists) {
      this.$scope = $scope;
      this.$stateParams = $stateParams;
      this.Alerter = Alerter;
      this.MailingLists = MailingLists;
    }

    $onInit() {
      this.email = '';
      this.mailingList = this.$scope.currentActionData;
      this.loading = false;
      this.$scope.sendListByEmail = () => this.sendListByEmail();
    }

    emailCheck(input) {
      input.$setValidity(
        'email',
        this.MailingLists.constructor.isMailValid(input.$viewValue),
      );
    }

    sendListByEmail() {
      this.loading = true;
      return this.MailingLists.sendListByEmail(this.$stateParams.productId, {
        name: this.mailingList.name,
        email: this.email,
      })
        .then((task) => {
          this.Alerter.success(
            this.$scope.tr(
              'mailing_list_tab_modal_sendListByEmail_success',
              this.email,
            ),
            this.$scope.alerts.main,
          );

          // no return here
          this.MailingLists.pollState(this.$stateParams.productId, {
            id: task.id,
            successStates: ['noState'],
            namespace: 'mailingLists.subscribers.sendListByEmail.poll',
          });
        })
        .catch(err => this.Alerter.alertFromSWS(
          this.$scope.tr('mailing_list_tab_modal_sendListByEmail_error'),
          _.get(err, 'data', err),
          this.$scope.alerts.main,
        ))
        .finally(() => {
          this.loading = false;
          this.$scope.resetAction();
        });
    }
  },
);
