/**
* This does the async request and provides Redux thunk feedback
*/
export function dispatchAsync (promise, dispatch, types, payload) {
    if (typeof dispatch !== 'function') {
      throw new Error('dispatch was not a function. Did you miss an update to the call?');
    }
    const { request, success, failure, cancel } = types;
    dispatch({
      type: request,
      payload: Object.assign({}, payload)
    });
    promise.then(
      response => {
        if (response) {
          dispatch({
            type: success,
            success: true,
            payload: Object.assign({}, payload, { response })
          });
        } else {
          dispatch({
            type: cancel,
            success: false,
            payload: Object.assign({}, payload)
          });
        }
      },
      error => dispatch({
        type: failure,
        success: false,
        payload: Object.assign({}, payload, { error })
      })
    );
  }
  