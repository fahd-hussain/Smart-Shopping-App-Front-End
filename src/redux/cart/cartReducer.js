const initState = {
  loading: false,
  cart: "",
  error: "",
};

export const cartReducer = (state = initState, action) => {
  switch (action.type) {
    case "CART_REQUEST":
      return {
        ...state,
        loading: true,
      };

    case "CART_SUCCESS":
      return {
        ...state,
        cart: action.payload,
        loading: false,
        error: "",
      };

    case "CART_FAILURE":
      return {
        ...state,
        error: action.payload,
        cart: "",
      };
    default:
      return state;
  }
};
