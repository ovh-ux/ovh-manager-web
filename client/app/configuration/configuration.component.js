import uiRouter from 'angular-ui-router'
// import ConfigurationCtrl from './configuration.controller'
import routing from './configuration.routes'
// import template from './configuration.html'

export default angular
  .module("Configuration", [uiRouter])
  .config(routing)
  // .component('configuration', {
  //   template,
  //   controller: ConfigurationCtrl
  // })
  // .name
