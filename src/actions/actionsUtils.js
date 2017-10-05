export const storeAction = (type, payload = {}, data = {}, error = false, hash) => {
  return {
    type,
    data,
    hash,
    error,
    ...payload
  }
};

const firedAction = (actionType, payload, data = {}) => {
  return storeAction(`${ actionType }_REQUEST`, payload, data);
};

const receivedData = (actionType, payload, data, hash) => {
  return storeAction(`${ actionType }_SUCCESS`, payload, data, false, hash);
};

const receivedError = (actionType, payload, error, hash) => {
  return storeAction(`${ actionType }_FAILURE`, payload, error, true, hash);
};

const dispatchResponse = (dispatch, resolve, actionType, payload, data, hash) => {
  dispatch(receivedData(actionType, payload, data, hash));
  if (resolve)
    resolve(data);
};

export const dispatchPromiseResult = (dispatch, {
  actionType,
  promise,
  resolve,
  reject,
  hash,
  payload,
  toastr = {},
}) => {
  dispatch(firedAction(actionType, payload));

  return promise()
    .then(
      response => {
        dispatchResponse(dispatch, resolve, actionType, payload, response, hash, toastr.resolve);

      },
      error => {

        dispatch(receivedError(actionType, payload, error, hash, toastr.reject));

        if (reject)
          reject(error);
      }
    )
};