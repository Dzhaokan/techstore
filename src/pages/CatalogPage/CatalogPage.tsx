import { useMemo, useState } from 'react';
import { useGetProductsQuery } from '../../features/products/productsApi';
import CatalogFilters from '../../components/CatalogFilters/CatalogFilters';
import ProductGrid from '../../components/ProductGrid/ProductGrid';
import EmptyState from '../../components/EmptyState/EmptyState';
import Button from '../../components/Button/Button';
import { useDebounce } from '../../hooks/useDebounce';
import { filterProducts, initialFilters, type Filters } from '../../utils/filterProducts';
import styles from './CatalogPage.module.scss';

function CatalogPage() {
  const { data: products, isLoading, isError, refetch } = useGetProductsQuery();

  const [filters, setFilters] = useState<Filters>(initialFilters);
  const debouncedSearch = useDebounce(filters.search);

  const categories = [...new Set(products?.map((p) => p.category))].sort();

  const visibleProducts = useMemo(
    () => filterProducts(products ?? [], { ...filters, search: debouncedSearch }),
    [products, filters, debouncedSearch],
  );

  const handleReset = () => setFilters(initialFilters);

  if (isError) {
    return (
      <EmptyState
        title="Не удалось загрузить товары"
        text="Проверьте подключение к интернету и попробуйте еще раз"
        action={<Button onClick={() => refetch()}>Повторить</Button>}
      />
    );
  }

  return (
    <div>
      <div className={styles.top}>
        <h1 className={styles.heading}>Каталог</h1>
        {products && (
          <span className={styles.count}>
            {visibleProducts.length} из {products.length}
          </span>
        )}
      </div>

      <CatalogFilters
        filters={filters}
        categories={categories}
        onChange={setFilters}
        onReset={handleReset}
      />

      {isLoading ? (
        <ProductGrid isLoading />
      ) : visibleProducts.length === 0 ? (
        <EmptyState
          title="Ничего не найдено"
          text="Попробуйте изменить запрос или сбросить фильтры"
          action={
            <Button variant="secondary" onClick={handleReset}>
              Сбросить фильтры
            </Button>
          }
        />
      ) : (
        <ProductGrid products={visibleProducts} />
      )}
    </div>
  );
}

export default CatalogPage;
