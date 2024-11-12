import React from 'react';
import './Grid.css';

export default function Grid({movies, handleClick}) {
    const cells = movies?.map((movie, index) => 
        <div 
            className='thumbnail' 
            key={index} 
            onClick={(e) => handleClick(e, movie.id, movie.title, movie.poster_path, movie.release_date)}
        >
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} height={150} width={100} alt=''></img>
            <h1>{movie.title}</h1>
            <h3>{movie.release_date}</h3>
        </div>
    )

    return (
        <div className='grid'>
            {cells}
        </div>
    );
}
