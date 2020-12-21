import React from 'react';

const MovieInfoEdit = (props) => {
    return (
        <div className="movie-specs">
            <input type="text" value={props.movie.original_title} onChange={(event) => props.editMovie("original_title", event.target.value)} className="input"/>

            <textarea type="text" value={props.movie.overview} onChange={(event) => props.editMovie("overview", event.target.value)}></textarea>

            <label className="info-title">Released: </label>
            <input type="text" value={props.movie.release_date} onChange={(event) => props.editMovie("release_date", event.target.value)} className="input"/>

            <label className="info-title">Rating: </label>
            <input type="text" value={props.movie.vote_average} onChange={(event) => props.editMovie("vote_average", event.target.value)} className="input"/>

            <label className="info-title">Director: </label>

            <label className="info-title">Producer: </label>

            <label className="info-title">Main cast:
                            {/* Object keys something */}
            </label>
        </div>
    )
}

export default MovieInfoEdit;