angular
  .module('App')
  .controller(
    'HostingBoostOfferRequestCtrl',
    ($scope, HostingBoost, Alerter) => {
      $scope.product = $scope.currentActionData.product;
      $scope.models = { boostOffer: null };
      $scope.acceptCGV = { value: false };

      $scope.loaders = {
        request: false,
      };

      $scope.isStepValid = () => $scope.acceptCGV.value === true
        && angular.isObject($scope.models.boostOffer);

      $scope.requestBoost = () => {
        $scope.loaders.request = true;

        HostingBoost.requestBoost({
          serviceName: $scope.product.serviceName,
          offer: $scope.models.boostOffer.offer,
        })
          .then(() => {
            Alerter.success(
              $scope.tr('hosting_tab_BOOST_request_activation'),
              $scope.alerts.main,
            );
          })
          .catch((err) => {
            Alerter.alertFromSWS(
              $scope.tr('hosting_tab_BOOST_request_error'),
              _.get(err, 'data', err),
              $scope.alerts.main,
            );
          })
          .finally(() => {
            $scope.loaders.request = false;
            $scope.resetAction();
          });
      };
    },
  );
