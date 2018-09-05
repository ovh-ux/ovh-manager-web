angular.module('services').service(
  'ConverterService',
  class ConverterService {
    constructor(translator) {
      this.translator = translator;

      this.base = 1000;

      this.def = [
        {
          val: 1,
          unit: 'B',
        },
        {
          val: this.base,
          unit: 'KB',
        },
        {
          val: this.base * this.base,
          unit: 'MB',
        },
        {
          val: this.base * this.base * this.base,
          unit: 'GB',
        },
        {
          val: this.base * this.base * this.base * this.base,
          unit: 'TB',
        },
        {
          val: this.base * this.base * this.base * this.base * this.base,
          unit: 'PB',
        },
        {
          val:
            this.base
            * this.base
            * this.base
            * this.base
            * this.base
            * this.base,
          unit: 'EB',
        },
        {
          val:
            this.base
            * this.base
            * this.base
            * this.base
            * this.base
            * this.base
            * this.base,
          unit: 'ZB',
        },
        {
          val:
            this.base
            * this.base
            * this.base
            * this.base
            * this.base
            * this.base
            * this.base
            * this.base,
          unit: 'YB',
        },
      ];
    }

    /**
     * Convert a number into octet
     * @param  {number} nb   Number to convert
     * @param  {string} unit Unit of the number
     * @return {number}      the number converted
     */
    convertToOctet(nb, unit) {
      if (!_.isNumber(Number(nb)) || !_.isString(unit)) {
        throw new Error('Wrong parameter(s)');
      }

      const baseUnit = _.findIndex(this.def, { unit });

      if (baseUnit < 0) {
        throw new Error('Wrong unit given');
      }

      return this.def[baseUnit].val * nb;
    }

    /**
     * Convert a number to its best unit => Now use (filesize)[https://github.com/avoidwork/filesize.js]
     * @param  {number} nb                Number to convert
     * @param  {string} unit              Unit of the number to convert
     * @param  {number} [decimalWanted=0] Number of decimal wanted
     * @return {Object}                   An object composed with the number converted and its unit
     */
    convertBytesSize(nb, unit, decimalWanted = 0) {
      if (
        !_.isNumber(Number(nb))
        || !_.isString(unit)
        || !_.isNumber(decimalWanted)
        || nb <= 0
        || decimalWanted < 0
      ) {
        throw new Error('Wrong parameter(s)');
      }

      let convertedNb;

      try {
        convertedNb = this.convertToOctet(nb, unit);
      } catch (err) {
        throw err;
      }

      const bestUnitIndex = Math.floor(Math.log(convertedNb) / Math.log(this.base));

      convertedNb = `${(convertedNb / this.def[bestUnitIndex].val).toFixed(decimalWanted)}`;
      const bestUnit = this.translator.tr(`unit_size_${this.def[bestUnitIndex].unit}`);

      return {
        val: convertedNb,
        unit: bestUnit,
      };
    }
  },
);
