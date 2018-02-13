angular.module("App").controller(
    "AppCtrl",
    class AppCtrl {
        constructor ($scope, $rootScope, $timeout, constants, incident, User, translator, OvhApiMeAlertsAapi) {
            this.$scope = $scope;
            this.$rootScope = $rootScope;
            this.$timeout = $timeout;
            this.constants = constants;
            this.incident = incident;
            this.translator = translator;
            this.User = User;
            this.ovhApiMeAlertsAapi = OvhApiMeAlertsAapi;
        }

        $onInit () {
            this.$scope.worldPart = this.constants.target;
            this.$scope.stepPath = "";
            this.$scope.currentAction = null;
            this.$scope.currentActionData = null;

            this.incidentMessage = null;

            this.$scope.resetAction = () => {
                $("#currentActionApp").modal("hide");
                this.$scope.currentActionData = null;

                this.$timeout(() => {
                    this.$scope.stepPath = "";
                }, 300);
            };

            this.incident.getOvhTasks().then((informations) => {
                if (!_.isEmpty(informations)) {
                    this.incidentMessage = informations.alert[this.translator.getLanguage()] || informations.alert.en_GB;
                }
            });

            this.ovhApiMeAlertsAapi.query({
                lang: this.translator.getLanguage(),
                target: this.constants.target,
                universe: this.constants.UNIVERS.toUpperCase()
            }).$promise.then((alerts) => {
                if (alerts && alerts.length) {
                    const messages = [];

                    angular.forEach(alerts, (alert) => {
                        if (alert.level === "warning") {
                            switch (alert.id) {
                            case "DEBTACCOUNT_DEBT":
                                if (_.get(alert, "data.debtAccount.unmaturedAmount.value", 0) > 0) {
                                    messages.push(this.translator.tr("me_alerts_DEBTACCOUNT_DEBT_WITH_UNMATURED_AMOUNT", [_.get(alert, "data.debtAccount.dueAmount.text"), _.get(alert, "data.debtAccount.unmaturedAmount.text")]));
                                } else {
                                    messages.push(this.translator.tr("me_alerts_DEBTACCOUNT_DEBT", [_.get(alert, "data.debtAccount.dueAmount.text")]));
                                }
                                break;
                            case "OVHACCOUNT_DEBT":
                                messages.push(this.translator.tr("me_alerts_OVHACCOUNT_DEBT", [_.get(alert, "data.ovhAccount.balance.text"), moment(_.get(alert, "data.ovhAccount.lastUpdate")).format("L")]));
                                break;
                            case "PAYMENTMEAN_DEFAULT_MISSING":
                            case "PAYMENTMEAN_DEFAULT_EXPIRED":
                            case "PAYMENTMEAN_DEFAULT_BANKACCOUNT_PENDINGVALIDATION":
                            case "PAYMENTMEAN_DEFAULT_CREDITCARD_TOOMANYFAILURES":
                            case "PAYMENTMEAN_DEFAULT_PAYPAL_TOOMANYFAILURES":
                            case "OVHACCOUNT_ALERTTHRESHOLD":
                                messages.push(this.translator.tr(`me_alerts_${alert.id}`));
                                break;
                            case "ORDERS_DOCUMENTSREQUESTED":
                                messages.push(this.translator.tr("me_alerts_ORDERS_DOCUMENTSREQUESTED", [(_.get(alert, "data.ordersWithDocumentsRequested") || []).length]));
                                break;
                            default:
                                var translatedAlert = this.translator.tr(`me_alerts_${alert.id}`);
                                if (translatedAlert === `/!\\ me_alerts_${alert.id}`) {
                                        // No translation
                                    messages.push(alert.description);
                                } else {
                                    messages.push(translatedAlert);
                                }
                            }
                        }
                    });

                    if (messages.length) {
                        this.userImportantAlertsMessages = messages;
                    }
                }
            });
        }

        setAction (action, data) {
            this.$scope.currentAction = action;
            this.$scope.currentActionData = data;

            if (action) {
                this.$scope.stepPath = `${this.$scope.currentAction}.html`;
                $("#currentActionApp").modal({
                    keyboard: true,
                    backdrop: "static"
                });
            } else {
                this.$scope.resetAction();
            }
        }

        getIncidentInformations () {
            this.setAction("incident/incident");
        }
    }
);
