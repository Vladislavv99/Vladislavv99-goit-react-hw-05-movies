import { NavLink } from 'react-router-dom';
import s from './Navigate.module.css';
 const Navigate = () => {
  return (
    <nav className={s.navigation}>
      <ul className={s.list}>
        <li className={s.item}>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? s.active : s.navLink)}
          >
            Home
          </NavLink>
        </li>
        <li className={s.item}>
          <NavLink
            to="/movies"
            className={({ isActive }) => (isActive ? s.active : s.navLink)}
          >
            Movies
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
export default Navigate;