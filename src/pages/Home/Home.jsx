import React from 'react';
import { fetchTrendMovie } from 'services/moviesAPI';
import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import s from './Home.module.css';
import { Loader } from 'components/Loader/Loader';

const Home = () => {
  const [trendMovies, setTrendMovies] = useState([]);
  const [isLoader, setIsLoader] = useState(false);

 

  useEffect(() => {
    (async () => {
      setIsLoader(true);
      try {
        const { data } = await fetchTrendMovie();
        setTrendMovies(data.results);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoader(false);
      }
    })();
  }, []);

  return (
    <>
      <h1 className={s.title}>Trending movies</h1>
      {isLoader && <Loader />}
      <ul className={s.list}>
        {trendMovies.map(movie => {
          return (
            movie.title && (
              <li key={movie.id} className={s.item}>
                <NavLink
                  to={`movies/${movie.id}`}
                  state={{ back: '/' }}
                  className={s.link}
                >
                  {movie.title ? movie.title : movie.name}
                </NavLink>
              </li>
            )
          );
        })}
      </ul>
    </>
  );
};

export default Home;