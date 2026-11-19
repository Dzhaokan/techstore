import { Link, useParams } from 'react-router-dom';
import { useGetProductByIdQuery } from '../../features/products/productsApi';
import { formatCategory, formatPrice } from '../../utils/format';
import Loader from '../../components/Loader/Loader';
import EmptyState from '../../components/EmptyState/EmptyState';
import styles from './ProductPage.module.scss';

function ProductPage() {
  const { id } = useParams();
  const productId = Number(id);

  const {
    data: product,
    isLoading,
    isError,
    error,
  } = useGetProductByIdQuery(productId, {
    skip: Number.isNaN(productId),
  });

  if (isLoading) return <Loader />;

  const notFound =
    Number.isNaN(productId) || (isError && error && 'status' in error && error.status === 404);

  if (notFound) {
    return (
      <EmptyState
        title="Товар не найден"
        text="Возможно, он был удален или ссылка неверная"
        action={
          <Link to="/" className={styles.backBtn}>
            В каталог
          </Link>
        }
      />
    );
  }

  if (isError || !product) {
    return <EmptyState title="Не удалось загрузить товар" text="Попробуйте обновить страницу" />;
  }

  return (
    <div>
      <Link to="/" className={styles.back}>
        ← Назад в каталог
      </Link>

      <div className={styles.product}>
        <div className={styles.imageBox}>
          <img src={product.thumbnail} alt={product.title} className={styles.image} />
        </div>

        <div className={styles.info}>
          <span className={styles.category}>{formatCategory(product.category)}</span>
          <h1 className={styles.title}>{product.title}</h1>
          <div className={styles.rating}>★ {product.rating.toFixed(1)}</div>
          <p className={styles.description}>{product.description}</p>
          <div className={styles.price}>{formatPrice(product.price)}</div>
          {/* TODO: кнопки "в корзину" и "в избранное", когда будут слайсы */}
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
