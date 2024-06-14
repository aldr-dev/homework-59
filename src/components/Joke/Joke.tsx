import React from 'react';
import {JokeProps} from '../../types';
import './Joke.css';

interface Props {
  joke: JokeProps;
  data: () => void;
}

const Joke: React.FC<Props> = ({joke, data}) => {
  return (
    <>
      <div className="joke-container-inner">
        <p>{joke.type ? 'Joke for:' : null} {joke.type}</p>
        <p>{joke.setup ? '- John Doe say:' : null} {joke.setup}</p>
        <p>{joke.delivery ? '- John Doe say:' : null} {joke.delivery}</p>
        <p>{joke.joke}</p>
      </div>
      <button className="button-new-joke" type="button" onClick={data}>New joke</button>
    </>
  );
};

export default Joke;