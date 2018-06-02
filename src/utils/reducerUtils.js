export function createReducer(initialState, handlers) {
  return function reducer(state = initialState, action) {
    if (Object.prototype.hasOwnProperty.call(handlers, action.type)) {
      return handlers[action.type](state, action);
    }

    return state;
  };
}

export function updateObject(oldObject, newValues) {
  return {
    ...oldObject,
    ...newValues
  };
}
