import { Link } from 'react-router-dom';
import type { Product } from '../../types/product';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { addToCart, selectCartItemById } from '../../features/cart/cartSlice';
import { formatCategory, formatPrice } from '../../utils/format';
import Button from '../Button/Button';
import FavoriteButton from '../FavoriteButton/FavoriteButton';
import styles from './ProductCard.module.scss';

type Props = {
  product: Product;
};

function ProductCard({ product }: Props) {
  const dispatch = useAppDispatch();
  const cartItem = useAppSelector(selectCartItemById(product.id));

  const link = `/product/${product.id}`;

  return (
    <article className={styles.card}>
      <FavoriteButton productId={product.id} className={styles.favorite} />

      <Link to={link} className={styles.imageLink}>
        <img src={product.thumbnail} alt={product.title} className={styles.image} loading="lazy" />
      </Link>

      <div className={styles.body}>
        <span className={styles.category}>{formatCategory(product.category)}</span>
        <h3 className={styles.title}>
          <Link to={link}>{product.title}</Link>
        </h3>

        <div className={styles.bottom}>
          <span className={styles.price}>{formatPrice(product.price)}</span>
          <span className={styles.rating}>★ {product.rating.toFixed(1)}</span>
        </div>

        <Button size="sm" className={styles.addBtn} onClick={() => dispatch(addToCart(product))}>
          {cartItem ? `В корзине (${cartItem.quantity})` : 'В корзину'}
        </Button>
      </div>
    </article>
  );
}

export default ProductCard;
