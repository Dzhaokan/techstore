import { Link } from 'react-router-dom';
import type { Product } from '../../types/product';
import { formatCategory, formatPrice } from '../../utils/format';
import styles from './ProductCard.module.scss';

type Props = {
  product: Product;
};

function ProductCard({ product }: Props) {
  return (
    <Link to={`/product/${product.id}`} className={styles.card}>
      <img src={product.thumbnail} alt={product.title} className={styles.image} />
      <div className={styles.body}>
        <span className={styles.category}>{formatCategory(product.category)}</span>
        <h3 className={styles.title}>{product.title}</h3>
        <div className={styles.bottom}>
          <span className={styles.price}>{formatPrice(product.price)}</span>
          <span className={styles.rating}>★ {product.rating.toFixed(1)}</span>
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;
