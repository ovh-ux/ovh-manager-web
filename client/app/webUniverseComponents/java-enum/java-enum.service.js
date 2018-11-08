import _ from 'lodash';

export default () => ({
  tr: enumValue => _.snakeCase(enumValue).toUpperCase(),
});
