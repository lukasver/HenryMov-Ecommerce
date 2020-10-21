

//==================================================================================
//         Para traer todas las reviews  (console.log para verificar si llego bien..DESPUES SACAR)
//==================================================================================

export function getReviews(){
    return axios
    .get(`http://localhost:3001/reviews`)
    .then(data => 
        console.log(data)
    )
    .catch(error => console.log(error))
}

//==================================================================================
//     Para traer todas las reviews de un producto (console.log para verificar si llego bien..DESPUES SACAR)
//==================================================================================

export function getReviewsProd (id){
    return axios
    .get(`http://localhost:3001/product/${idProducto}/reviews`)
    .then(data=>
        console.log(data)
    )
    .catch(error => console.log(error))
}

//==================================================================================
//         Para crear reviews  (console.log para verificar si llego bien...DESPUES SACAR)
//==================================================================================

export function addReviews(newReviews){
    axios.post(`http://localhost:3001/product/${idProducto}/reviews/add`, newReviews)
    .then(data => 
        console.log(data)
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
    .then(data => 
        console.log(data)
    )
    .catch(error => {
        console.log(error);
    })
}

//==================================================================================
//     Para modificar reviews po ID (console.log para verificar si llego bien..DESPUES SACAR)
//==================================================================================

// export function modifyReviews (reviews){
//     axios
//     .put(`http://localhost:3001/reviews/${id}`)

// }