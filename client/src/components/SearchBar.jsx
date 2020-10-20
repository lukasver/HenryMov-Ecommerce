import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { useDispatch } from 'react-redux';
import * as action from '../redux/Action'
import './SearchBar.css';
import { useDebouncedEffect } from '../utils/utils.js';

export default function SearchBar() {

    const dispatch = useDispatch();
    const [search, setSearch] = useState('');

    useDebouncedEffect(()=> dispatch(action.onSearch(search)), 300, [search]);

    let history = useHistory();

    function handleChance(e) {
        setSearch(e.target.value)
        
       
        history.push('/search');
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
                    onChange={(e) => handleChance(e)}
                    className="form-control"
                />
                <div className="input-group-append">
                    <button className="input-group-text" type="submit" value="Buscar" aria-label="Buscar">
                        <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-search" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M10.442 10.442a1 1 0 0 1 1.415 0l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1 1 0 0 1 0-1.415z" />
                            <path fillRule="evenodd" d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z" />
                        </svg>
                    </button>
                </div>
            </form>
        </div>
    )
}