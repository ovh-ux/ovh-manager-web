angular.module('filters').filter('duration', [
  '$translate',
  '$filter',
  ($translate, $filter) => {
    const unitHash = {
      m: 'month',
      d: 'day',
      j: 'day',
      y: 'year',
      a: 'year',
    };
    const simpleDurationReg = /(^[0-9]+)([mdjya]?)$/;
    const upto = /^upto/;
    const uptoDuration = /(^upto-)([0-9]{4}-[0-9]{2}-[0-9]{2}?$)/;
    const engage = /(^engage)([0-9]+)([mdjya]?)$/;

    return (duration, dateFormat) => {
      let d;
      let unit;

      if (simpleDurationReg.test(duration)) {
        d = +duration.match(simpleDurationReg)[1];
        unit = unitHash[duration.match(simpleDurationReg)[2] || 'm'];
        return d > 1 ? $translate.instant(`${unit}_other`, {
          t0: d,
        }) : $translate.instant(`${unit}_1`);
      }
      if (upto.test(duration)) {
        if (uptoDuration.test(duration)) {
          [, , d] = duration.match(uptoDuration);
          return $translate.instant('upto', { t0: dateFormat ? $filter('date')(d, dateFormat) : d });
        }
        return $translate.instant('uptofirstdaynextmonth');
      }
      if (engage.test(duration)) {
        d = +duration.match(engage)[2];
        unit = unitHash[duration.match(engage)[3] || 'm'];
        return $translate.instant('engage', {
          t0: d > 1 ? $translate.instant(`${unit}_other`, {
            t0: d,
          }) : $translate.instant(`${unit}_1`),
        });
      }
      return duration;
    };
  },
]);
