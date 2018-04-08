import keys from 'lodash/keys';
import get from 'lodash/get';

export default function parsePath(path, params = {}) {
  let parsedPath = get(path, ['index']) || path;

  keys(params).forEach((key) => {
    parsedPath = parsedPath.replace(new RegExp(`:${ key }`, 'g'), params[key]);
  });

  parsedPath = parsedPath.replace(/:\w+/g, '');
  parsedPath = parsedPath.replace(/\(\/\)/g, '');
  parsedPath = parsedPath.replace(/\(|\)/g, '');
  parsedPath = parsedPath.replace(/\/\//g, '/');

  return parsedPath;
}