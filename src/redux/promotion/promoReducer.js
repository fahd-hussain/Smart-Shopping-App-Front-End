const initState = {
    isLoading: true,
    errorMessage: null,
    promotions: []
}

export const promoReducer = ( state = initState, action) => {
    switch ( action.type ){
        case "ADD_PROMOTIONS":
            return { 
                ...state,
                isLoading: false,
                errorMessage: null,
                promotions: action.payload
            }
        
        case "PROMOTIONS_LOADING":
            return {
                ...state,
                isLoading: true,
                errorMessage: null,
                promotions: []
            }
        case "PROMOTIONS_FAILED":
            return {
                ...state,
                isLoading: false,
                errorMessage: action.payload,
                promotions: []
            }
        default:
            return state
    }
}