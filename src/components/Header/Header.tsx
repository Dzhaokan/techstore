import { NavLink } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import { selectCartCount } from '../../features/cart/cartSlice';
import styles from './Header.module.scss';

function Header() {
  const cartCount = useAppSelector(selectCartCount);

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
            {cartCount > 0 && <span className={styles.badge}>{cartCount}</span>}
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Header;
