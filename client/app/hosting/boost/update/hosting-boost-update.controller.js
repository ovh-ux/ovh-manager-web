angular
  .module('App')
  .controller(
    'HostingBoostOfferUpdateCtrl',
    ($scope, HostingBoost, Alerter) => {
      $scope.product = $scope.currentActionData.product;
      $scope.models = { boostOffer: null };
      $scope.acceptCGV = { value: false };

      $scope.loaders = {
        request: false,
      };

      $scope.isStepValid = () => $scope.acceptCGV.value === true
        && angular.isObject($scope.models.boostOffer);

      $scope.updateBoost = () => {
        $scope.loaders.request = true;

        HostingBoost.requestBoost({
          serviceName: $scope.product.serviceName,
          offer: $scope.models.boostOffer.offer,
        })
          .then(() => {
            Alerter.success(
              $scope.tr('hosting_tab_BOOST_update_activation'),
              $scope.alerts.main,
            );
          })
          .catch((err) => {
            Alerter.alertFromSWS(
              $scope.tr('hosting_tab_BOOST_update_error'),
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
