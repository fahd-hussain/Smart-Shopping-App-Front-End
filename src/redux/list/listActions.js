import axios from 'axios'

const listRequest = () => {
  return {
    type: "LIST_REQUEST",
  };
};

const listSuccess = (data) => {
  return {
    type: "LIST_SUCCESS",
    payload: data,
  };
};

const listFailure = (error) => {
  return {
    type: "LIST_FAILURE",
    payload: error,
  };
};

export const updateList = (data) => dispatch => {
    dispatch(listRequest())
    return dispatch(listSuccess(data))
}