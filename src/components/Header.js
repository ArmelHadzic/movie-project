import React from 'react';
import { Link } from "react-router-dom";
import Search from './Search'

const Header = (props) => {
    return (
        <div className="header">
            <Link to="/" onClick={() => props.getMovies()}>
                <div>Home</div>
            </Link>
            <Search 
                searchValue={props.searchValue} 
                searchValueHandler={props.searchValueHandler} 
                searchHandler={props.searchHandler}
            />
            <div >SOFTHOUSE WEEKEND PROJECT</div>
        </div>
    )
}

export default Header;