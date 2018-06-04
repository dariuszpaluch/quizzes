import isomorphicFetch from 'isomorphic-fetch';

import LocalStorageSource from 'sources/LocalStorageSource';
import CustomException from '../exceptions/CustomException';

const getResponse = response => {
  const contentType = response.headers.get('content-type');

  if (contentType && contentType.indexOf('application/json') !== -1) {
    return response.json();
  }
  return response.text();
};

function fetch(method, url, { body, header, customResponseHandler, submissionError } = {}) {
  return isomorphicFetch(`${url}`, {
    method,
    body: body && JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
      Authorization: LocalStorageSource.getToken(),
      ...header
    }
  }).then(async response => {
    if (customResponseHandler) return response;

    if (response.status >= 400) {
      if (submissionError) {
        return response.json().then(err => submissionError(err));
      }
      const result = await response.json();

      throw new CustomException(result, response.status);
    } else {
      return getResponse(response);
    }
  });
}

export default {
  get: fetch.bind(null, 'GET'),
  post: fetch.bind(null, 'POST'),
  put: fetch.bind(null, 'PUT'),
  delete: fetch.bind(null, 'DELETE'),
  patch: fetch.bind(null, 'PATCH')
};
