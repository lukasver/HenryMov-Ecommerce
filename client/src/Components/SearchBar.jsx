import React, { useState } from 'react';


export default function SearchBar(props) {

    const [search, setSearch] = useState('')

    // handleSubmit = function (e) {
    //     e.preventDefault();
    //     setSearch({
    //         search: e.target.value
    //     })
    // }
    return (
        <div>
            <form onSubmit={props}>
                <input name='searchBar' type='text' placeholder='Search...' value={search}/>
                <input type='submit' value='Submit' />
            </form>
        </div>
    )
}

