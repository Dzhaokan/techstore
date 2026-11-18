import { useGetProductsQuery } from '../../features/products/productsApi';
import ProductCard from '../../components/ProductCard/ProductCard';
import Loader from '../../components/Loader/Loader';
import styles from './CatalogPage.module.scss';

function CatalogPage() {
  const { data: products, isLoading, isError } = useGetProductsQuery();

  if (isLoading) return <Loader />;
  if (isError) return <p>Не удалось загрузить товары</p>;

  return (
    <div>
      <h1 className={styles.heading}>Каталог</h1>
      <div className={styles.grid}>
        {products?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default CatalogPage;
