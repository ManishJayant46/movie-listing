import React from "react";
import './MovieCard.css'

const MovieCard = (props) =>{

    const POSTER_URL = "https://image.tmdb.org/t/p/w500/"
    return(
        <div className="card">
            <div className="poster">
                <img src= {POSTER_URL + props.poster_path}/>
            </div>

            <div className="info">
                <p className="title">{props.title}</p>
                <p className="rating">{props.vote_average}</p>
            </div>

        </div>
    )
}

export default MovieCard