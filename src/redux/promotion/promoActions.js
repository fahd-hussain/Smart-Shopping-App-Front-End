import axios from 'axios'

const promotionsLoading = () => ({
    type: "PROMOTIONS_LOADING",
})

const promotionsFailed = ( errorMessage ) => ({
    type: "PROMOTIONS_FAILED",
    payload: errorMessage
})

const addPromotions = ( promotions ) => ({
    type: "ADD_PROMOTIONS",
    payload: promotions
})

export const fetchPromotions = () => ( dispatch ) => {
    dispatch(promotionsLoading())

    return axios(baseUrl + "promotions", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    })
    .then(res => {
        const promos = res.data
        // console.log(res.data)
        dispatch(addPromotions(promos))
    })
    .catch(error => {
        dispatch(promotionsFailed(error))
    })
}