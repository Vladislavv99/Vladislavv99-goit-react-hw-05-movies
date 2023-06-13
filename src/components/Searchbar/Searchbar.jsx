import { useState } from 'react';
import s from './Searchbar.module.css';


export const Searchbar = ({ getMoviesFromInput }) => {
  const [input, setInput] = useState('');
  const [page] = useState(1);

  const handleInput = e => {
    setInput(e.target.value);
  };
  const handleSubmit = e => {
    e.preventDefault();
    if (input.trim() !== '') {
      getMoviesFromInput(input, page);
    }
  };

  return (
    <form onClick={handleSubmit} className={s.form}>
      <label className={s.labelInput}>
        <input
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleInput}
          name="searchInput"
          value={input}
          className={s.input}
        />
      </label>

      <button type="submit" className={s.submit}>
        Search
      </button>
    </form>
  );
};
