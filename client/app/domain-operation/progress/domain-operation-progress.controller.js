angular
    .module("App")
    .controller("DomainOperationProgressCtrl", class DomainOperationProgressCtrl {
        constructor (Alerter, domainOperationService, $scope, $stateParams) {
            this.Alerter = Alerter;
            this.Operation = domainOperationService;
            this.$scope = $scope;
            this.$stateParams = $stateParams;
        }

        $onInit () {
            this.$scope.alerts = { dashboard: "domains.operations.alerts" };
            this.currentStepIndex = 0;
            this.loading = false;
            this.progress = null;
            this.steps = [
                { name: "contactsConfirmation", active: false, position: 17 },
                { name: "confirmationOfTheCurrentRegistrar", active: false, position: 50 },
                { name: "finalizationOfTheTransfer", active: false, position: 84 }
            ];

            moment.locale(this.$scope.selectedLanguage.value.split("_")[0]);

            return this.getProgress();
        }

        getProgress () {
            this.loading = true;

            return this.Operation
                .getOperation(this.$stateParams.operationId)
                .then((operation) => {
                    this.domain = operation.domain;
                    this.creationDate = operation.creationDate;
                    this.doneDate = operation.doneDate;

                    const fullProgressBar = { progress: 100 };

                    return operation.status === "done" ? fullProgressBar : this.Operation.getProgressBar(operation.id);
                })
                .catch((error) => {
                    if (!_(error).startsWith("The requested object")) {
                        this.Alerter.alertFromSWS(this.$scope.tr("domains_operations_error"), error, this.$scope.alerts.main);
                    }

                    return null;
                })
                .then((progress) => {
                    this.progress = progress;

                    const operationIsInProgress = _(this.progress).has("currentStep.step");
                    if (operationIsInProgress) {
                        const currentProgressStepName = _(this.progress.currentStep.step).camelCase();
                        this.progress.currentStep.step = currentProgressStepName;

                        const followUpSteps = _(this.progress).get("followUpSteps", []);
                        this.progress.followUpSteps = _(followUpSteps).map((followUpStep) => {
                            followUpStep.step = _(followUpStep.step).camelCase();
                            return followUpStep;
                        }).value();

                        const currentStep = _(this.steps).find((step) => step.name === currentProgressStepName);
                        _.set(currentStep, "active", true);
                        this.currentStepIndex = _(this.progress.followUpSteps).findIndex({ step: this.progress.currentStep.step });

                        const shouldBeDoneAlready = moment().isBefore(this.progress.expectedDoneDate);
                        const expectedTimeLeft = moment().to(this.progress.expectedDoneDate, true);
                        this.timeleft = !shouldBeDoneAlready ? expectedTimeLeft : null;
                    }
                })
                .catch((err) => this.Alerter.alertFromSWS(this.$scope.tr("domains_operations_error"), err, this.$scope.alerts.main))
                .finally(() => {
                    this.loading = false;
                });
        }
});
