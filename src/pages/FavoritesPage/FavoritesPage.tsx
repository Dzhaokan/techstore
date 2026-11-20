import { Link } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import { selectFavoriteIds } from '../../features/favorites/favoritesSlice';
import { useGetProductsQuery } from '../../features/products/productsApi';
import ProductGrid from '../../components/ProductGrid/ProductGrid';
import Loader from '../../components/Loader/Loader';
import EmptyState from '../../components/EmptyState/EmptyState';
import Button from '../../components/Button/Button';
import styles from './FavoritesPage.module.scss';

function FavoritesPage() {
  const favoriteIds = useAppSelector(selectFavoriteIds);
  const { data: products, isLoading, isError } = useGetProductsQuery();

  if (favoriteIds.length === 0) {
    return (
      <EmptyState
        title="В избранном пока ничего нет"
        text="Нажмите на сердечко у товара, чтобы сохранить его сюда"
        action={
          <Link to="/">
            <Button>Перейти в каталог</Button>
          </Link>
        }
      />
    );
  }

  if (isLoading) return <Loader />;

  if (isError) {
    return <EmptyState title="Не удалось загрузить товары" text="Попробуйте обновить страницу" />;
  }

  const favorites = products?.filter((p) => favoriteIds.includes(p.id)) ?? [];

  return (
    <div>
      <h1 className={styles.heading}>Избранное</h1>
      <ProductGrid products={favorites} />
    </div>
  );
}

export default FavoritesPage;
