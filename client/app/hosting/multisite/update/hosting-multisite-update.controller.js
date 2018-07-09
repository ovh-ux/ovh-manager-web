angular.module('App').controller('HostingDomainModifyCtrl', ($scope, $stateParams, HostingDomain, Hosting, HostingRuntimes, Alerter, Domain, User, $q) => {
  $scope.selectedOptions = {};

  const domainFromMultisite = _($scope.currentActionData).clone();

  $scope.selected = {
    domain: domainFromMultisite,
    domainWwwNeeded: false,
    domainWww: null,
    pathFinal: null,
    ipv6: domainFromMultisite.ipV6Enabled,
    ssl: domainFromMultisite.rawSsl,
    runtime: domainFromMultisite.runtime,
  };

  if ($scope.selected.domain.ownLog) {
    $scope.selected.ownLogDomain = {
      name: $scope.selected.domain.ownLog,
    };

    $scope.selected.domain.ownLog = 'ACTIVE';
  } else {
    $scope.selected.domain.ownLog = 'NONE';
  }

  $scope.model = {
    domains: null,
    runtimes: [],
  };

  $scope.loading = {
    runtimes: false,
  };

  $scope.classes = {
    homeInvalid: '',
  };

  $scope.$watch('selected.domain.path', () => {
    if ($scope.selected.domain.path) {
      $scope.classes.homeInvalid = $scope.isPathValid() ? '' : 'error';
    } else {
      $scope.classes.homeInvalid = '';
    }
  });

  $scope.domainsAlreadyExists = function () {
    if ($scope.model.domains && $scope.model.domains.indexOf(`www.${$scope.selected.domain.name}`) !== -1) {
      return true;
    }
    return false;
  };

  $scope.isPathValid = function () {
    return Hosting.constructor.isPathValid($scope.selected.domain.path);
  };

  function isCountryIp(countryIps, recordIdsData) {
    let target = 'FR';

    if (_.find(countryIps, countryIp => countryIp.country === $scope.userInfos.ovhSubsidiary)) {
      target = $scope.userInfos.ovhSubsidiary;
    }

    _.forEach(countryIps, (country) => {
      const countryFound = _.find(recordIdsData, record => country.ip === record.target && country.country !== target);

      if (countryFound) {
        $scope.selected.domain.ipLocation = country;

        if ($scope.selected.domain.ipLocation !== '') {
          $scope.selectedOptions.ipLocation = true;
        }
      }
    });
  }

  $scope.loadStep1 = function () {
    const subDomainName = $scope.getSelectedDomainToDisplay().replace(`.${$scope.hosting.serviceName}`, '');

    if ($scope.getSelectedDomainToDisplay().match(/^www\..*/)) {
      $scope.selected.domainWww = $scope.selected.domain.displayName;
    } else {
      $scope.selected.domainWww = ['www', $scope.selected.domain.displayName].join('.');
    }

    return HostingDomain
      .getExistingDomains($stateParams.productId, false)
      .then((data) => {
        $scope.model.domains = data.existingDomains;
      })
      .then(() => User.getUser())
      .then((user) => {
        $scope.userInfos = user;
      })
      .then(() => Hosting.getSelected($stateParams.productId))
      .then((hosting) => {
        $scope.hosting = hosting;

        if (hosting.isCloudWeb) {
          // Load runtimes configuration
          return HostingRuntimes
            .list($scope.hosting.serviceName)
            .then((runtimes) => {
              $scope.loading.runtimes = true;

              const promises = _(runtimes)
                .map(runtimeId => HostingRuntimes
                  .get($scope.hosting.serviceName, runtimeId)
                  .then((runtime) => {
                    $scope.model.runtimes.push(runtime);

                    return runtime;
                  }))
                .value();

              return $q.all(promises);
            })
            .then(() => {
              $scope.loading.runtimes = false;
            })
            .catch((err) => {
              Alerter.alertFromSWS($scope.tr('hosting_tab_DOMAINS_configuration_add_loading_error'), _.get(err, 'data', err), $scope.alerts.main);

              $scope.resetAction();
            });
        }

        return null;
      })
      .then(() => HostingDomain.getIPv6Configuration($scope.hosting.serviceName, $scope.selected.domain.name.replace(`.${$scope.hosting.serviceName}`, '')))
      .then((records) => {
        $scope.selected.domain.ipV6Enabled = _.some(records, record => $scope.hosting.clusterIpv6 === record.target);

        if ($scope.selected.domain.ipV6Enabled) {
          $scope.selected.domain.ipLocation = '';
          $scope.selected.domain.ipV6Enabled = true;
        }
      })
      .then(() => HostingDomain.getAddDomainOptions($stateParams.productId))
      .then((options) => {
        $scope.availableDomains = options.availableDomains;
      })
      .then(() => Domain.getRecordsIds($stateParams.productId, {
        fieldType: 'A',
        subDomain: subDomainName,
      }))
      .then((recordIds) => {
        const recordsPromises = _(recordIds).map(recordId => Domain.getRecord($stateParams.productId, recordId)).value();

        return $q.all(recordsPromises);
      })
      .then((recordIdsData) => {
        $scope.selected.domain.ipLocation = null;
        isCountryIp($scope.hosting.countriesIp, recordIdsData);
      })
      .catch((err) => {
        $scope.resetAction();
        Alerter.alertFromSWS($scope.tr('hosting_tab_DOMAINS_configuration_add_loading_error'), _.get(err, 'data', err), $scope.alerts.main);
      })
      .finally(() => {
        if ($scope.hosting.hasCdn && $scope.selected.domain.cdn !== 'NONE') {
          $scope.selected.domain.cdn = 'ACTIVE';
        }

        if ($scope.selected.ssl) {
          $scope.selected.domain.ssl = true;
        }
      });
  };

  $scope.getSelectedDomain = function (wwwNeeded) {
    let result = '';
    if (wwwNeeded) {
      result = $scope.selected.domainWww;
    } else {
      result = $scope.selected.domain.name;
    }
    return result;
  };

  $scope.getSelectedDomainToDisplay = function (wwwNeeded) {
    let result = '';
    if (wwwNeeded) {
      result = $scope.selected.domainWww;
    } else {
      result = $scope.selected.domain.displayName;
    }
    return result;
  };

  $scope.needWwwDomain = function () {
    return $scope.selected.domainWwwNeeded && $scope.selected.domain.name !== $scope.selected.domainWww && $scope.domainsAlreadyExists();
  };

  $scope.loadStep2 = function () {
    $scope.selected.pathFinal = $scope.getSelectedPath();
  };

  $scope.getSelectedPath = function () {
    let home;
    if ($scope.selected.domain.path !== null) {
      if (/^\/.*/.test($scope.selected.domain.path) || /^\.\/.*/.test($scope.selected.domain.path)) {
        home = $scope.selected.domain.path;
      } else {
        home = `./${$scope.selected.domain.path}`;
      }
    }
    return home;
  };

  const resultMessages = {
    OK: $scope.tr('hosting_tab_DOMAINS_configuration_modify_success'),
    PARTIAL: $scope.tr('hosting_tab_DOMAINS_configuration_modify_partial'),
    ERROR: $scope.tr('hosting_tab_DOMAINS_configuration_modify_failure'),
  };

  $scope.submit = function () {
    $scope.resetAction();

    HostingDomain.modifyDomain(
      $scope.selected.domain.name,
      $scope.selected.pathFinal,
      $scope.selected.domainWwwNeeded,
      $scope.selected.domain.ipV6Enabled,
      $scope.selected.domain.cdn,
      $scope.selected.domain.ipLocation,
      $scope.selected.domain.firewall,
      $scope.selected.domain.ownLog === 'ACTIVE' ? $scope.selected.ownLogDomain.name : null,
      !!$scope.selected.domain.ssl, // mandatory because it could be 0, 1, 2 or true/false
      _($scope.selected).get('runtime.id', null),
      $stateParams.productId,
    )
      .then((data) => {
        Alerter.alertFromSWSBatchResult(resultMessages, data, $scope.alerts.main);
      })
      .catch((err) => {
        _.set(err, 'type', err.type || 'ERROR');
        Alerter.alertFromSWS($scope.tr('hosting_tab_DOMAINS_configuration_modify_failure'), _.get(err, 'data', err), $scope.alerts.main);
      });
  };
});
