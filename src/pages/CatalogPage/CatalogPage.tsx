import { useMemo, useState } from 'react';
import { useGetProductsQuery } from '../../features/products/productsApi';
import CatalogFilters from '../../components/CatalogFilters/CatalogFilters';
import ProductCard from '../../components/ProductCard/ProductCard';
import Loader from '../../components/Loader/Loader';
import EmptyState from '../../components/EmptyState/EmptyState';
import { filterProducts, initialFilters, type Filters } from '../../utils/filterProducts';
import styles from './CatalogPage.module.scss';

function CatalogPage() {
  const { data: products, isLoading, isError, refetch } = useGetProductsQuery();

  const [filters, setFilters] = useState<Filters>(initialFilters);

  const categories = [...new Set(products?.map((p) => p.category))].sort();

  const visibleProducts = useMemo(
    () => filterProducts(products ?? [], filters),
    [products, filters],
  );

  const handleReset = () => setFilters(initialFilters);

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

  return (
    <div>
      <h1 className={styles.heading}>Каталог</h1>

      <CatalogFilters
        filters={filters}
        categories={categories}
        onChange={setFilters}
        onReset={handleReset}
      />

      {visibleProducts.length === 0 ? (
        <EmptyState
          title="Ничего не найдено"
          text="Попробуйте изменить запрос или сбросить фильтры"
          action={
            <button className={styles.retry} onClick={handleReset}>
              Сбросить фильтры
            </button>
          }
        />
      ) : (
        <div className={styles.grid}>
          {visibleProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

export default CatalogPage;
