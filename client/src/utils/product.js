import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as action from '../redux/Action'

//==================================================================================
//         Agregar productos al carrito (localStorage)
//==================================================================================

export const handleAdd = (product,dispatch, count)=> {
    product.count = count
    let recoveredData = localStorage.getItem('prod')
    let search = JSON.parse(recoveredData)

    if (!recoveredData) {
        let countCart = 1
        localStorage.setItem('count', countCart)
        dispatch(action.countCart())
        return localStorage.setItem('prod', JSON.stringify([product]))
    }

    let fined = search.find(prod => prod.id == product.id)
    if (fined) {
        fined.count++
        let cleanData = search.filter((data) => data.id !== product.id)
        cleanData.push(fined)
        return localStorage.setItem('prod', JSON.stringify(cleanData))
    }
    let data = JSON.parse(localStorage.getItem('prod'))
    let newProd = product
    data.push(newProd)
    let countCart = data.length
    localStorage.setItem('count', countCart)
    localStorage.setItem('prod', JSON.stringify(data))
    dispatch(action.countCart())

}

//==================================================================================
//      se ve si hay producto comprado y lo deshabilita para la compra directa 
//==================================================================================
export const stocker=(product)=>{
    console.log('aca entra', product)
   
    let products = JSON.parse(localStorage.getItem('prod'))
    console.log(products)
    if (products == null || products == undefined) {
        return true
    }else{
    let cleanData = products.filter((data) => data.id == product.id)
    console.log('cleanData', cleanData)
    if (cleanData.length != 0) {
        return false
        }
    }
    return 
}
