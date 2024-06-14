import './App.css';
import AddMovieForm from './components/AddMovieForm/AddMovieForm';
import {useEffect, useState} from 'react';
import {MoviesProps} from './types';
import MovieItem from './components/MovieItem/MovieItem';

const App = () => {
  const [movies, setMovies] = useState<MoviesProps[]>([
    {id: '1', message: 'Harry Potter'},
    {id: '2', message: 'The Great Gatsby'},
    {id: '3', message: 'Survivor'},
  ]);

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
      <AddMovieForm onSubmit={addMovie} />
      <h2 className="main-title">To watch list:</h2>
      {movies.length > 0 ? (
        <div className="movies-list-inner">
          <MovieItem movies={movies} onUpdate={updateMovie} onDelete={deleteMovie} />
        </div>
      ): <span>Movie list is empty. List a couple of your favorite movies.</span>}
    </div>
  );
};

export default App;