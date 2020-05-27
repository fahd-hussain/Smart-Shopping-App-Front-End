import axios from "axios";
import baseUrl from "../../constants/baseUrl";

const storeRequest = () => {
    return {
        type: "STORE_REQUEST",
    };
};

const storeSuccess = (store) => {
    return {
        type: "STORE_SUCCESS",
        payload: store,
    };
};

const storeFailure = (error) => {
    return {
        type: "STORE_FAILURE",
        payload: error,
    };
};

export const getStore = () => (dispatch) => {
    dispatch(storeRequest());
    return axios(baseUrl + "store", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((res) => {
            // console.log(res.data);
            const store = [];
            res.data.map(ele => store.push({ name: ele.name, _id: ele._id}))
            // console.log(store)
              dispatch(storeSuccess(store));
        })
        .catch((error) => {
            dispatch(storeFailure(error));
        });
};
