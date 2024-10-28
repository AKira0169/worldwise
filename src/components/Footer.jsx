import styles from './Sidebar.module.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <p className={styles.copyright}>Copyright &copy; {new Date().getFullYear()} WorldWise. All rights reserved</p>
    </footer>
  );
}
