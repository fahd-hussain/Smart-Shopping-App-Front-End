const initState = {
    loading: false,
    list: "",
    lists: [],
    error: "",
};

export const listReducer = (state = initState, action) => {
    switch (action.type) {
        case "UPDATE_LIST_SUCCESS":
            return {
                ...state,
                list: action.payload,
            };
        case "FETCH_LISTS_REQUEST":
            return {
                loading: true,
            };
        case "FETCH_LISTS_SUCCESS":
            return {
                ...state,
                loading: false,
                lists: action.payload,
                error: "",
            };
        case "FETCH_LISTS_FAILURE":
            return {
                ...state,
                loading: false,
                lists: [],
                error: action.payload,
            };
        default:
            return state;
    }
};
