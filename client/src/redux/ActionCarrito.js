import axios from "axios";
export const CARRITO = "CARRITO";
export const DELETE_PROD ='DELETE_PROD'


export function agregarCarrito(prod) {
    return {
      type: CARRITO,
      payload: prod,
    };
  }
  export function deleteProd(prod){
    return {
      type: DELETE_PROD,
      payload: prod
    }
  }