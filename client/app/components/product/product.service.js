
angular.module('services').service('Products', [
  '$rootScope',
  '$http',
  '$q',
  'constants',
  '$stateParams',
  'AllDom',
  'Emails',
  function productServices($rootScope, $http, $q, constants, $stateParams, AllDom, Emails) {
    let products = null;
    let productsByType = null;
    let selectedProduct = {
      name: '',
      organization: '',
      type: '',
    };

    const requests = {
      productsList: null,
    };

    function resetCache() {
      products = null;
      productsByType = null;
      requests.productsList = null;
    }

    /*
       * get product by SWS
       */
    this.getProducts = function getProducts(forceRefresh) {
      if (forceRefresh === true) {
        resetCache();
      }
      return $q
        .when(true)
        .then(() => {
          if (!products) {
            if (requests.productsList === null) {
              requests.productsList = $q
                .all([
                  $http.get('/sws/products', {
                    serviceType: 'aapi',
                    params: {
                      universe: constants.universe || 'WEB',
                      worldPart: constants.target,
                    },
                  }),
                  AllDom.getAllDoms(true),
                  Emails.getDelegatedEmails(),
                ])
                .then((data) => {
                  const result = data[0];
                  const allDoms = data[1];

                  if (result.status < 300) {
                    productsByType = result.data;

                    _.forEach(data[2], (email) => {
                      const splitted = email.split('@');
                      if (splitted.length >= 2) {
                        if (_.find(productsByType.emails, { name: splitted[1] }) == null) {
                          const domain = splitted[1];
                          productsByType.emails.push({
                            displayName: domain,
                            hasSubComponent: false,
                            name: domain,
                            type: 'EMAIL_DELEGATE',
                            delegate: true,
                          });
                        }
                      }
                    });

                    /* Exchange 25g */
                    if (productsByType
                        && productsByType.platforms
                        && productsByType.platforms.length) {
                      // 1. Remove all occurances and put them in other var
                      let exchangeOld = _.remove(productsByType.platforms, a => a.type === 'EXCHANGE_OLD');
                      if (exchangeOld && exchangeOld.length) {
                        // 2. Merge all domain to an uniq array
                        exchangeOld = _.uniq(exchangeOld, a => a.name);

                        // 3. Push to products array
                        productsByType.platforms = productsByType.platforms.concat(exchangeOld);
                      }
                    }

                    if (!products) {
                      products = [];
                    }

                    const allDomains = _.pluck(productsByType.domains, 'name');
                    const allDomainsOnly = _.pluck(productsByType.domains.filter(x => x.type === 'DOMAIN'), 'name');
                    const allZones = _.pluck(productsByType.domains.filter(x => x.type === 'ZONE' && allDomainsOnly.indexOf(x.name) === -1), 'name');
                    let productDomains = allDomains;

                    if (allDoms && allDoms.length > 0) {
                      productsByType.allDoms = [];
                      return $q
                        .allSettled(allDoms.map(allDom => AllDom.getDomains(allDom).then(
                          (domains) => {
                            productDomains = productDomains.filter(d => domains.indexOf(d) === -1);

                            productsByType.allDoms.push({
                              name: allDom,
                              displayName: allDom,
                              hasSubComponent: true,
                              type: 'ALL_DOM',
                              subProducts: _.intersection(allDomains, domains).map(d => ({
                                name: d,
                                displayName: d,
                                allDomName: allDom,
                                allDomZoneOnly: allZones.indexOf(d) !== -1,
                                type: allZones.indexOf(d) !== -1 ? 'ZONE' : 'ALL_DOM',
                              })),
                            });
                          },
                          err => ({ error: err, allDom }),
                        )))
                        .then(() => {
                          if (productsByType.allDoms.length > 0) {
                            const d = productsByType.domains
                              .filter(domain => productDomains.indexOf(domain.name) !== -1);

                            productsByType.domains = productsByType.allDoms
                              .concat(_.sortBy(d, elt => elt.name));
                          }

                          ['domains', 'hostings', 'exchanges', 'sharepoints', 'vps', 'cdns', 'emails', 'licenseOffice', 'allDoms', 'emailPros'].forEach((type) => {
                            products = products.concat(productsByType[type] || []);
                          });

                          return products;
                        });
                    }

                    ['domains', 'hostings', 'exchanges', 'sharepoints', 'vps', 'cdns', 'emails', 'licenseOffice', 'emailPros'].forEach((type) => {
                      products = products.concat(productsByType[type] || []);
                    });

                    return products;
                  }
                  return $q.reject(data);
                });
            }

            return requests.productsList;
          }
          return products;
        })
        .then(() => products, reason => $q.reject(reason));
    };

    /*
       * Get list of products orderBy Type
       */
    this.getProductsByType = function getProductsByType() {
      return this.getProducts().then(() => productsByType);
    };

    /*
       * Get the selected product
       */
    this.getSelectedProduct = function getSelectedProduct(forceRefresh) {
      function currentProductMatchesSelectedProduct(currentProduct) {
        return currentProduct.name === selectedProduct.name
          && currentProduct.type === selectedProduct.type;
      }

      if (forceRefresh) {
        selectedProduct = {
          name: '',
          organization: '',
          type: '',
        };
      }

      return this.getProducts(forceRefresh)
        .then((productsList) => {
          const noCurrentlySelectedProduct = _(selectedProduct.name).isEmpty();

          if (noCurrentlySelectedProduct) {
            const currentStateProductId = _($stateParams).get('productId', '');

            if (_(currentStateProductId).isEmpty()) {
              return {
                name: '',
                organization: '',
                type: '',
              };
            }

            selectedProduct.name = currentStateProductId;
            selectedProduct.type = _($rootScope).get('currentSectionInformation', '').toUpperCase();
            selectedProduct.organization = _($stateParams).get('organization', '');
          }

          let productMatchingSelectedProduct = null;

          _(productsList).forEach((product) => {
            if (currentProductMatchesSelectedProduct(product)) {
              productMatchingSelectedProduct = product;
              return false;
            }

            if (product.hasSubComponent) {
              _(product.subProducts).forEach((subProduct) => {
                if (currentProductMatchesSelectedProduct(subProduct)) {
                  productMatchingSelectedProduct = subProduct;
                  return false;
                }

                return true;
              }).value();
            }

            return true;
          }).value();

          return productMatchingSelectedProduct;
        });
    };

    /*
       * set the selected product by Id
       */
    this.setSelectedProduct = function setSelectedProduct(product) {
      if (product) {
        if (angular.isString(product)) {
          selectedProduct.name = product;
        } else if (angular.isObject(product)) {
          if (product.name === '' && product.type === '') {
            selectedProduct = product;
          } else {
            selectedProduct.name = product.name;
            selectedProduct.type = product.type;
          }
        }
      }

      return this.getSelectedProduct().then((p) => {
        selectedProduct.type = p.type;
        $rootScope.$broadcast('changeSelectedProduct', p);
        return p;
      });
    };

    /*
       * set the selected product by Id
       */
    this.removeSelectedProduct = function removeSelectedProduct() {
      return this.setSelectedProduct({
        name: '',
        type: '',
      }).then((p) => {
        $rootScope.$broadcast('removeSelectedProduct');
        return p;
      });
    };

    /**
       * Get working-status for the specified product
       */
    this.getWorks = function getWorks(product) {
      return $http.get(`${constants.aapiRootPath}working-status/${product}`).then(resp => resp.data);
    };

    this.getProducts(true);
  },
]);
