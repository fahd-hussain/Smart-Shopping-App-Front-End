import axios from "axios";
import baseUrl from "../../constants/baseUrl";

const getUserRequest = () => {
  return ({
    type: "GET_USER_REQUEST",
  });
};

export const getUserSuccess = (user) => {
  return {
    type: "GET_USER_SUCCESS",
    payload: user,
  };
};

const getUserFailure = (error) => {
  return {
    type: "GET_USER_FAILURE",
    payload: error,
  };
};

export const getUser = (token) => (dispatch) => {
  dispatch(getUserRequest())
  return axios(baseUrl + "users/profile", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": token
    },
  })
    .then((res) => {
      // console.log(res)
      const user = res.data.user;
      dispatch(getUserSuccess(user));
    })
    .catch((error) => {
      dispatch(getUserFailure(error));
    });
};
