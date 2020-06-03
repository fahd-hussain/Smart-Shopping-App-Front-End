// Libraries
import axios from "axios";

// Local Imports
import baseUrl from "../../constants/baseUrl";

// Global Variables
const url = `${baseUrl}store`

const fetchStoreRequest = () => {
    return {
        type: "STORE_REQUEST",
    };
};

const fetchStoreSuccess = (store) => {
    return {
        type: "STORE_SUCCESS",
        payload: store,
    };
};

const fetchStoreFailure = (error) => {
    return {
        type: "STORE_FAILURE",
        payload: error,
    };
};

export const fetchStore = () => (dispatch) => {
    dispatch(fetchStoreRequest());
    
    const promiseArray = [];

    promiseArray.push(
        new Promise((resolve, reject) => {
            axios(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then((res) => {
                    const store = [];
                    res.data.map((element) => store.push({ name: element.name, _id: element._id }));
                    dispatch(fetchStoreSuccess(store));
                    resolve(store)
                })
                .catch((error) => {
                    dispatch(fetchStoreFailure(error));
                    reject(error)
                });
        })
    )
    return 
};
