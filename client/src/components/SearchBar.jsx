import React, { useState } from 'react';
import './SearchBar.css';

export default function SearchBar({ onSearch }) {

    const [search, setSearch] = useState('')

    return (
        <div>
            <form onSubmit={(e) => {
                e.preventDefault();
                onSearch(search);
                setSearch('');
            }} className="input-group mb-3">
                <input
                    name='searchBar'
                    type='text'
                    placeholder='¿Qué estás buscando?'
                    value={search}
                    onChange={e => setSearch(e.target.value)}
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