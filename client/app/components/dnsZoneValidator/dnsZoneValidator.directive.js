angular.module("directives").directive("zoneNameValidator", [
    "$q",
    "$timeout",
    "newDnsZone",
    function ($q, $timeout, NewDnsZone) {
        "use strict";
        return {
            require: "ngModel",
            link (scope, element, attrs, ngModel) {
                ngModel.$asyncValidators.zoneName = function (modelValue, viewValue) {
                    const value = modelValue || viewValue;
                    if (!value) {
                        return $q.when(true);
                    }

                    const deferred = $q.defer();

                    NewDnsZone.getZoneNameValidation(value).then(
                        (response) => {
                            scope.data[response.details[0].domain] = response;
                            deferred.resolve(response);
                        },
                        (err) => {
                            deferred.reject(err);
                        }
                    );

                    return deferred.promise;
                };
            }
        };
    }
]);
