import axios from "axios";
import baseUrl from "../../constants/baseUrl";

const getUserRequest = () => {
    return {
        type: "GET_USER_REQUEST",
    };
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
    dispatch(getUserRequest());

    const promiseArray = [];

    promiseArray.push(
        new Promise((resolve, reject) => {
            axios(baseUrl + "users/profile", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token,
                },
            })
                .then((res) => {
                    const { _id, username, profilePicture, firstname, lastname, gender } = res.data.user
                    const user = {_id, username, profilePicture, firstname, lastname, gender}
                    // console.log(user)
                    dispatch(getUserSuccess(user));
                    resolve(user)
                })
                .catch((error) => {
                    dispatch(getUserFailure(error));
                    reject(error)
                });
        }),
    );

    return Promise.all(promiseArray)
};
