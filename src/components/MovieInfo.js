import React from 'react';
import MovieInfoEdit from './MovieInfoEdit';

const MovieInfo = (props) => {
    if (props.editMode) {
        return (
            <MovieInfoEdit movie={props.movie} editMovie={props.editMovie}/>
        )
    } else {
        return (
            <div>
                <div className="movie-title">{props.movie.original_title}</div>
                <div>{props.movie.overview}</div>
                <div className="info-title">Released: </div>{props.movie.release_date}
                <div className="info-title">Rating: </div>{props.movie.vote_average}
                <div className="info-title">Director: </div>
                <div className="info-title">Producer: </div>
                <div className="info-title">Main cast:
                    {/* Here should be a little bit more complexed logic of looping through state.cast object 
                        and getting the right director, producer etc.
                        Something with Object.keys/values/entries... */}
                </div>
            </div>
        )
    }
}

export default MovieInfo;