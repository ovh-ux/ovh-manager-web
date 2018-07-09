angular.module('App').controller(
  'IncidentCtrl',
  class AppCtrl {
    constructor($scope, $interval, constants, incident) {
      this.$scope = $scope;
      this.$interval = $interval;
      this.constants = constants;
      this.incident = incident;

      this.informations = null;
    }

    $onInit() {
      const poll = this.$interval(this.poll.bind(this), 60000);

      this.$scope.cancelIncidentModal = () => {
        this.$scope.resetAction();
        this.$interval.cancel(poll);
      };

      this.poll();
    }

    poll() {
      return this.incident.getOvhTasks().then((informations) => {
        this.informations = informations;

        this.informations.tasks = _.map(this.informations.tasks, (originalTask) => {
          const task = _(originalTask).clone();

          task.detailed_desc = task.detailed_desc.replace(/\\'/g, "'");
          task.detailed_desc = task.detailed_desc.replace(/\\"/g, '"');

          task.comments = _.map(task.comments, (originalComment) => {
            const comment = _(originalComment).clone();
            comment.comment_text = comment.comment_text.replace(/\\'/g, "'");
            comment.comment_text = comment.comment_text.replace(/\\"/g, '"');

            return comment;
          });

          task.comments = task.comments.reverse();

          return task;
        });
      });
    }
  },
);
