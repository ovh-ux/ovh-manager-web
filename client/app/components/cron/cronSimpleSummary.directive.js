angular.module('directives').directive('cronSimpleSummary', () => ({
  restrict: 'E',
  replace: true,
  scope: {
    crontabObject: '=',
  },
  templateUrl: 'components/cron/cronSimpleSummary.html',
  controller: 'cronSimpleSummaryCtrl',
}));
