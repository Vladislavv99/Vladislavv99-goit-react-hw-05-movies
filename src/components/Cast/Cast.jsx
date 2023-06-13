import { Loader } from 'components/Loader/Loader';
import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchCast } from 'services/moviesAPI';
import s from './Cast.module.css';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500/';

const Cast = () => {
  const [cast, setCast] = useState(null);
  const { movieId } = useParams();
  const [isLoader, setIsLoader] = useState(false);

  useEffect(() => {
    (async () => {
      setIsLoader(true);
      try {
        const { data } = await fetchCast(movieId);
        setCast(data.cast);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoader(false);
      }
    })();
  }, [movieId]);

  return (
    <div className={s.container}>
      {isLoader && <Loader />}
      {cast && (
        <ul className={s.list}>
          {cast.map(actor => (
            <li key={actor.id} className={s.item}>
              <img
                src={
                  actor.profile_path
                    ? IMAGE_BASE_URL + actor.profile_path
                    : 'https://cdn.pixabay.com/photo/2015/11/03/09/03/question-mark-1019993_1280.jpg'
                }
                alt=""
                className={s.image}
              />
              <div className={s.info}>
                <p className={s.actorName}>{actor.name}</p>
                <p className={s.character}>Character: {actor.character}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
      {cast && cast.length === 0 && <p>Nothing here yet</p>}
    </div>
  );
};

export default Cast;