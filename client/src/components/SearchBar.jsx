import React, { useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import * as action from '../redux/Action'
import './SearchBar.css';

export default function SearchBar() {
    
    const onSearch = useSelector(store => store.onSearch)
    const dispatch = useDispatch()

    const [search, setSearch] = useState('')
    
    function handleChance(e){
        console.log('esto es:'+e.target.id)
        setSearch(e.target.value)
        dispatch(action.onSearch(e.target.value))

    }
    return (
        <div>
            <form onSubmit={(e) => {
                e.preventDefault();
                dispatch(action.onSearch(search));
                setSearch('');
            }} className="input-group mb-3">
                <input
                  
                    name='searchBar'
                    type='text'
                    placeholder='¿Qué estás buscando?'
                    value={search}
                    onChange= {handleChance} 
                    className="form-control"
                />
                <div class="input-group-append">
                    <button className="input-group-text" type="submit" value="Buscar" aria-label="Buscar">
                        <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-search" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" d="M10.442 10.442a1 1 0 0 1 1.415 0l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1 1 0 0 1 0-1.415z" />
                            <path fill-rule="evenodd" d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z" />
                        </svg>
                    </button>
                </div>
            </form>
        </div>
    )
}