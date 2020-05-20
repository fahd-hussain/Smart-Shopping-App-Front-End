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
const emptyCartSuccess = () => {
  return {
    type: "CART_SUCCESS",
    payload: [],
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

export const emptyCart = () => dispatch => {
  dispatch(cartRequest())
  return dispatch(emptyCartSuccess())
}