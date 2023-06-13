import s from './MoviesGallery.module.css';
import { NavLink } from 'react-router-dom';

const MoviesGallery = ({movies, location})=>{
    const backState = location.pathname + location.search;

    return (
        <div>
          <ul className={s.list}>
            {movies.map(movie => (
              <li key={movie.id} className={s.item}>
                <NavLink
                  to={`${movie.id}`}
                  state={{ back: `${backState}` }}
                  className={s.link}
                >
                  {movie.title}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      );
}
export default MoviesGallery;