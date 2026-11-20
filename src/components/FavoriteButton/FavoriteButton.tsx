import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectIsFavorite, toggleFavorite } from '../../features/favorites/favoritesSlice';
import styles from './FavoriteButton.module.scss';

interface FavoriteButtonProps {
  productId: number;
  className?: string;
}

function FavoriteButton({ productId, className }: FavoriteButtonProps) {
  const dispatch = useAppDispatch();
  const isFavorite = useAppSelector(selectIsFavorite(productId));

  const label = isFavorite ? 'Убрать из избранного' : 'Добавить в избранное';
  const classes = [styles.button, isFavorite && styles.active, className].filter(Boolean).join(' ');

  return (
    <button
      type="button"
      className={classes}
      onClick={() => dispatch(toggleFavorite(productId))}
      aria-label={label}
      aria-pressed={isFavorite}
      title={label}
    >
      <svg
        viewBox="0 0 24 24"
        fill={isFavorite ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
    </button>
  );
}

export default FavoriteButton;
