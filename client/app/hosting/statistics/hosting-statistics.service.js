angular.module("services").service("HostingStatistics", function ($http, Hosting, OvhHttp, $q) {
    "use strict";

    this.getStatisticsConstants = function () {
        return $q.when({
            types: ["IN_FTP_COMMANDS", "IN_HTTP_HITS", "IN_HTTP_MEAN_RESPONSE_TIME", "OUT_TCP_CONN", "SYS_CPU_USAGE", "SYS_WORKER_SPAWN_OVERLOAD"],
            dbTypes: ["STATEMENT", "STATEMENT_MEAN_TIME"],
            defaultType: "IN_HTTP_HITS",
            periods: ["DAILY", "WEEKLY", "MONTHLY", "YEARLY"],
            defaultPeriod: "WEEKLY",
            aggregateModes: ["ALL", "HTTP_CODE", "NONE"],
            defaultAggregateMode: "HTTP_CODE"
        });
    };

    this.getStatistics = function (serviceName, period, type, aggregation) {
        return OvhHttp.get("/sws/hosting/web/{serviceName}/statistics", {
            rootPath: "2api",
            urlParams: {
                serviceName
            },
            params: {
                period,
                type,
                aggregation
            }
        });
    };
});
