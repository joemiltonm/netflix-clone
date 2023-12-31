import React from "react";
import MovieCard from "./MovieCard";

import {isEmpty} from 'lodash';


interface MovieListprops{
    data: Record<string, any>[];
    title: String;
}

const MovieList:React.FC<MovieListprops> = ({data, title}) => {

    console.log(data)
    
    if (isEmpty(data)){
        return null
    }

    console.log("from movie list")

    return (
        <div className="px-4 md:px-12 mt-4 spapce-y-8">
            <div>
                <p className="text-white text-md md:text-xl lg:text-2xl font-semibold mb-4">
                    {title}
                </p>
                <div className="grid grid-cols-4 gap-2">
                    {data.map((movie) => (
                        <MovieCard key = {movie.id} data={movie}/>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default MovieList;