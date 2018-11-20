angular.module('App').controller(
  'EmailsCreateAccountCtrl',
  class EmailsCreateAccountCtrl {
    /**
     * Constructor
     * @param $scope
     * @param $q
     * @param $stateParams
     * @param $translate
     * @param Alerter
     * @param WucEmails
     * @param User
     */
    constructor($scope, $q, $stateParams, $translate, Alerter, WucEmails, User) {
      this.$scope = $scope;
      this.$stateParams = $stateParams;
      this.$q = $q;
      this.$translate = $translate;
      this.Alerter = Alerter;
      this.WucEmails = WucEmails;
      this.User = User;
    }

    createGuide(deviceName, guideName, guideUrl, logo) {
      const guide = {
        guideName,
        guideUrl,
      };
      const idxDevice = _.findIndex(this.devices, 'deviceName', deviceName);

      if (idxDevice >= 0) {
        this.devices[idxDevice].guides.push(guide);
      } else {
        this.devices.push({
          deviceName,
          guides: [guide],
          logo,
        });
      }
    }

    setGuideByName(deviceName) {
      const idxDevice = _.findIndex(this.devices, 'deviceName', deviceName);

      if (idxDevice >= 0) {
        this.currentGuide = this.devices[idxDevice];
      } else {
        this.currentGuide = {};
      }
    }

    // "MAC", "OUTLOOK", "IPHONE", "ANDROID", "OTHER"
    $onInit() {
      this.currentGuideName = 'OUTLOOK';
      this.currentGuide = {};

      this.devices = [];

      this.account = {
        accountName: '',
        description: '',
        password: '',
        size: 5000000000,
      };
      this.allowedAccountSize = [];
      this.constants = {
        descMaxLength: 32,
        descRegexPattern: /^[^:§⁼]*$/,
        nameMaxLength: 32,
        nameMinLength: 2,
        nameRegexPattern: /^\w+[\w.-]+\w*$/,
        passwordMaxLength: 30,
        passwordMinLength: 9,
      };
      this.domain = this.$stateParams.productId;
      this.guides = {};
      this.loading = { accountSize: false };
      this.validation = {
        password: '',
        postmaster: false,
      };

      this.$scope.createAccount = () => this.createAccount();

      this.User.getUrlOf('guides').then((guides) => {
        this.createGuide(
          'MAC',
          'El capitan',
          _.get(guides, 'emailsConfigurationMacElCapitain'),
          'assets/images/logos/iOS9.png',
        );
        this.createGuide(
          'MAC',
          'Mavericks / Yosemite',
          _.get(guides, 'emailsConfigurationMacMavericksAndYosemite'),
          'assets/images/logos/iOS9.png',
        );
        this.createGuide(
          'MAC',
          'Mountain Lion',
          _.get(guides, 'emailsConfigurationMacMountainLion'),
          'assets/images/logos/iOS9.png',
        );
        this.createGuide(
          'OUTLOOK',
          '2016',
          _.get(guides, 'emailsConfigurationOutlook2016'),
          'assets/images/logos/outlook2013.png',
        );
        this.createGuide(
          'OUTLOOK',
          '2013',
          _.get(guides, 'emailsConfigurationOutlook2013'),
          'assets/images/logos/outlook2013.png',
        );
        this.createGuide(
          'OUTLOOK',
          '2010',
          _.get(guides, 'emailsConfigurationOutlook2010'),
          'assets/images/logos/outlook2013.png',
        );
        this.createGuide(
          'OUTLOOK',
          '2007',
          _.get(guides, 'emailsConfigurationOutlook2007'),
          'assets/images/logos/outlook2013.png',
        );
        this.createGuide(
          'IPHONE',
          '',
          _.get(guides, 'emailsConfigurationAuto'),
          'assets/images/logos/iOS9.png',
        );
        this.createGuide(
          'IPHONE',
          '9.1',
          _.get(guides, 'emailsConfigurationIos9'),
          'assets/images/logos/iOS9.png',
        );
        this.createGuide(
          'ANDROID',
          '6',
          _.get(guides, 'emailsConfigurationAndroid6'),
          'assets/images/logos/android.jpg',
        );
        this.createGuide(
          'OTHER',
          'ALL',
          _.get(guides, 'emailsConfiguration'),
          'assets/images/logos/OVH-logo.png',
        );

        this.setGuideByName(this.currentGuideName);
      });

      this.getAccountSize();
    }

    accountDescriptionCheck(input) {
      input.$setValidity(
        'descriptionCheck',
        !this.account.description
          || punycode.toASCII(this.account.description).length
            <= this.constants.descMaxLength,
      );
    }

    accountPasswordCheck(input) {
      input.$setValidity(
        'passwordCheck',
        !!this.account.password
          && (!/^\s/.test(this.account.password)
            && !/\s$/.test(this.account.password))
          && !this.account.password.match(/[ÂÃÄÀÁÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿ]/),
      );
    }

    createAccount() {
      this.account.accountName = _.trim(this.account.accountName);

      this.WucEmails.createAccount(this.$stateParams.productId, this.account)
        .then(() => this.Alerter.success(
          this.$translate.instant('email_tab_modal_create_account_success'),
          this.$scope.alerts.main,
        ))
        .catch(err => this.Alerter.alertFromSWS(
          this.$translate.instant('email_tab_modal_create_account_error'),
          err,
          this.$scope.alerts.main,
        ))
        .finally(() => this.$scope.resetAction());
    }

    getAccountSize() {
      this.loading.accountSize = true;

      this.$q
        .all({
          domain: this.WucEmails.getDomain(this.$stateParams.productId),
          quotas: this.WucEmails.getQuotas(this.$stateParams.productId),
          emails: this.WucEmails.getEmails(this.$stateParams.productId, {
            accountName: '%',
          }),
        })
        .then(({ domain, quotas, emails }) => {
          this.allowedAccountSize = domain.allowedAccountSize;

          if (
            quotas.account === emails.length
            && emails.indexOf('postmaster') === -1
          ) {
            this.account.accountName = 'postmaster';
            this.validation.postmaster = true;
          }
        })
        .catch(err => this.Alerter.alertFromSWS(
          this.$translate.instant('email_tab_error'),
          err.data,
          this.$scope.alerts.main,
        ))
        .finally(() => {
          this.loading.accountSize = false;
        });
    }

    isPasswordMatches() {
      return this.account.password === this.validation.password;
    }

    isPasswordDefined() {
      return this.account.password && this.validation.password;
    }
  },
);
