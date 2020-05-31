import axios from "axios";
import baseUrl from "../../constants/baseUrl";
import { getUserSuccess, getUser } from "../user/userActions";
import { all_list_success } from "../allList/allListActions";

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

export const getToken = (username, password) => (dispatch) => {
    dispatch(tokenRequest());

    const promiseArray = [];

    promiseArray.push(
        new Promise((resolve, reject) => {
            axios(baseUrl + "users/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                data: JSON.stringify({ username, password }),
            })
                .then((res) => {
                    const token = "Bearer " + res.data.token;
                    dispatch(tokenSuccess(token));
                    setTimeout(() => {
                        resolve(token);
                    }, 1000);
                })
                .catch((error) => {
                    dispatch(tokenFailure(error));
                    reject(error)
                });
        }),
    );

    return Promise.all(promiseArray);
};

// --------------------------------------------------------------------------- //

export const setToken = (username, password, firstname, lastname, gender) => (dispatch) => {
    dispatch(tokenRequest());

    const promiseArray = [];

    promiseArray.push(
        new Promise((resolve, reject) => {
            axios(baseUrl + "users/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                data: JSON.stringify({ username, password, firstname, lastname, gender }),
            })
                .then((res) => {
                    const token = "Bearer " + res.data.token;
                    dispatch(tokenSuccess(token));
                    resolve(token)
                })
                .catch((error) => {
                    dispatch(tokenFailure(error));
                    reject(error)
                });
        }),
    );

    return Promise.all(promiseArray);
};

// --------------------------------------------------------------------------- //

export const removeToken = () => (dispatch) => {
    dispatch(tokenRequest());

    const promiseArray = [];

    promiseArray.push(
        new Promise((resolve, reject) => {
          axios(baseUrl + "users/logout", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then(() => {
                dispatch(tokenSuccess(null));
                resolve("done")
            })
            .catch((error) => {
                dispatch(tokenFailure(error));
                reject(error)
            });
        })
    )
    
    return Promise.all(promiseArray)
};
