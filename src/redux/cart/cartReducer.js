const initState = {
    loading: false,
    cart: [],
    allCarts: [],
    error: "",
};

export const cartReducer = (state = initState, action) => {
    switch (action.type) {
        case "CART_UPDATE":
            return {
                ...state,
                cart: action.payload,
                loading: false,
                error: "",
            };

        case "FETCH_CART_REQUEST":
            return {
                ...state,
                loading: true,
            };
        case "FETCH_CART_SUCCESS":
            return {
                ...state,
                allCarts: action.payload,
                cart: [],
                error: ""
            };
        case "FETCH_CART_FAILURE":
            return {
                ...state,
                error: action.payload,
                allCarts: []
            };
        default:
            return state;
    }
};
