import { NavLink } from 'react-router-dom';
import clsx from 'clsx';
import { useAppSelector } from '../../app/hooks';
import { selectCartCount } from '../../features/cart/cartSlice';
import { selectFavoritesCount } from '../../features/favorites/favoritesSlice';
import styles from './Header.module.scss';

function Header() {
  const cartCount = useAppSelector(selectCartCount);
  const favoritesCount = useAppSelector(selectFavoritesCount);

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    clsx(styles.link, isActive && styles.active);

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <NavLink to="/" className={styles.logo}>
          TechStore
        </NavLink>

        <nav className={styles.nav}>
          <NavLink to="/" className={linkClass} end>
            Каталог
          </NavLink>
          <NavLink to="/favorites" className={linkClass}>
            Избранное
            {favoritesCount > 0 && <span className={styles.badge}>{favoritesCount}</span>}
          </NavLink>
          <NavLink to="/cart" className={linkClass}>
            Корзина
            {cartCount > 0 && <span className={styles.badge}>{cartCount}</span>}
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Header;
