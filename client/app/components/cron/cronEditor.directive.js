angular.module('directives').directive('cronEditor', () => ({
  restrict: 'E',
  replace: true,
  scope: {
    crontabObject: '=',
  },
  templateUrl: 'components/cron/cronEdit.html',
  controller: 'cronEditorCtrl',
}));
