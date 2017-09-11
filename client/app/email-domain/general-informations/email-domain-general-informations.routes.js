angular.module("App").config(($stateProvider) => {
    "use strict";

    $stateProvider.state("app.email.general-informations", {
        url: "domain/informations",
        templateUrl: "email-domain/general-informations/email-domain-general-informations.html",
        controller: "EmailTabGeneralInformationsCtrl"
    });
});
