import React from "react";
import './MovieCard.css'

const MovieCard = (data) =>{

    const POSTER_URL = "https://image.tmdb.org/t/p/w500/"
    return(
        <div className="card">
            <div className="poster">
                <img src= {data.poster_path ? POSTER_URL + data.poster_path : "https://images.pexels.com/photos/3945313/pexels-photo-3945313.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"}/>
            </div>

            <div className="info">
                <p className="title">{data.title}</p>
                <p className="rating">{data.vote_average}</p>
            </div>

            <div className="overview">
                <h4 className ="overview_title">Overview</h4>
                <p className="overview_info">{data.overview}</p>
            </div>

        </div>
    )
}

export default MovieCard