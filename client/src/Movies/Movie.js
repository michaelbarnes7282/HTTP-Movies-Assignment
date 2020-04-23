import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import MovieCard from "./MovieCard";

function Movie({ addToSavedList, movieList, setMovieList }) {
  const [movie, setMovie] = useState(null);
  const params = useParams();
  const { push } = useHistory();

  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };

  const saveMovie = () => {
    addToSavedList(movie);
  };

  useEffect(() => {
    console.log(movieList)
    fetchMovie(params.id);
  }, [params.id]);

  const deleteMovie = e => {
    e.preventDefault();
    axios
      .delete(`http://localhost:5000/api/movies/${params.id}`)
      .then(res => {
        const newMovies = movieList.filter(v => `${v.id}` !== res.data.id)
        setMovieList(newMovies)
        push('/')
      })
      .catch(err => console.log(err))
  }

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />

      <div className="save-button" onClick={saveMovie}>
        Save
      </div>

      <br />

      <button onClick={() => push(`/update-movie/${params.id}`)}>
        Edit
      </button>
      <button onClick={deleteMovie}>
        Delete
      </button>
    </div>
  );
}

export default Movie;
