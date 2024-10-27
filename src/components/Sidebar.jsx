import styles from './Sidebar.module.css';
import Logo from './Logo.jsx';
import AppNav from './AppNav';
import { Outlet } from 'react-router-dom';
function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />

      <Outlet />
      <footer className={styles.footer}>
        <p className={styles.copyright}>Copyright &copy; {new Date().getFullYear()} WorldWise. All rights reserved</p>
      </footer>
    </div>
  );
}

export default Sidebar;
