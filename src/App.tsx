import './App.css';
import AddMovieForm from './components/AddMovieForm/AddMovieForm';
import {useEffect, useState} from 'react';
import {JokeProps, MoviesProps} from './types';
import MovieItem from './components/MovieItem/MovieItem';
import Joke from './components/Joke/Joke';

const url = 'https://v2.jokeapi.dev/joke/Programming';

const App = () => {
  const [movies, setMovies] = useState<MoviesProps[]>([
    {id: '1', message: 'Harry Potter'},
    {id: '2', message: 'The Great Gatsby'},
    {id: '3', message: 'Survivor'},
  ]);

  const [joke, setJoke] = useState<JokeProps>({
    type: '',
    setup: '',
    delivery: '',
    joke: '',
  });

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const response = localStorage.getItem('movies');
    if (response !== null) {
      const moviesArray: MoviesProps[] = JSON.parse(response);
      if (moviesArray.length > 0) {
        setMovies(moviesArray);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('movies', JSON.stringify(movies));
  }, [movies]);

  useEffect(() => {
    void fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Request failed with status ' + response.status);
      } else {
        const dataObject = await response.json();
        const {type, setup, delivery, joke} = dataObject;
        setJoke((prevState) => {
          return {
            ...prevState,
            type,
            setup,
            delivery,
            joke,
          };
        });
      }
    } catch (error) {
      console.error(error);
      setError('Failed to fetch joke. Please try again later.');
    }
  };

  const addMovie = (message: string) => {
      const newMovie = {id: Math.random().toString(), message};
      setMovies([...movies, newMovie]);
  };

  const deleteMovie = (id: string) => {
    setMovies(movies.filter((movie) => movie.id !== id));
  };

  const updateMovie = (id: string, newName: string) => {
    setMovies((prevState) => {
     return prevState.map((movie) => {
        if (movie.id === id) {
          return {
            ...movie,
            message: newName,
          };
        } else {
          return movie;
        }
      });
    });
  };

  return (
    <div className="container-wrapper">
      <div className="col-1">
        <AddMovieForm onSubmit={addMovie} />
        <h2 className="main-title">To watch list:</h2>
        {movies.length > 0 ? (
          <div className="movies-list-inner">
            <MovieItem movies={movies} onUpdate={updateMovie} onDelete={deleteMovie} />
          </div>
        ): <span>Movie list is empty. List a couple of your favorite movies.</span>}
      </div>

      <div className="col-2">
        <h2 className="title-joke">Programming Joke:</h2>
        {error ? (
          <div className="error-message">{error}</div>
        ) : (
          <Joke joke={joke} data={fetchData}/>
        )}
      </div>
    </div>
  );
};

export default App;