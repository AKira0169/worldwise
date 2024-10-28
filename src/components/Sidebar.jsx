import styles from './Sidebar.module.css';
import Logo from './Logo.jsx';
import AppNav from './AppNav';
import { Outlet } from 'react-router-dom';
import { Footer } from './Footer.jsx';
function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />
      <Outlet />
      <Footer />
    </div>
  );
}

export default Sidebar;
