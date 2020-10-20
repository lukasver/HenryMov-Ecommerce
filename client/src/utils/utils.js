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
  let mes = newdate.getMonth() + 1;
  let dia = newdate.getDate();
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