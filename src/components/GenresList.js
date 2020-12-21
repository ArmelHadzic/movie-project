import React from 'react';
import { Link } from "react-router-dom";

const GenresList = (props) => {
    return (
        <div>
            {Object.values(props.genres).map((genre) => {
                return (
                    <Link to={'/genres/' + genre.name} className="genre" key={genre.id} onClick={() => props.getMovies(genre.id)}>
                        {genre.name}
                    </Link>
                )
            })}
        </div>
    )
}

export default GenresList;