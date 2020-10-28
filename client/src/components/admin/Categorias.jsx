import React, { useState, useEffect } from 'react';
import './Categorias.css';
import { useHistory } from "react-router-dom";

export default function Categorias({ categorias, deleteCategory, getCategory, category, addCategory, modCategory }) {

    // =======================================================
    //      PROTECCION LOGIN FRONT
    // =======================================================
    const pase = localStorage.getItem('role');
    const history = useHistory();
      if (pase !== 'Admin' && pase !== 'Responsable') {
        history.push('/login')
      }
    // =======================================================


    const [addCat, setAddCat] = useState({
        name: '',
        description: '',
        status: 'Activado'
    });

    const [modCat, setModCat] = useState({
        id: 0,
        name: '',
        description: '',
        status: ''
    });

    // =======================================================
    //      PAGINACIÓN
    // =======================================================

    const [pageActual, setPageActual] = useState(1);
    const [prodsPorPage, setProdsPorPage] = useState(10);

    const pageNumbers = []
    for (let i = 1; i <= Math.ceil(categorias.length / prodsPorPage); i++) {
        pageNumbers.push(i);
    }

    const indexOfLastPost = pageActual * prodsPorPage;
    const indexOfFirstPost = indexOfLastPost - prodsPorPage;
    const currentPosts = categorias.slice(indexOfFirstPost, indexOfLastPost);



    const [textButton, setTextButton] = useState('Agregar')

    useEffect(() => {
        setAddCat({ ...addCat, id: categorias.length > 0 && categorias[categorias.length - 1].id + 1 });
        setModCat(category);
    }, [categorias, category, textButton])

    //Agrega al estado los datos que se van ingresando
    function handleChange(e) {
        e.preventDefault();
        if (textButton === 'Agregar') {
            setAddCat({
                ...addCat,
                [e.target.id]: e.target.value
            });
        } else {
            setModCat({
                ...modCat,
                [e.target.id]: e.target.value
            });
        }
    }

    const onClick = (e) => {
        if (textButton === 'Agregar') {
            setAddCat({ ...addCat, status: e.target.value });
        } else {
            setModCat({ ...modCat, status: e.target.value });
        }
    }

    return (
        <div className="col-md-10 panel-right row" style={{ paddingTop: '25px' }}>
            <div className="col-md-7 col-lg-8">
                <h2>Todas las Categorias</h2>
                <p>Elija la categoria a modificar</p>
                <table className="table table-hover table-dark">
                    <thead>
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Descripcion</th>
                            <th scope="col">Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            currentPosts.length > 0 && currentPosts.map(dato => {
                                return (<tr key={dato.id} >
                                    <th scope="row">{dato.id}</th>
                                    <td>{dato.name}</td>
                                    <td>{dato.description}</td>
                                    <td>{dato.status}</td>
                                    <td>
                                        <a className="iconTable"><i className="far fa-edit" id={dato.id} style={{ marginRight: '10px' }} onClick={(e) => {
                                            e.preventDefault();
                                            getCategory(dato.id)
                                            setTextButton('Modificar');
                                            setModCat(category);
                                        }}></i></a>
                                        <a className="iconTable"><i className="far fa-trash-alt" id={dato.id} onClick={(e) => {
                                            e.preventDefault();
                                            if (!window.confirm('Esta por eliminar una categoria, desea continuar?')) {
                                                return false;
                                            }
                                            deleteCategory(dato.id);
                                        }}></i></a>
                                    </td>
                                </tr>)
                            })
                        }
                    </tbody>
                </table>
                 {/* BOTONES DE PAGINACION */}
                <nav>
                    <ul className="pagination d-flex justify-content-center">
                        {pageNumbers.map((numero, i) => (
                        <li key={i} className="page-item">
                         <a onClick={(e) => {e.preventDefault(); setPageActual(numero)}} href="#" className="page-link">{numero}</a>
                        </li>
                    ))}
                    </ul>
                </nav>
            </div>
            <div className="col-md-5 col-lg-4">
                    <h2>{textButton === 'Agregar' ? 'Agregar Categoría' : 'Modificar Categoría'}</h2>
                <p>Rellene todos los campos</p>
                <form className="text-center border border-light p-5 form-category">
                    <input type="text" id="name" className="form-control mb-4" placeholder="Titulo" onChange={handleChange} value={textButton == 'Agregar' ? addCat.name : modCat.name} />
                    <input type="description" id="description" className="form-control mb-4" placeholder="Descripcion" onChange={handleChange} value={textButton == 'Agregar' ? addCat.description : modCat.description} />
                    <div className="radio activ">
                        <label><input type="radio" name="optradio" value="Activado" onClick={(e) => onClick(e)} />Activado</label>
                    </div>
                    <div className="radio desactiv">
                        <label><input type="radio" name="optradio" value="Desactivado" onClick={(e) => onClick(e)} />Desactivado</label>
                    </div>
                    <button className="btn btn-info btn-block my-4 buttonAddMod" onClick={(e) => {
                        // e.preventDefault();
                        if (textButton === 'Agregar') addCategory(addCat);
                        if (textButton === 'Modificar') modCategory(modCat);
                    }}>{textButton}</button>
                </form>
            </div>
        </div>
    )
}

