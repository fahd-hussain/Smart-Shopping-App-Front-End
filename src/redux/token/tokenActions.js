import axios from "axios";
import baseUrl from "../../constants/baseUrl";
import { getUserSuccess, getUser } from '../user/userActions'
import { all_list_success } from '../allList/allListActions'

const tokenRequest = () => {
  return {
    type: "TOKEN_REQUEST",
  };
};

const tokenSuccess = (token) => {
  return {
    type: "TOKEN_SUCCESS",
    payload: token,
  };
};

const tokenFailure = (error) => {
  return {
    type: "TOKEN_FAILURE",
    payload: error,
  };
};

export const getToken = (username, password, callback) => (dispatch) => {
  dispatch(tokenRequest());
  // callback()
  return axios(baseUrl + "users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify({ username, password }),
  })
    .then((res) => {
      const token = "Bearer " + res.data.token;
      dispatch(tokenSuccess(token));
      dispatch(getUser(token))
    })
    .catch((error) => {
      dispatch(tokenFailure(error));
    });
};

// --------------------------------------------------------------------------- //

export const setToken = (username, password, firstname, lastname, gender) => (dispatch) => {
  dispatch(tokenRequest());
  return axios(baseUrl + "users/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify({ username, password, firstname, lastname, gender}),
  })
    .then((res) => {
      const token = "Bearer " + res.data.token;
      console.log(res)
      dispatch(tokenSuccess(token));
      dispatch(getUser(token))
    })
    .catch((error) => {
      dispatch(tokenFailure(error));
    });
};

// --------------------------------------------------------------------------- //

export const removeToken = () => (dispatch) => {
  dispatch(tokenRequest());
  return axios(baseUrl + "users/logout", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      const token = res.data.token;
      console.log(token)
      dispatch(tokenSuccess(token));
      dispatch(getUserSuccess(null));
      dispatch(all_list_success(null))
    })
    .catch((error) => {
      dispatch(tokenFailure(error));
    });
};