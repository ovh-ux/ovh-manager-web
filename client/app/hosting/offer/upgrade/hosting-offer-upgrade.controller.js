angular.module("App").controller("HostingUpgradeOfferCtrl", ($scope, Alerter, Hosting, User, $rootScope, $stateParams) => {
    "use strict";

    $scope.model = {
        capacity: null,
        duration: null
    };

    $scope.downgradeAgree = {
        value: true
    };

    $scope.availableOffers = [];

    $scope.loading = {
        durations: null,
        availableOffer: true
    };

    $scope.durations = null;

    $scope.agree = {
        value: false
    };

    $scope.orderByOffer = function (offer) {
        return $scope.i18n[`hosting_dashboard_service_offer_${offer}`] || offer;
    };

    User.getUser().then((user) => {
        $scope.ovhSubsidiary = user.ovhSubsidiary;
    });

    /*= =============================
     =            STEP 1           =
     ==============================*/
    $scope.hosting = $scope.currentActionData;

    $scope.getAvailableOffers = function () {
        $scope.loading.availableOffer = true;

        Hosting.getAvailableOffer($scope.hosting ? $scope.hosting.serviceName : $stateParams.productId).then(
            (availableOffer) => {
                $scope.availableOffers = availableOffer;
                $scope.loading.availableOffer = false;
            },
            () => {
                $scope.loading.availableOffer = false;
                $scope.availableOffers = [];
            }
        );
    };

    $scope.onOfferChange = function () {
        $scope.downgradeAgree.value = true;
    };

    /*= =============================
     =            STEP 2            =
     ==============================*/
    $scope.getDurations = function getDurations () {
        $scope.durations = {
            available: [],
            details: {}
        };

        $scope.loading.durations = true;

        Hosting.getUpgradePrices(
            {
                offer: $scope.model.capacity
            },
            $scope.hosting ? $scope.hosting.serviceName : $stateParams.productId
        ).then(
            (durations) => {
                $scope.loading.durations = false;
                $scope.durations.available = durations;

                if (durations.length === 1) {
                    $scope.model.duration = $scope.durations.available[0];
                }
            },
            (err) => {
                $scope.resetAction();
                Alerter.alertFromSWS($scope.tr("hosting_order_upgrade_error"), err, $scope.hosting ? "website.configuration" : "hosting.alerts.dashboard");
            },
            (duration) => {
                $scope.durations.available = duration;
            }
        );
    };

    /*= =============================
     =            STEP 3            =
     ==============================*/
    $scope.loadContracts = function () {
        $scope.agree.value = false;
        if (!$scope.model.duration.contracts || !$scope.model.duration.contracts.length) {
            $rootScope.$broadcast("wizard-goToStep", 4);
        }
    };

    $scope.backToContracts = function () {
        if (!$scope.model.duration.contracts || !$scope.model.duration.contracts.length) {
            $rootScope.$broadcast("wizard-goToStep", 3);
        }
    };

    /*= =============================
     =            STEP 4            =
     ==============================*/

    $scope.getResumePrice = function (price) {
        return price.value === 0 ? $scope.tr("price_free") : $scope.tr("price_ht_label", [price.text]);
    };

    $scope.orderUpgrade = function () {
        $scope.loading.validation = true;

        $scope.resetAction();

        Hosting.orderUpgrade($scope.model.capacity, $scope.model.duration.duration, $scope.hosting ? $scope.hosting.serviceName : $stateParams.productId).then(
            (order) => {
                $scope.loading.validation = false;
                Alerter.success($scope.tr("hosting_order_upgrade_success", [order.url, order.orderId]), $scope.hosting ? "website.configuration" : "hosting.alerts.dashboard");
                window.open(order.url, "_blank");
            },
            (err) => {
                $scope.loading.validation = false;
                Alerter.alertFromSWS($scope.tr("hosting_order_upgrade_error"), err, $scope.hosting ? "website.configuration" : "hosting.alerts.dashboard");
            }
        );
    };
});
