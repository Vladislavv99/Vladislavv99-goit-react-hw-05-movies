import React from 'react';
import {
  NavLink,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';

import { useState, useEffect } from 'react';
import { fetchMovieDetails } from 'services/moviesAPI';
import s from './MovieDetails.module.css';
import { Loader } from 'components/Loader/Loader';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500/';

const MovieDetails = () => {
  const [movie, setMovie] = useState(null);
  const { movieId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoader, setIsLoader] = useState(false);

  useEffect(() => {
    (async () => {
      setIsLoader(true);
      try {
        const { data } = await fetchMovieDetails(movieId);
        setMovie(data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoader(false);
      }
    })();
    return () => {
      setMovie(null);
    };
  }, [movieId]);

  const movieGenres = () => {
    const genres = movie.genres.map(genre => genre.name).join(', ');
    return genres;
  };

  return (
    <>
      <button
        onClick={() => navigate(location.state.back)}
        type="button"
        className={s.backBtn}
      >
        Back
      </button>
      {isLoader && <Loader />}
      {movie && (
        <>
          <div className={s.container}>
            <img
              src={
                movie.poster_path
                  ? IMAGE_BASE_URL + movie.poster_path
                  : 'https://cdn.pixabay.com/photo/2015/11/03/09/03/question-mark-1019993_1280.jpg'
              }
              alt={movie.title}
              className={s.image}
            />
            <div className={s.infoContainer}>
              <h1 className={s.title}>
                {movie.title} ({movie.release_date.slice(0, 4)})
              </h1>
              <p className={s.rating}>Rating: {movie.vote_average}</p>
              <h2 className={s.overviewTitle}>Overview</h2>
              <p className={s.overviewDisc}>{movie.overview}</p>
              <h3 className={s.genresTitle}>Genres</h3>
              <p className={s.genresDisc}>{movieGenres()}</p>
            </div>
          </div>
          <div className={s.additional}>
            <h3 className={s.additionalTitle}>Additional information</h3>
            <ul className={s.additionalList}>
              <li className={s.additionalItem}>
                <NavLink
                  to="cast"
                  state={{ back: location.state.back }}
                  className={({ isActive }) =>
                    isActive ? s.active : s.link
                  }
                >
                  {' '}
                  Cast
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="reviews"
                  state={{ back: location.state.back }}
                  className={({ isActive }) =>
                    isActive ? s.active : s.link
                  }
                >
                  Review
                </NavLink>
              </li>
            </ul>
          </div>

          <Outlet />
        </>
      )}
    </>
  );
};

export default MovieDetails;