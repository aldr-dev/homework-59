import * as React from 'react';
import {ChangeEvent, useState} from 'react';
import './AddMovieForm.css';

interface Props {
  onSubmit: (message: string) => void;
}

const AddMovieForm: React.FC<Props> = ({onSubmit}) => {
  const [movieName, setMovieName] = useState<string>('');

  const onFieldChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const valueInput = (event.target as HTMLTextAreaElement).value;
    setMovieName(valueInput);
  };

  const onFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (movieName.trim().length > 0) {
      onSubmit(movieName);
      setMovieName('');
    }
  };

  return (
    <form className="form-movie" onSubmit={onFormSubmit}>
      <textarea className="movie-fluid" value={movieName} required placeholder="Enter movie name" onChange={onFieldChange}></textarea>
      <button className="button-submit" type="submit">Add</button>
    </form>
  );
};

export default AddMovieForm;