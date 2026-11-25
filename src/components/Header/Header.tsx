import { NavLink } from 'react-router-dom';
import { Moon, Sun } from 'lucide-react';
import clsx from 'clsx';
import { useAppSelector } from '../../app/hooks';
import { selectCartCount } from '../../features/cart/cartSlice';
import { selectFavoritesCount } from '../../features/favorites/favoritesSlice';
import { useTheme } from '../../hooks/useTheme';
import styles from './Header.module.scss';

const Header = () => {
  const cartCount = useAppSelector(selectCartCount);
  const favoritesCount = useAppSelector(selectFavoritesCount);
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

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

        <button
          type="button"
          className={styles.themeBtn}
          onClick={toggleTheme}
          title={isDark ? 'Светлая тема' : 'Темная тема'}
        >
          {isDark ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>
    </header>
  );
};

export default Header;
