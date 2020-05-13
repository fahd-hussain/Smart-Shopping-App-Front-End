import axios from 'axios'

const cartRequest = () => {
  return {
    type: "CART_REQUEST",
  };
};

const cartSuccess = (data) => {
  return {
    type: "CART_SUCCESS",
    payload: data,
  };
};

const cartFailure = (error) => {
  return {
    type: "CART_FAILURE",
    payload: error,
  };
};

export const updateCart = (data) => dispatch => {
    dispatch(cartRequest())
    return dispatch(cartSuccess(data))
}