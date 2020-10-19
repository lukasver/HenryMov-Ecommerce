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