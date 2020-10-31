import { useCallback, useEffect } from "react";

// =================================================
//		Funciones útiles para reutilizar
// =================================================


// --- Id Generator ------------------------------------

export function counter() {
	var id = 0;
	return function() {
    id = id + 1;
    return id
  }
}

//-------------------------------------------------------

//Formate la fecha a dd/mm/yyyy
export function dateFormat(res) {
  let newdate = new Date(res);
  let mes = newdate.getMonth()+1;
  let dia = newdate.getDate();
  let ano = newdate.getFullYear();
  res = JSON.stringify(`${dia}/${mes}/${ano}`)
  return res.replace(/[ '"]+/g, ' ');
}


//IDEM Anterior pero se usa en los casos que por algun motivo resta 1 día ...
export function dateFormat2(res) {
  let newdate = new Date(res);
  let mes = newdate.getMonth()+1;
  let dia = newdate.getDate()+1;
  let ano = newdate.getFullYear();
  res = JSON.stringify(`${dia}/${mes}/${ano}`)
  return res.replace(/[ '"]+/g, ' ');
}

//Funcion Debounced que actua como setTimeOut ejecutando solo la ultima accion
export const useDebouncedEffect = (effect, delay , deps) => {
    const callback = useCallback(effect, deps);

    useEffect(() => {
        const handler = setTimeout(() => {
            callback();
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [callback, delay]);
}



export function formatProducts (products){
  products = products || [];
  let newProducts = products.map(prod=>{
    let newProd ={
      amount: prod.price,
      quantity: prod.count,
      productId: prod.id
    }
    return newProd
})
  return newProducts
}
