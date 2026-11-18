import { useGetProductsQuery } from '../../features/products/productsApi';
import ProductCard from '../../components/ProductCard/ProductCard';
import Loader from '../../components/Loader/Loader';
import EmptyState from '../../components/EmptyState/EmptyState';
import styles from './CatalogPage.module.scss';

function CatalogPage() {
  const { data: products, isLoading, isError, refetch } = useGetProductsQuery();

  if (isLoading) return <Loader />;

  if (isError) {
    return (
      <EmptyState
        title="Не удалось загрузить товары"
        text="Проверьте подключение к интернету и попробуйте еще раз"
        action={
          <button className={styles.retry} onClick={() => refetch()}>
            Повторить
          </button>
        }
      />
    );
  }

  if (!products || products.length === 0) {
    return <EmptyState title="Товаров пока нет" />;
  }

  return (
    <div>
      <h1 className={styles.heading}>Каталог</h1>
      <div className={styles.grid}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default CatalogPage;
