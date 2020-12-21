import React from 'react';

const Search = (props) => {
    return (
        <div className="search">
            <input 
                type="text" 
                className="search" 
                placeholder="Search movie, director, actor..."
                value={props.searchValue}
                onChange={(event) => props.searchValueHandler(event.target.value)}
                onKeyPress={(event) => (event.charCode === 13) ? props.searchHandler() : null}
            />
            <button className="search-button" onClick={() => props.searchHandler()}>Search</button>
        </div>
    )
}

export default Search;