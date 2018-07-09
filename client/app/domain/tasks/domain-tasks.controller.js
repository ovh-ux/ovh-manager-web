angular.module('controllers').controller(
  'controllers.Domain.Tasks',
  class DomainTasksCtrl {
    constructor($scope, $q, $state, $stateParams, Domain) {
      this.$scope = $scope;
      this.$q = $q;
      this.$state = $state;
      this.$stateParams = $stateParams;
      this.Domain = Domain;
    }

    $onInit() {
      this.getTasks();
    }

    getTasks() {
      if (/^\/configuration\/zone.+/.test(this.$state.current.url)) {
        return this.Domain.getZoneDnsTasks(this.$stateParams.productId).then((tasks) => {
          this.tasks = this.constructor.getTaskStruct(tasks, true);
        });
      }
      return this.$q
        .all({
          zoneDnsTasks: this.Domain.getZoneDnsTasks(this.$stateParams.productId),
          tasks: this.Domain.getTasks(this.$stateParams.productId),
        })
        .then(({ zoneDnsTasks, tasks }) => {
          this.tasks = this.constructor
            .getTaskStruct(zoneDnsTasks, true)
            .concat(this.constructor.getTaskStruct(tasks, false));
        });
    }

    static getTaskStruct(tasks, isZone) {
      return _.map(tasks, task => ({ id: task, zone: isZone }));
    }

    transformItem(item) {
      if (item.zone) {
        return this.Domain.getZoneDnsTask(
          this.$stateParams.productId,
          item.id,
        ).then((originalResult) => {
          const result = _(originalResult).clone();

          result.status = result.status.toUpperCase();
          return result;
        });
      }
      return this.Domain.getTask(this.$stateParams.productId, item.id);
    }
  },
);
