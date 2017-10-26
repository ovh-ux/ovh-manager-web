import ConfigurationCtrl from "./configuration.controller";

export default function ($stateProvider) {
    $stateProvider.state("main", {
        url: "/configuration",
        templateUrl: "configuration/configuration.html",
        controller: ConfigurationCtrl,
        controllerAs: "ConfigurationCtrl"
    });
}
