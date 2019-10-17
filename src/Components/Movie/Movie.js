import React from 'react';
function Movie(props) {
    return (
        <div className="text-color">
            <img src={props.movieDetails.poster_path} className="movie-logo" alt="props.movieDetails.title"/>
            <p>{props.movieDetails.title} </p>
            <p>{props.movieDetails.release_date}</p>
            <p>{props.movieDetails.genres.join(" & ")}</p>
        </div>
    );
}

export default Movie;
