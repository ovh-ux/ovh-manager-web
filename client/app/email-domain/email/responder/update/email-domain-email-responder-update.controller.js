angular.module('App').controller(
  'EmailsUpdateResponderCtrl',
  class EmailsUpdateResponderCtrl {
    /**
     * Constructor
     * @param $scope
     * @param $stateParams
     * @param Alerter
     * @param Emails
     */
    constructor($scope, $stateParams, Alerter, Emails) {
      this.$scope = $scope;
      this.$stateParams = $stateParams;
      this.Alerter = Alerter;
      this.Emails = Emails;
    }

    $onInit() {
      this.loading = false;
      this.responder = this.$scope.currentActionData.responder;
      this.model = {
        from: (this.responder.from && moment(this.responder.from)) || '',
        to: (this.responder.to && moment(this.responder.to)) || '',
        content: this.responder.content,
        responderDuration:
          !this.responder.from && !this.responder.to ? 'permanent' : 'temporary',
      };

      this.$scope.updateResponder = () => this.updateResponder();
    }

    responderDurationCheck() {
      return (
        this.model.responderDuration === 'permanent'
        || (!!this.model.from
          && !!this.model.to
          && moment(this.model.to).isAfter(this.model.from)
          && moment(this.model.to).isAfter(new Date()))
      );
    }

    responderDatesCheck(start, end) {
      this.responderDateStartCheck(start);
      this.responderDateEndCheck(end);
    }

    responderDateStartCheck(input) {
      if (!input.$dirty && !_.isEmpty(this.model.from)) {
        input.$setDirty();
      }
      input.$setValidity(
        'date',
        !!this.model.from
          && (!this.model.to || moment(this.model.from).isBefore(this.model.to)),
      );
    }

    responderDateEndCheck(input) {
      if (!input.$dirty && !_.isEmpty(this.model.to)) {
        input.$setDirty();
      }
      input.$setValidity(
        'date',
        !!this.model.to
          && (!this.model.from
            || moment(this.model.to).isAfter(this.model.from))
          && moment(this.model.to).isAfter(new Date()),
      );
    }

    updateResponder() {
      this.loading = true;

      const data = {
        content: this.model.content,
        from:
          this.model.responderDuration === 'temporary' && !!this.model.from
            ? moment(this.model.from)
            : null,
        to:
          this.model.responderDuration === 'temporary' && !!this.model.to
            ? moment(this.model.to)
            : null,
      };

      let promise;
      if (_.get(this.$scope.currentActionData, 'delegate', false)) {
        promise = this.Emails.updateDelegatedResponder(
          `${this.responder.account}@${this.$stateParams.productId}`,
          data,
        );
      } else {
        promise = this.Emails.updateResponder(
          this.$stateParams.productId,
          this.responder.account,
          data,
        );
      }

      return promise
        .then(() => this.Alerter.success(
          this.$scope.tr('email_tab_modal_update_responder_success'),
          this.$scope.alerts.main,
        ))
        .catch(err => this.Alerter.alertFromSWS(
          this.$scope.tr('email_tab_modal_update_responder_error'),
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
