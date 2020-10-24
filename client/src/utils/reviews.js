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
                prom = prom + review.value
            })
            prom = Math.floor(prom / reviews.data.length)
        return {
            products: reviews.data,
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

export function getProductExists(idUser){
    axios.get(`http://localhost:3001/users/${idUser}/orders`)
    .then(orders => {
        console.log(`ordenes de user ${idUser}`, orders.data)
        let orderPaid = orders.data.filter(order => order.status === "Processing")[0]
        console.log('orderPaid =>',orderPaid)
        return orderPaid
    })
    // .then(orderPaid =>{
    //     axios.get(`http://localhost:3001/orderlines/${orderPaid}`)
    // })
    .catch(error => console.log(error))
}
