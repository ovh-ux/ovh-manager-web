import routing from "./configuration.routes";
import uiRouter from "angular-ui-router";

export default angular
    .module("Configuration", [uiRouter])
    .config(routing);
