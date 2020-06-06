// Libraries
import axios from 'axios'

// Local Imports
import baseUrl from '../../constants/baseUrl'

// Global Variables
const url = `${baseUrl}promotions`

const fetchPromotionsLoading = () => ({
    type: "PROMOTIONS_LOADING",
})

const fetchPromotionsFailed = ( errorMessage ) => ({
    type: "PROMOTIONS_FAILED",
    payload: errorMessage
})

const fetchPromotionsSuccess = ( promotions ) => ({
    type: "ADD_PROMOTIONS",
    payload: promotions
})

export const fetchPromotions = () => ( dispatch ) => {
    dispatch(fetchPromotionsLoading())

    const promiseArray = [];

    promiseArray.push(
        new Promise((resolve, reject) => {
            axios(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            })
            .then(res => {
                const temp = [];
                res.data.map( item => {
                    temp.push({ _id: item._id, description: item.description, image: item.image, label: item.label, name: item.name, price: item.price })
                })
                dispatch(fetchPromotionsSuccess(temp))
                resolve(temp)
            })
            .catch(error => {
                dispatch(fetchPromotionsFailed(error))
                reject(error)
            })
        })
    )
    return Promise.all(promiseArray)
}