import isomorphicFetch from 'isomorphic-fetch';

import customException from '../exceptions/CustomException';

export default {
  get: fetch.bind(null, 'GET'),
  post: fetch.bind(null, 'POST'),
  put: fetch.bind(null, 'PUT'),
  delete: fetch.bind(null, 'DELETE'),
  patch: fetch.bind(null, 'PATCH')
};

function fetch(method, url, { body, header, customResponseHandler, submissionError } = {}) {

  return isomorphicFetch(
    `${ url }`,
    {
      method,
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
        token,
        ...header
      },
    }
  ).then(
    async (response) => {
      if (customResponseHandler) return response;

      if (response.status >= 400) {
        if (submissionError) {
          return response.json().then((err) => submissionError(err));
        } else {
          const result = await response.json();

          throw new customException(result, response.status);
        }
      } else {

        return response.json();
      }
    }
  );
}