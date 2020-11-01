import axios from 'axios'

//==================================================================================
//         Para traer todas las reviews  (console.log para verificar si llego bien..DESPUES SACAR)
//==================================================================================

export function getReviews(){
    return axios
    .get(`http://localhost:3001/reviews`)
    .then(data => data
    )
    .catch(error => console.log(error))
}

//==================================================================================
//     Para traer todas las reviews de un producto (console.log para verificar si llego bien..DESPUES SACAR)
//==================================================================================

export function getReviewsProd (id){
    return axios
    .get(`http://localhost:3001/product/${id}/reviews`)
    .then(reviews=>{
        let prom = 0;
        reviews.data.map(review=>{
               return  prom = prom + review.value
            })
            prom = Math.floor(prom / reviews.data.length)
        return {
            reviews: reviews.data,
            promedio : prom
        }
    })
    .catch(error => console.log(error))
}

//==================================================================================
//         Para crear reviews  (console.log para verificar si llego bien...DESPUES SACAR)
//==================================================================================

export function addReviews(id, newReviews){
    axios.post(`http://localhost:3001/product/${id}/reviews/add`, newReviews)
    .then(data => data
    )
    .catch(error => {
        console.log(error);
    })
}

//==================================================================================
//     Para borrar reviews po ID (console.log para verificar si llego bien..DESPUES SACAR)
//==================================================================================

export function deleteReviews (id){
    axios
    .delete(`http://localhost:3001/reviews/${id}`)
    .then(data => data
    )
    .catch(error => {
        console.log(error);
    })
}

//==================================================================================
//     Para modificar reviews po ID (console.log para verificar si llego bien..DESPUES SACAR)
//==================================================================================

export function modifyReviews (id, reviews){
    axios
    .put(`http://localhost:3001/reviews/${id}`, reviews)
    .then(data => data
    )
    .catch(error => {
        console.log(error);
    })

}

export function getProductExists(userId,productId){
    return axios.get(`http://localhost:3001/users/orders/${userId}`, {withCredentials: true})
    .then(orders => {
        let orderPaid = orders.data.filter(order => order.status === "Procesando" || order.status === "Completa")
        orderPaid = orderPaid[orderPaid.length-1]
        return orderPaid
    })
    .then(orderPaid =>{
        let prodBool = orderPaid.products.filter(product => product.id === productId)
        if(prodBool.length) { return true }
        else{ return false }
    })
    .catch(error => console.log(error))
}
