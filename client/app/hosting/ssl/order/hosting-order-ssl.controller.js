angular.module("App")
    .controller("hostingOrderSslCtrl", class HostingOrderSslCtrl {
        constructor ($scope, $stateParams, $window, Alerter, HostingDomain, hostingSSL, translator, User, Validator) {
            this.$scope = $scope;
            this.$stateParams = $stateParams;

            this.Alerter = Alerter;
            this.HostingDomain = HostingDomain;
            this.hostingSSL = hostingSSL;
            this.translator = translator;
            this.User = User;
            this.Validator = Validator;
            this.$window = $window;
        }

        $onInit () {
            this.certificateTypes = {
                letsEncrypt: "letsEncrypt",
                paid: "paid",
                "import": "import"
            };

            this.global = {
                selectedCertificateType: this.certificateTypes.letsEncrypt
            };

            this.step1 = {
                loading: {
                    isRetrievingInitialData: true
                },
                canOrderLetEncryptCertificate: true
            };

            this.step2 = {
                loading: {
                    isGeneratingOrderForm: false,
                    isCreatingCertificate: false
                },
                importedCertificate: {}
            };

            if (!this.Validator.isValidLetsEncryptDomain("www.", this.$stateParams.productId)) {
                this.global.selectedCertificateType = this.certificateTypes.paid;
                this.step1.canOrderLetEncryptCertificate = false;
            }

            this.$scope.onStep1Load = () => this.onStep1Load();
            this.$scope.onStep1NextStep = () => this.onStep1NextStep();
            this.$scope.onStep2Load = () => this.onStep2Load();
            this.$scope.onFinishWizard = () => this.onFinishWizard();
        }

        onStep1Load () {
            this.step1.loading.isRetrievingInitialData = true;

            return this.HostingDomain.getAttachedDomain(this.$stateParams.productId, this.$stateParams.productId)
                .then((attachedDomain) =>
                    !attachedDomain.ssl ?
                        this.HostingDomain.updateAttachedDomain(this.$stateParams.productId, this.$stateParams.productId, {
                            ssl: true
                        }) :
                        null)
                .then(() => {
                    this.step1.canOrderPaidCertificate = true;
                })
                .catch((err) => {
                    this.step1.cannotOrderPaidCertificateErrorMessage = this.translator.tr("hosting_dashboard_ssl_paid_certificate_error", [err.message]);
                    this.step1.canOrderPaidCertificate = false;
                })
                .finally(() => {
                    this.step1.loading.isRetrievingInitialData = false;
                });
        }

        onStep1NextStep () {
            if (this.global.selectedCertificateType === this.certificateTypes.letsEncrypt) {
                this.creatingCertificate();
            }
        }

        onStep2Load () {
            if (this.global.selectedCertificateType === this.certificateTypes.paid) {
                this.generatingOrderForm();
            }
        }

        isStep2Valid () {
            const isPaidCertificateValid = this.global.selectedCertificateType === this.certificateTypes.paid && !this.step2.loading.isGeneratingOrderForm;
            const isImportCertificateValid = this.global.selectedCertificateType === this.certificateTypes.import && _(this.step2.importedCertificate.content).isString() && _(this.step2.importedCertificate.key).isString();

            return isPaidCertificateValid || isImportCertificateValid;
        }

        creatingCertificate () {
            return this.hostingSSL.creatingCertificate(this.$stateParams.productId, this.step2.importedCertificate.content, this.step2.importedCertificate.key, this.step2.importedCertificate.chain)
                .then(() => {
                    this.Alerter.success(this.$scope.tr("hosting_dashboard_ssl_generate_success"), this.$scope.alerts.main);
                    this.$scope.loadSsl();
                })
                .catch((err) => {
                    this.Alerter.alertFromSWS(this.$scope.tr("hosting_dashboard_ssl_order_error"), err.data, this.$scope.alerts.main);
                })
                .finally(() => {
                    this.$scope.resetAction();
                });
        }

        generatingOrderForm () {
            this.step2.loading.isGeneratingOrderForm = true;

            return this.User.getUrlOfEndsWithSubsidiary("domain_order_options_service")
                .then((rawOrderFormURL) => {
                    this.orderFormURL = rawOrderFormURL.replace("{domain}", this.$stateParams.productId);
                })
                .catch((err) => {
                    this.Alerter.alertFromSWS(this.$scope.tr("hosting_dashboard_ssl_redirect_to_order_error"), err, this.$scope.alerts.main);
                    this.$scope.resetAction();
                })
                .finally(() => {
                    this.step2.loading.isGeneratingOrderForm = false;
                });
        }

        onFinishWizard () {
            if (this.global.selectedCertificateType === this.certificateTypes.paid) {
                this.$window.open(this.orderFormURL, "_blank");
                this.$scope.resetAction();
            } else if (this.global.selectedCertificateType === this.certificateTypes.import) {
                this.creatingCertificate();
            }
        }
    }
);
