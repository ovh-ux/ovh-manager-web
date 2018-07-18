angular.module('App').controller(
  'controllers.Hosting.Runtimes.edit',
  class HostingRuntimesEditCtrl {
    constructor($scope, $stateParams, Alerter, HostingRuntimes, translator) {
      this.$scope = $scope;
      this.$stateParams = $stateParams;

      this.Alerter = Alerter;
      this.HostingRuntimes = HostingRuntimes;
      this.translator = translator;
    }

    $onInit() {
      this.isLoading = true;

      const data = angular.copy(this.$scope.currentActionData);
      this.entryToEdit = data.runtime;

      this.$scope.edit = () => this.edit();
      this.$scope.isValid = () => this.isValid();

      return this.fetchAvailableTypes();
    }

    fetchAvailableTypes() {
      return this.HostingRuntimes.getAvailableTypes(this.$stateParams.productId)
        .then((types) => {
          this.availableTypes = types;
        })
        .catch(() => {
          this.Alerter.error(
            this.$scope.tr('hosting_tab_RUNTIMES_list_error'),
            this.$scope.alerts.main,
          );

          this.$scope.resetAction();
        })
        .finally(() => {
          this.isLoading = false;
        });
    }

    isValid() {
      if (
        this.entryToEdit
        && this.entryToEdit.type
        && this.entryToEdit.type.indexOf('nodejs') !== -1
      ) {
        return (
          this.entryToEdit
          && this.entryToEdit.name
          && this.entryToEdit.publicDir
          && this.entryToEdit.appEnv
          && this.entryToEdit.appBootstrap
        );
      }

      return this.entryToEdit && this.entryToEdit.name && this.entryToEdit.type;
    }

    edit() {
      return this.HostingRuntimes.edit(
        this.$stateParams.productId,
        this.entryToEdit.id,
        this.entryToEdit,
      )
        .then(() => {
          this.Alerter.success(
            this.$scope.tr('hosting_tab_RUNTIMES_edit_success'),
            this.$scope.alerts.main,
          );
        })
        .catch((err) => {
          this.Alerter.error(
            this.$scope.tr('hosting_tab_RUNTIMES_edit_error') + err.message,
            this.$scope.alerts.main,
          );
        })
        .finally(() => {
          this.$scope.resetAction();
        });
    }
  },
);
