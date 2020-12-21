import React from 'react';
import { Link, useLocation } from "react-router-dom";
import imagePlaceholder from "../resources/imgPlaceholder.png";
import { IMAGE_URL } from '../constants';

const MovieCollection = (props) => {
    const location = useLocation();
    var genre = location.pathname
    genre = genre.replace('/genres/', '');
    genre = genre.replace('/', '');
    
    return (
        <div className="movie-section">
            <div className="movie-title">Top Rated {genre} Movies</div>
            <div className="movie-collection">
                {Object.values(props.movies).map((movie) => {
                    return (
                        <div className="movie" key={movie.id}>
                            <Link to={"/movies/" + movie.id}>
                                <img src={movie.poster_path ? IMAGE_URL + movie.poster_path : imagePlaceholder} alt="" className="image" />
                                <div>{movie.original_title}</div>
                                <div>{movie.vote_average}</div>
                            </Link>
                        </div>
                    )
                })}
            </div>
            <button onClick={() => props.exportData(JSON.stringify(props.movies), 'movies.json', 'application/json')} className="button">
                Export Current Movies data into JSON file
            </button>
        </div>
    )
}

export default MovieCollection;