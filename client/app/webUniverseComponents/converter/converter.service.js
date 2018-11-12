import _ from 'lodash';

export default class {
  constructor($translate, WucConverterFactory) {
    'ngInject';

    this.$translate = $translate;

    this.WucConverterFactory = WucConverterFactory;
  }

  /**
   * Convert a number into octet
   * @param  {number} nb   Number to convert
   * @param  {string} unit Unit of the number
   * @param  {string} system System to use : 'international' or 'binary'
   * @return {number}      the number converted
   */
  convertToOctet(nb, unit, system = 'international') {
    if (!_.isNumber(Number(nb)) || !_.isString(unit)) {
      throw new Error('Wrong parameter(s)');
    }

    const baseUnit = _.findIndex(this.WucConverterFactory[system].units, { unit });

    if (baseUnit < 0) {
      throw new Error('Wrong unit given');
    }

    return this.WucConverterFactory[system].units[baseUnit].val * nb;
  }

  getUnitRange(minUnit, maxUnit, system = 'international') {
    const minIndex = _.findIndex(this.WucConverterFactory[system].units, { unit: minUnit });
    const maxIndex = _.findIndex(this.WucConverterFactory[system].units, { unit: maxUnit });
    if (minIndex > maxIndex) {
      throw new Error('Max unit is lower than min unit');
    }

    return this.WucConverterFactory[system].units.slice(minIndex, maxIndex + 1);
  }
}
