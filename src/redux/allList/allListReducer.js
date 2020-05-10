const initState = {
  loading: false,
  allList: [],
  error: "",
};

const allListReducer = (state = initState, action) => {
  switch (action.type) {
    case "ALL_LIST_REQUEST":
      return {
        loading: true,
      };
    case "ALL_LIST_SUCCESS":
      return {
        ...state,
        loading: false,
        allList: action.payload,
        error: "",
      };
    case "ALL_LIST_FAILURE":
      return {
        ...state,
        loading: false,
        allList: [],
        error: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};
