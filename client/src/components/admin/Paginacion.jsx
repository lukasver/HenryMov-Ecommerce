import React, { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import * as action from '../../redux/Action'

const Paginacion = () => {

	const totalProds = useSelector(store => store.totalProds) 

	const pageNumbers = [];

	const [pageActual, setPageActual] = useState(1);
    const [prodsPorPage, setProdsPorPage] = useState(15);
    //
    const indexOfLastPost = pageActual * prodsPorPage;
    const indexOfFirstPost = indexOfLastPost - prodsPorPage;
    let currentPosts = totalProds.slice(indexOfFirstPost, indexOfLastPost);
    //
    const paginate = (pageNumber) => setPageActual(pageNumber)

    useEffect(() => {
    	currentPosts = totalProds.slice(indexOfFirstPost, indexOfLastPost);

    },[pageActual, currentPosts])

    if (!totalProds) {
    	return <h2>Loading....</h2>
    }
	console.log()

	for (let i = 1; i <= Math.ceil(totalProds.length / prodsPorPage); i++) {
		pageNumbers.push(i);
	}
	const test = [1,2,3,4,5]

return (
	<nav>
		<ul className="pagination center">
			{pageNumbers.map((numero, i) => (
			<li key={i} className="page-item">
				<a onClick={(e) => {e.preventDefault(); setPageActual(numero)}} href="#" className="page-link">{numero}</a>
			</li>
			))}
		</ul>
	</nav>



	)

}

export default Paginacion;