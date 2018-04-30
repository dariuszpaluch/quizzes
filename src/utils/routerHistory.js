import forEach from 'lodash/forEach';
import qs from 'query-string';

export function parseQuery(query) {
  const result = qs.parse(query, {
    ignoreQueryPrefix: true
  });

  forEach(query, (value, key) => {
    if (!isNaN(value)) {
      result[key] = parseInt(value);
    }
  });

  return result;
}
