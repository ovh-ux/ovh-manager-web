angular.module('App').controller(
  'PrivateDatabaseUpdateWhitelistCtrl',
  class PrivateDatabaseUpdateWhitelistCtrl {
    constructor(
      Alerter,
      WhitelistService,
      $rootScope,
      $scope,
      $stateParams,
      Validator,
    ) {
      this.alerter = Alerter;
      this.whitelistService = WhitelistService;
      this.$rootScope = $rootScope;
      this.$scope = $scope;
      this.$stateParams = $stateParams;
      this.validator = Validator;
    }

    $onInit() {
      this.productId = this.$stateParams.productId;

      this.whitelistToUpdate = this.$scope.currentActionData;

      this.whitelistId = this.whitelistToUpdate.ip;

      this.model = {
        name: this.whitelistToUpdate.name,
        service: this.whitelistToUpdate.service,
        sftp: this.whitelistToUpdate.sftp,
      };

      this.$scope.updateWhitelist = () => {
        this.whitelistService
          .updateWhitelist(this.productId, this.whitelistId, this.model)
          .then(() => this.alerter.success(
            this.$scope.tr('privateDatabase_modale_whitelist_update_success'),
            this.$scope.alerts.main,
          ))
          .catch(() => this.alerter.error(
            this.$scope.tr('privateDatabase_modale_whitelist_update_fail'),
            this.$scope.alerts.main,
          ))
          .finally(() => this.$scope.resetAction());
      };
    }

    isWhitelistValid() {
      return this.model.service || this.model.sftp;
    }
  },
);
