import { NavLink } from 'react-router-dom';
import styles from './Header.module.scss';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <NavLink to="/" className={styles.logo}>
          TechStore
        </NavLink>

        <nav className={styles.nav}>
          <NavLink to="/" className={({ isActive }) => (isActive ? styles.active : '')} end>
            Каталог
          </NavLink>
          <NavLink to="/favorites" className={({ isActive }) => (isActive ? styles.active : '')}>
            Избранное
          </NavLink>
          <NavLink to="/cart" className={({ isActive }) => (isActive ? styles.active : '')}>
            Корзина
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Header;
