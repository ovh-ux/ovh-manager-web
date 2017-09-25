angular.module("App").config(($stateProvider) => {
    "use strict";

    $stateProvider.state("web.domain.general-informations", {
        url: "/informations",
        templateUrl: "domain/general-informations/domain-general-informations.html",
        controller: "DomainTabGeneralInformationsCtrl"
    });
});
