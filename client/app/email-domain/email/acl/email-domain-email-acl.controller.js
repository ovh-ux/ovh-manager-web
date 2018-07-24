angular.module('App').controller(
  'EmailDomainEmailAclCtrl',
  class EmailDomainEmailAclCtrl {
    /**
     * Constructor
     * @param $scope
     * @param $stateParams
     * @param Alerter
     * @param Emails
     * @param User
     * @param constants
     * @param translator
     */
    constructor(
      $scope,
      $stateParams,
      Alerter,
      Emails,
      User,
      constants,
      translator,
    ) {
      this.$scope = $scope;
      this.$stateParams = $stateParams;
      this.Alerter = Alerter;
      this.Emails = Emails;
      this.User = User;
      this.constants = constants;
      this.translator = translator;
    }

    $onInit() {
      this.aclsDetails = [];
      this.addAclItem = { value: '' };
      this.addingAcl = false;
      this.createNicUrl = { value: '' };
      this.loading = {
        acls: false,
      };

      this.User.getUser()
        .then((user) => {
          const nicLanguage = _.find(
            this.translator.getAvailableLanguages(),
            language => _(language.value).endsWith(user.ovhSubsidiary),
          );
          if (nicLanguage) {
            this.createNicUrl.value = this.constants.WEBSITE_URLS.new_nic[
              nicLanguage.value
            ];
          }
        })
        .catch(() => {
          this.createNicUrl.value = '';
        });

      this.$scope.$on('hosting.tabs.emails.acls.refresh', () => this.refreshTableAcls());

      this.refreshTableAcls();
    }

    addAcl() {
      this.loading.acls = true;
      this.Emails.createAcl(this.$stateParams.productId, this.addAclItem.value)
        .then(() => {
          this.Alerter.success(
            this.$scope.tr('email_tab_table_acls_add_success'),
            this.$scope.alerts.main,
          );
          this.refreshTableAcls();
        })
        .catch((err) => {
          this.Alerter.alertFromSWS(
            this.$scope.tr('email_tab_table_acls_add_error'),
            err,
            this.$scope.alerts.main,
          );
          this.loading.acls = false;
        })
        .finally(() => {
          this.addAclItem.value = '';
          this.addingAcl = false;
        });
    }

    refreshTableAcls(forceRefresh) {
      this.loading.acls = true;
      this.acls = null;

      return this.Emails.getAcls(this.$stateParams.productId, forceRefresh)
        .then((acls) => {
          this.acls = acls;
        })
        .catch(err => this.Alerter.alertFromSWS(
          this.$scope.tr('email_tab_table_acls_error'),
          err,
          this.$scope.alerts.main,
        ))
        .finally(() => {
          if (_.isEmpty(this.acls)) {
            this.loading.acls = false;
          }
        });
    }

    transformItem(item) {
      return this.Emails.getAcl(this.$stateParams.productId, item);
    }

    onTransformItemDone() {
      this.loading.acls = false;
    }
  },
);
