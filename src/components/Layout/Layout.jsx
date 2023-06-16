import { Outlet } from "react-router-dom";
import Navigate from "../Navigate/Navigate";
import s from './Layout.module.css';

const Layout = () => {
  return (
    <>
    <header className={s.header}>
          <Navigate />
    </header>
        <Outlet />
    </>
  );
};
export default Layout;