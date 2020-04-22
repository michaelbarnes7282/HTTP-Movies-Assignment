import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";

const initialMovie = {
    id: "",
    title: "",
    director: "",
    metascore: "",
    stars: []
};

const UpdateForm = props => {
    const [movie, setMovie] = useState(initialMovie);
    const { id } = useParams();
    const { push } = useHistory();

    useEffect(() => {
        console.log('props', props);
        axios
            .get(`http://localhost:5000/api/movies/${id}`)
            .then(res => {
                console.log(res)
                setMovie(res.data)
            })
            .catch(err => console.log(err))
    }, [id]);

    const changeHandler = ev => {
        ev.persist();
        let value = ev.target.value;
        if (ev.target.name === "metascore") {
            value = parseInt(value, 10);
        }

        setMovie({
            ...movie,
            [ev.target.name]: value
        });
    };

    const handleSubmit = e => {
        e.preventDefault();
        axios
            .put(`http://localhost:5000/api/movies/${id}`, movie)
            .then(res => {
                const updatedMovie = res.data;
                const newList = props.movieList.filter(movie => movie.id !== updatedMovie.id)
                props.setMovieList([
                    ...newList,
                    updatedMovie
                ]);
                props.movieList.sort();
                push(`/`)
            })
            axios
            .get(`http://localhost:5000/api/movies/`)
            .then(res => console.log('second get', res))
            .catch(err => console.log(err))
    };

    return (
        <div>
            <h2>Update Movie</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="title"
                    onChange={changeHandler}
                    placeholder="title"
                    value={movie.title}
                />

                <input
                    type="text"
                    name="director"
                    onChange={changeHandler}
                    placeholder="director"
                    value={movie.director}
                />

                <input
                    type="text"
                    name="metascore"
                    onChange={changeHandler}
                    placeholder="metascore"
                    value={movie.metascore}
                />

                <button>Update</button>
            </form>
        </div>
    );
};

export default UpdateForm;