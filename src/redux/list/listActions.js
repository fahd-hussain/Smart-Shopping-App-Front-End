// Libraries
import axios from "axios";

// Local Imports
import baseUrl from '../../constants/baseUrl';

// Global Variables
const url = `${baseUrl}lists`;

const updateListSuccess = (data) => {
    return {
        type: "UPDATE_LIST_SUCCESS",
        payload: data,
    };
};

const fetchListsRequest = () => {
    return {
        type: "FETCH_LISTS_REQUEST",
    };
};

const fetchListsSuccess = (payload) => {
    return {
        type: "FETCH_LISTS_SUCCESS",
        payload,
    };
};

const fetchListsFailure = (payload) => {
    return {
        type: "FETCH_LISTS_FAILURE",
        payload,
    };
};

export const updateList = (data) => (dispatch) => {
    return dispatch(updateListSuccess(data));
};

export const fetchLists = (token) => (dispatch) => {
    dispatch(fetchListsRequest);

    const promiseArray = []

    promiseArray.push(
      new Promise((resolve, reject) => {
        axios(url, {
          method: "GET",
          headers: {
              "Content-Type": "application/json",
              Authorization: token,
          },
      })
          .then((res) => {
              const Lists = [];
              res.data.map((item) => {
                  Lists.push({ _id: item._id, listItems: item.listItems, name: item.name });
              });
              dispatch(fetchListsSuccess(Lists));
              resolve(Lists)
          })
          .catch((error) => {
              dispatch(fetchListsFailure(error));
              reject(error)
          });
      })
    )
    return Promise.all(promiseArray)
};
