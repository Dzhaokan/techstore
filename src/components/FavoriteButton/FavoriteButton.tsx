import { Heart } from 'lucide-react';
import clsx from 'clsx';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectIsFavorite, toggleFavorite } from '../../features/favorites/favoritesSlice';
import styles from './FavoriteButton.module.scss';

function FavoriteButton({ productId, className }: { productId: number; className?: string }) {
  const dispatch = useAppDispatch();
  const isFavorite = useAppSelector(selectIsFavorite(productId));

  return (
    <button
      type="button"
      className={clsx(styles.button, isFavorite && styles.active, className)}
      onClick={() => dispatch(toggleFavorite(productId))}
      title={isFavorite ? 'Убрать из избранного' : 'Добавить в избранное'}
    >
      <Heart size={18} fill={isFavorite ? 'currentColor' : 'none'} />
    </button>
  );
}

export default FavoriteButton;
