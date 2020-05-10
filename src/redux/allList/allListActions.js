import axios from "axios";

const all_list_request = () => {
    return {
        type: "ALL_LIST_REQUEST"
    }
}

const all_list_success = (payload) => {
    return {
        type: "ALL_LIST_SUCCESS",
        payload
    }
}

const all_list_failure = (payload) => {
    return {
        type: "ALL_LIST_FAILURE",
        payload
    }
}