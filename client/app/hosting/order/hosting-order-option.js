angular.module("services").service("HostingOptionOrder", function ($http, $q, $stateParams, constants, Hosting, OvhHttp) {
    "use strict";

    const swsHostingOrderProxyPath = `${constants.swsProxyRootPath}order/hosting/web`;

    /*
     *  Check if sql perso can be ordered
     */
    this.isOptionOrderable = function (option) {
        return Hosting.getSelected($stateParams.productId).then((hosting) =>
            $http.get([swsHostingOrderProxyPath, hosting.serviceName].join("/")).then((response) => !!(response && response.data && response.data.length && response.data.indexOf(option) !== -1), () => false)
        );
    };

    /**
     *  Get order enums
     */
    this.getOrderEnums = function (model) {
        return $http.get(`${constants.swsProxyRootPath}order.json`, { cache: true }).then(
            (response) => {
                if (response.data && response.data.models) {
                    return model ? response.data.models[model].enum : response.data.models;
                }
                return [];
            },
            () => []
        );
    };

    /**
     *  Get sql perso duration for offer
     */
    this.getOrderDurations = function (option, params) {
        return Hosting.getSelected($stateParams.productId).then((hosting) =>
            $http.get([swsHostingOrderProxyPath, hosting.serviceName, option].join("/"), { params }).then((response) => response && response.data && response.data.length ? response.data : [], (http) => $q.reject(http))
        );
    };

    /**
     *  Get order details for given duration and option (extraSqlPerso, ...)
     */
    this.getOrderDetailsForDuration = function (option, duration, params) {
        return Hosting.getSelected($stateParams.productId).then((hosting) =>
            $http.get([swsHostingOrderProxyPath, hosting.serviceName, option, duration].join("/"), { params }).then((response) => response && response.data ? response.data : {}, (http) => $q.reject(http))
        );
    };

    this.makeOrder = function (option, duration, params) {
        return Hosting.getSelected($stateParams.productId).then((hosting) =>
            $http.post([swsHostingOrderProxyPath, hosting.serviceName, option, duration].join("/"), params).then((response) => response && response.data ? response.data : {}, (http) => $q.reject(http))
        );
    };

    this.getSqlPersoAllowedDurations = function (serviceName, version) {
        return OvhHttp.get(`/order/hosting/web/${serviceName}/extraSqlPerso`, {
            rootPath: "apiv6",
            params: {
                offer: version
            }
        });
    };

    this.getSqlPersoPrice = function (serviceName, version, duration) {
        return OvhHttp.get("/order/hosting/web/{serviceName}/extraSqlPerso/{duration}", {
            rootPath: "apiv6",
            urlParams: { serviceName, duration },
            params: {
                offer: version
            }
        });
    };

    this.orderSqlPerso = function (serviceName, version, duration) {
        return OvhHttp.post("/order/hosting/web/{serviceName}/extraSqlPerso/{duration}", {
            rootPath: "apiv6",
            urlParams: { serviceName, duration },
            data: {
                offer: version
            }
        });
    };
});
