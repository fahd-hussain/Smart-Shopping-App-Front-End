const initState = {
    loading: false,
    store: "",
    error: "",
};

export const storeReducer = (state = initState, action) => {
    switch (action.type) {
        case "STORE_REQUEST":
            return {
                ...state,
                loading: true,
            };

        case "STORE_SUCCESS":
            return {
                ...state,
                store: action.payload,
                loading: false,
                error: "",
            };

        case "STORE_FAILURE":
            return {
                ...state,
                error: action.payload,
                store: "",
            };
        default:
            return state;
    }
};
