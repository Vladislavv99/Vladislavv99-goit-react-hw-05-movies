import { Outlet } from "react-router-dom";
import { lazy, Suspense} from "react";
import { Loader } from "components/Loader/Loader";
import s from './Layout.module.css';
const Navigate = lazy(()=> import('../Navigate/Navigate'))

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