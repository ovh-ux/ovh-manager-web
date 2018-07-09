angular
  .module('App')
  .controller('HostingEditOvhConfig', class HostingEditOvhConfig {
    constructor($scope, $q, $stateParams, Alerter, Hosting, HostingOvhConfig, User) {
      this.$scope = $scope;
      this.$q = $q;
      this.$stateParams = $stateParams;
      this.alerter = Alerter;
      this.hostingService = Hosting;
      this.hostingOvhConfigService = HostingOvhConfig;
      this.User = User;
    }

    $onInit() {
      this.errorMsg = null;
      this.loading = false;
      this.model = {};
      this.toggle = {
        areInitializationErrors: false,
        areOldConfigsExist: false,
        isConfigCanBeSaved: false,
        isConfigIsEdited: false,
        isErrorNotDefined: false,
        isPhpVersionAvailable: false,
        isRollbackProcess: false,
        process: null,
      };
      this.selectedConfig = null;

      this.$scope.setProcess = () => this.setProcess();
      this.$scope.saveConfig = () => this.saveConfig();

      this.initWizard();
    }

    static parseLabel(label) {
      if (_.isString(label) && !_.isEmpty(label)) {
        return label.replace('.', '_');
      }
      return 'null';
    }

    initWizard() {
      const queue = [];
      this.loading = true;

      this.User.getUrlOf('guides')
        .then((guides) => {
          this.phpAppendicesGuide = guides.phpAppendices;
          this.hostingPhpGuide = guides.hostingPhpConfiguration;
        });

      queue.push(this.hostingService.getModels()
        .then((apiStruct) => {
          this.apiStruct = {
            models: apiStruct.models,
          };
        }));

      queue.push(this.hostingOvhConfigService.getHistoric(this.$stateParams.productId)
        .then((configs) => {
          this.oldConfigs = configs;
        }));

      queue.push(this.hostingOvhConfigService.getCurrent(this.$stateParams.productId)
        .then((conf) => {
          this.currentConfig = conf;
        }));

      return this.$q
        .all(queue)
        .catch(() => {
          this.toggle.areInitializationErrors = true;
        })
        .finally(() => {
          this.loading = false;
          if (_.isArray(this.oldConfigs) && !_.isEmpty(this.oldConfigs)) {
            this.toggle.areOldConfigsExist = true;
          } else {
            this.toggle.areOldConfigsExist = false;
            this.toggle.isRollbackProcess = false;
            this.toggle.process = 'update';
          }
        });
    }

    setProcess() {
      if (this.toggle.process === 'rollback') {
        this.toggle.isRollbackProcess = true;
        this.selectedConfig = this.oldConfigs[0];
      } else {
        this.selectedConfig = this.currentConfig;
      }
      this.changeToConfig(this.selectedConfig);
    }

    changeToConfig(ovhConfig) {
      this.clearDisplayedError();
      this.toggle.isConfigIsEdited = false;
      _.set(this.model, 'engineName', ovhConfig.engineName);
      _.set(this.model, 'engineVersion', ovhConfig.engineVersion);
      _.set(this.model, 'environment', ovhConfig.environment);
      _.set(this.model, 'httpFirewall', ovhConfig.httpFirewall);
      _.set(this.model, 'container', ovhConfig.container || 'stable');
      this.checkCohesion();
    }

    updateConfig() {
      this.changeToConfig(this.selectedConfig);
    }

    updateSelectedConfig() {
      this.clearDisplayedError();
      this.toggle.isConfigIsEdited = true;
      this.checkCohesion();
    }

    checkCohesion() {
      if (this.toggle.isRollbackProcess) {
        this.toggle.isConfigCanBeSaved = true;
      } else if (_.indexOf(this.apiStruct.models['hosting.web.ovhConfig.AvailableEngineVersionEnum'].enum, this.model.engineVersion) !== -1) {
        this.toggle.isPhpVersionAvailable = true;
        this.toggle.isConfigCanBeSaved = this.toggle.isConfigIsEdited;
      } else {
        this.toggle.isPhpVersionAvailable = false;
        this.toggle.isConfigCanBeSaved = false;
      }
    }

    saveConfig() {
      if (this.toggle.isConfigIsEdited) {
        const model = angular.copy(this.model);
        model.id = this.currentConfig.id;
        return this.hostingOvhConfigService.changeConfiguration(this.$stateParams.productId, model)
          .then(() => {
            this.alerter.success(this.$scope.tr('hosting_action_config_edit_success'), this.$scope.alerts.main);
            this.$scope.$emit(this.hostingOvhConfigService.events.ovhConfigNeedRefresh);
            this.$scope.resetAction();
          })
          .catch((err) => {
            this.displayError(err);
          });
      }
      return this.hostingOvhConfigService.rollbackConfig(this.$stateParams.productId, this.currentConfig.id, this.selectedConfig.id)
        .then(() => {
          this.alerter.success(this.$scope.tr('hosting_action_config_rollback_success'), this.$scope.alerts.main);
          this.$scope.$emit(this.hostingOvhConfigService.events.ovhConfigNeedRefresh);
          this.$scope.resetAction();
        })
        .catch((err) => {
          this.displayError(err);
        });
    }

    clearDisplayedError() {
      this.errorMsg = null;
      this.toggle.isErrorNotDefined = false;
    }

    displayError(err) {
      this.clearDisplayedError();
      this.checkCohesion();
      this.errorMsg = _.get(err, 'message');
      this.toggle.isErrorNotDefined = !this.errorMsg;
    }
  });
