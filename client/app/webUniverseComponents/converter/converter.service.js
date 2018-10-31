import _ from 'lodash';

export default class {
  constructor($translate) {
    'ngInject';

    this.$translate = $translate;

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
}
