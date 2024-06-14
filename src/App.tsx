import './App.css';
import AddMovieForm from './components/AddMovieForm/AddMovieForm';
import {useState} from 'react';
import {MoviesProps} from './types';
import MovieItem from './components/MovieItem/MovieItem';

const App = () => {
  const [movies, setMovies] = useState<MoviesProps[]>([
    {id: '1', message: 'Harry Potter'},
    {id: '2', message: 'The Great Gatsby'},
    {id: '3', message: 'Survivor'},
  ]);

  return (
    <div className="container-wrapper">
      <AddMovieForm onSubmit={addMovie} />
      <h2 className="main-title">To watch list:</h2>
      {movies.length > 0 ? (
        <div className="movies-list-inner">
          <MovieItem movies={movies} onUpdate={updateMovie} onDelete={deleteMovie} />
        </div>
      ): null}
    </div>
  );
};

export default App;