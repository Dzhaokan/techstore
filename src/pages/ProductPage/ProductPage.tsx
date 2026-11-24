import { useParams, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useGetProductsQuery } from '../../features/products/productsApi';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { addToCart, selectCartItemById } from '../../features/cart/cartSlice';
import { toggleFavorite, selectIsFavorite } from '../../features/favorites/favoritesSlice';
import { formatCategory, formatPrice } from '../../utils/format';
import Loader from '../../components/Loader/Loader';
import EmptyState from '../../components/EmptyState/EmptyState';
import Button from '../../components/Button/Button';
import styles from './ProductPage.module.scss';

function ProductPage() {
  const { id } = useParams();
  const productId = Number(id);

  const { data: products, isLoading, isError } = useGetProductsQuery();
  const product = products?.find((p) => p.id === productId);

  const dispatch = useAppDispatch();
  const cartItem = useAppSelector(selectCartItemById(productId));
  const isFavorite = useAppSelector(selectIsFavorite(productId));

  if (isLoading) return <Loader />;

  if (isError) {
    return <EmptyState title="Не удалось загрузить товар" text="Попробуйте обновить страницу" />;
  }

  if (!product) {
    return (
      <EmptyState
        title="Товар не найден"
        action={
          <Link to="/">
            <Button variant="secondary">В каталог</Button>
          </Link>
        }
      />
    );
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

          <div className={styles.actions}>
            <Button
              onClick={() => {
                dispatch(addToCart(product));
                toast.success('Добавлено в корзину');
              }}
            >
              {cartItem ? `В корзине (${cartItem.quantity}), добавить еще` : 'В корзину'}
            </Button>
            <Button variant="secondary" onClick={() => dispatch(toggleFavorite(product.id))}>
              {isFavorite ? '♥ В избранном' : '♡ В избранное'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
