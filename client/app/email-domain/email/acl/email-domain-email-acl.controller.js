angular.module('App').controller(
  'EmailDomainEmailAclCtrl',
  class EmailDomainEmailAclCtrl {
    /**
     * Constructor
     * @param $scope
     * @param $stateParams
     * @param $translate
     * @param Alerter
     * @param WucEmails
     * @param LANGUAGES
     * @param User
     * @param constants
     */
    constructor(
      $scope,
      $stateParams,
      $translate,
      Alerter,
      WucEmails,
      LANGUAGES,
      User,
      constants,
    ) {
      this.$scope = $scope;
      this.$stateParams = $stateParams;
      this.$translate = $translate;
      this.Alerter = Alerter;
      this.WucEmails = WucEmails;
      this.LANGUAGES = LANGUAGES;
      this.User = User;
      this.constants = constants;
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
            this.LANGUAGES,
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
      this.WucEmails.createAcl(this.$stateParams.productId, this.addAclItem.value)
        .then(() => {
          this.Alerter.success(
            this.$translate.instant('email_tab_table_acls_add_success'),
            this.$scope.alerts.main,
          );
          this.refreshTableAcls();
        })
        .catch((err) => {
          this.Alerter.alertFromSWS(
            this.$translate.instant('email_tab_table_acls_add_error'),
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

      return this.WucEmails.getAcls(this.$stateParams.productId, forceRefresh)
        .then((acls) => {
          this.acls = acls;
        })
        .catch(err => this.Alerter.alertFromSWS(
          this.$translate.instant('email_tab_table_acls_error'),
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
      return this.WucEmails.getAcl(this.$stateParams.productId, item);
    }

    onTransformItemDone() {
      this.loading.acls = false;
    }
  },
);
