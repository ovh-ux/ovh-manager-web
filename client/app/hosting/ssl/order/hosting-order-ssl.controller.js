angular.module("App").controller(
    "HostingOrderSslCtrl",
    class HostingOrderSslCtrl {
        constructor ($scope, $stateParams, $window, Alerter, Hosting, HostingDomain, HostingOptionOrder, User, Validator) {
            this.$scope = $scope;
            this.$stateParams = $stateParams;
            this.$window = $window;
            this.Alerter = Alerter;
            this.Hosting = Hosting;
            this.HostingDomain = HostingDomain;
            this.HostingOptionOrder = HostingOptionOrder;
            this.User = User;
            this.Validator = Validator;
        }

        $onInit () {
            this.loading = {
                init: false,
                duration: false,
                details: false,
                order: false,
                generateCertif: false
            };
            this.manualMode = {
                certificate: "",
                key: "",
                chain: ""
            };
            this.model = {
                duration: null,
                contract: null
            };
            this.sslType = "letsencrypt";

            this.details = {};
            this.durations = [];
            this.isOrderable = false;
            this.validDomain = true;

            this.$scope.makeOrder = () => this.makeOrder();
            this.$scope.checkMultisitesSSL = () => this.checkMultisitesSSL();
            this.$scope.createCertif = () => this.createCertif();
            this.$scope.generateCertif = () => this.generateCertif();

            if (!this.Validator.isValidLetsEncryptDomain("www.", this.$stateParams.productId)) {
                this.sslType = "payable";
                this.validDomain = false;
            }
        }

        checkMultisitesSSL () {
            if (this.sslType === "payable") {
                this.loading.init = true;

                this.HostingDomain.getAttachedDomain(this.$stateParams.productId, this.$stateParams.productId)
                    .then((attachedDomain) => {
                        let rtn;
                        if (!attachedDomain.ssl) {
                            rtn = this.HostingDomain.updateAttachedDomain(this.$stateParams.productId, this.$stateParams.productId, {
                                ssl: true
                            });
                        }
                        return rtn;
                    })
                    .catch((err) => {
                        this.Alerter.alertFromSWS(this.$scope.tr("hosting_dashboard_ssl_order_error"), err, this.$scope.alerts.main);
                        this.$scope.resetAction();
                    })
                    .finally(() => {
                        this.loading.init = false;
                    });
            }
        }

        createCertif () {
            if (this.sslType === "letsencrypt" || (this.sslType === "import" && this.manualMode.certificate !== "" && this.manualMode.key !== "")) {
                this.loading.generateCertif = true;

                let data = {
                    certificate: null,
                    key: null,
                    chain: null
                };

                if (this.sslType === "import") {
                    data = _.pick(this.manualMode, "certificate", "chain", "key");
                }

                this.Hosting.createSsl(this.$stateParams.productId, data.certificate, data.key, data.chain)
                    .then(() => this.Alerter.success(this.$scope.tr("hosting_dashboard_ssl_generate_success"), this.$scope.alerts.main))
                    .catch((err) => this.Alerter.alertFromSWS(this.$scope.tr("hosting_dashboard_ssl_order_error"), err, this.$scope.alerts.main))
                    .finally(() => {
                        this.$scope.loadSsl();
                        this.$scope.resetAction();
                    });
            }
        }

        isStepOneValid () {
            if (this.sslType === "payable") {
                return true;
            }
            if (this.sslType === "letsencrypt") {
                return !this.loading.generateCertif;
            }
            if (this.sslType === "import") {
                return this.manualMode.certificate !== "" && this.manualMode.key !== "";
            }
            return !this.loading.init && !this.loading.duration && !this.loading.details && this.isOrderable && this.model.duration;
        }

        generateCertif () {
            let rtn;
            if (this.sslType === "payable") {
                this.loading.generateCertif = true;
                rtn = this.User.getUrlOfEndsWithSubsidiary("domain_order_options_service")
                    .then((_url) => {
                        const url = _url.replace("{domain}", this.$stateParams.productId);

                        this.Alerter.success(this.$scope.tr("hosting_dashboard_ssl_redirect_to_order", [url]), this.$scope.alerts.main);
                        this.$scope.resetAction();
                        this.$window.open(url, "_blank");
                    })
                    .catch((err) => {
                        this.Alerter.alertFromSWS(this.$scope.tr("hosting_dashboard_ssl_redirect_to_order"), err, this.$scope.alerts.main);
                    });
            }
            this.createCertif();
            return rtn;
        }

        makeOrder () {
            this.loading.order = true;
            return this.HostingOptionOrder.makeOrder("ssl", this.model.duration)
                .then((order) => {
                    this.Alerter.success(this.$scope.tr("hosting_dashboard_ssl_order_success", [order.url, order.orderId]), this.$scope.alerts.main);
                    this.$window.open(order.url, "_blank");
                })
                .catch((err) => {
                    this.Alerter.alertFromSWS(this.$scope.tr("hosting_dashboard_ssl_order_error"), _.get(err, "data", err), this.$scope.alerts.main);
                })
                .finally(() => {
                    this.$scope.resetAction();
                });
        }
    }
);
