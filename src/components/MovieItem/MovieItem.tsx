import * as React from 'react';
import {MoviesProps} from '../../types';
import './MovieItem.css';

interface Props {
  movies: MoviesProps[];
  onUpdate: (id: string, newName: string) => void;
  onDelete: (id: string) => void;
}
const MovieItem: React.FC<Props> = React.memo(({movies, onUpdate, onDelete}) => {
  return (
    <>
      {movies.map((movie, index) => (
        <div className="movie-item" key={movie.id}>
          <input
            className="movie-item-field"
            type="text"
            value={movie.message}
            onChange={(event) => onUpdate(movie.id, event.target.value)}
          />
          <span className="movie-item-index">#{index + 1}</span>
          <button className="movie-item-button-delete" onClick={() => onDelete(movie.id)}>&#10006;</button>
        </div>
      ))}
    </>
  );
}, (prevProps, nextProps) => {
  if (prevProps.movies.length !== nextProps.movies.length) {
    return false;
  }
  for (let i = 0; i < prevProps.movies.length; i++) {
    if (prevProps.movies[i].id !== nextProps.movies[i].id || prevProps.movies[i].message !== nextProps.movies[i].message) {
      return false;
    }
  }
  return true;
});

export default MovieItem;