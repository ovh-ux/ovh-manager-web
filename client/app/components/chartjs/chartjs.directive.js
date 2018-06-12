angular.module('App').directive('chartjs', Chart => ({
  restrict: 'A',
  scope: {
    chartjs: '=?',
  },
  bindToController: true,
  controllerAs: '$ctrl',
  templateUrl: 'components/chartjs/chartjs.html',
  link(scope, element, attrs, controller) {
    const canvas = element.children().get(0);
    canvas.id = _.uniqueId('chartjs');
    controller.ctx = canvas.getContext('2d'); // eslint-disable-line no-param-reassign
  },
  controller: function directiveController($scope) {
    const self = this;

    this.createChart = function createChart(data) {
      if (this.chartInstance) {
        this.chartInstance.destroy();
      }
      this.chartInstance = new Chart(this.ctx, data || this.chartjs);
    };

    this.$onInit = () => {
      $scope.$watch('$ctrl.chartjs', (data) => {
        if (data) {
          self.createChart(data);
        }
      });

      $scope.$on('destroy', () => {
        if (self.chartInstance) {
          self.chartInstance.destroy();
        }
      });
    };
  },
}));
