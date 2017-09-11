angular.module("App").controller("HostingOrderSslCtrl", ($scope, $q, $window, $stateParams, HostingOptionOrder, Hosting, Alerter, User, HostingDomain, Validator) => {
    "use strict";

    $scope.manualMode = {
        certif: "",
        key: "",
        chain: ""
    };
    $scope.model = {
        duration: null,
        contract: null
    };
    $scope.loading = {
        init: false,
        duration: false,
        details: false,
        order: false,
        generateCertif: false
    };
    $scope.sslType = {
        value: "letsencrypt"
    };

    $scope.details = {};
    $scope.durations = [];
    $scope.isOrderable = false;
    $scope.maxDomainLength = Validator.MAX_DOMAIN_LENGTH;
    $scope.validDomain = true;

    const init = () => {
        if (!Validator.isValidLetsEncryptDomain("www.", $stateParams.productId)) {
            $scope.sslType.value = "payable";
            $scope.validDomain = false;
        }
    };

    init();

    $scope.checkMultisitesSSL = function () {
        if ($scope.sslType.value === "payable") {
            $scope.loading.init = true;

            HostingDomain.getAttachedDomain($stateParams.productId, $stateParams.productId)
                .then((attachedDomain) => {
                    let rtn;
                    if (!attachedDomain.ssl) {
                        rtn = HostingDomain.updateAttachedDomain($stateParams.productId, $stateParams.productId, {
                            ssl: true
                        });
                    }
                    return rtn;
                })
                .catch((err) => {
                    Alerter.alertFromSWS($scope.tr("hosting_dashboard_ssl_order_error"), err, "hosting.alerts.dashboard");
                    $scope.resetAction();
                })
                .finally(() => {
                    $scope.loading.init = false;
                });
        }
    };

    $scope.isStepValid = (step) => {
        switch (step) {
        case 1:
            if ($scope.sslType.value === "payable") {
                return true;
            }
            if ($scope.sslType.value === "letsencrypt") {
                return !$scope.loading.generateCertif;
            }
            if ($scope.sslType.value === "import") {
                return $scope.manualMode.certif !== "" && $scope.manualMode.key !== "";
            }
            return !$scope.loading.init && !$scope.loading.duration && !$scope.loading.details && $scope.isOrderable && $scope.model.duration;
        default:
            return null;
        }
    };

    $scope.createCertif = () => {
        if ($scope.sslType.value === "letsencrypt" || ($scope.sslType.value === "import" && $scope.manualMode.certif !== "" && $scope.manualMode.key !== "")) {
            $scope.loading.generateCertif = true;

            let data = {
                certificate: null,
                key: null,
                chain: null
            };

            if ($scope.sslType.value === "import") {
                data = _.pick($scope, "manualMode.certif", "manualMode.chain", "manualMode.key");
            }

            Hosting.createSsl($stateParams.productId, data.certificate, data.key, data.chain)
                .then(() => Alerter.success($scope.tr("hosting_dashboard_ssl_generate_success"), "hosting.alerts.dashboard"))
                .catch((err) => Alerter.alertFromSWS($scope.tr("hosting_dashboard_ssl_order_error"), err, "hosting.alerts.dashboard"))
                .finally(() => {
                    $scope.loadSsl();
                    $scope.resetAction();
                });
        }
    };

    $scope.generateCertif = () => {
        let rtn;
        if ($scope.sslType.value === "payable") {
            $scope.loading.generateCertif = true;
            rtn = User.getUrlOfEndsWithSubsidiary("domain_order_options_service")
                .then((_url) => {
                    const url = _url.replace("{domain}", $stateParams.productId);

                    Alerter.success($scope.tr("hosting_dashboard_ssl_redirect_to_order", [url]), "hosting.alerts.dashboard");
                    $scope.resetAction();

                    window.open(url, "_blank");
                })
                .catch((err) => {
                    Alerter.alertFromSWS($scope.tr("hosting_dashboard_ssl_redirect_to_order"), err, "hosting.alerts.dashboard");
                });
        }
        $scope.createCertif();
        return rtn;
    };

    $scope.makeOrder = function () {
        $scope.loading.order = true;
        HostingOptionOrder.makeOrder("ssl", $scope.model.duration)
            .then(
                (order) => {
                    Alerter.success($scope.tr("hosting_dashboard_ssl_order_success", [order.url, order.orderId]), "hosting.alerts.dashboard");
                    $window.open(order.url, "_blank");
                },
                (data) => {
                    Alerter.alertFromSWS($scope.tr("hosting_dashboard_ssl_order_error"), data.data, "hosting.alerts.dashboard");
                }
            )
            .finally(() => {
                $scope.resetAction();
            });
    };
});
