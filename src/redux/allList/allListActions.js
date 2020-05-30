import axios from "axios";
import baseUrl from "../../constants/baseUrl";

const all_list_request = () => {
    return {
        type: "ALL_LIST_REQUEST",
    };
};

export const all_list_success = (payload) => {
    return {
        type: "ALL_LIST_SUCCESS",
        payload,
    };
};

const all_list_failure = (payload) => {
    return {
        type: "ALL_LIST_FAILURE",
        payload,
    };
};

export const getAllList = (token) => (dispatch) => {
    dispatch(all_list_request);
    return axios(baseUrl + "lists", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": token,
        }
    })
    .then(res => {
        const allList = []
        res.data.map( item => {
            allList.push({ _id: item._id, listItems: item.listItems, name: item.name })
        });
        // console.log(allList)
        // console.log({ _id, listItems, name })
        dispatch(all_list_success(allList))
    })
    .catch(error => {
        dispatch(all_list_failure(error))
    })
};
