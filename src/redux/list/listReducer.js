const initState = {
  loading: false,
  list: "",
  error: "",
};

export const listReducer = (state = initState, action) => {
  switch (action.type) {
    case "LIST_REQUEST":
      return {
        ...state,
        loading: true,
      };

    case "LIST_SUCCESS":
      return {
        ...state,
        list: action.payload,
        loading: false,
        error: "",
      };

    case "LIST_FAILURE":
      return {
        ...state,
        error: action.payload,
        list: "",
      };
    default:
      return state;
  }
};
