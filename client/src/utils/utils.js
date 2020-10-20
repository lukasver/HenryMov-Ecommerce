import { useCallback, useEffect } from "react";
import axios from "axios";
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

// suscribe to newsleter 

export function newsletterAdd(e) {
  e.preventDefault();
  
  const mail = document.getElementById("Newsletter").value
  axios.post("http://localhost:3001/newsletter/suscribe", {email: mail})
  .then(res => {
    document.getElementById("Newsletter").value = ''
  })
  .catch(err => {
    document.getElementById("Newsletter").value = ''
    console.log(err)
  })
  return;
}

export function newsletterDel(e) {
  e.preventDefault();
  
  const mail = document.getElementById("Newsletter").value
  axios.put("http://localhost:3001/newsletter/unsuscribe", {email: mail})
  .then(res => {
    document.getElementById("Newsletter").value = ''
  })
  .catch(err => {
    document.getElementById("Newsletter").value = ''
    console.log(err)
  })
  return;
}