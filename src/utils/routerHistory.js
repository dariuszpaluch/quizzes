import forEach from 'lodash/forEach';
import qs from 'query-string';

export function getQueryFromHistory(history) {
  const query = qs.parse(history.location.search) || {};

  forEach(query, (value, key) => {
    if(!isNaN(value)) {
      query[key] = parseInt(value);
    }
  });

  return query;
}