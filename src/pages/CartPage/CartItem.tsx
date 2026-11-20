import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../app/hooks';
import { decreaseQuantity, increaseQuantity, removeFromCart } from '../../features/cart/cartSlice';
import type { CartItem as CartItemType } from '../../types/cart';
import { formatPrice } from '../../utils/format';
import styles from './CartItem.module.scss';

interface CartItemProps {
  item: CartItemType;
}

function CartItem({ item }: CartItemProps) {
  const dispatch = useAppDispatch();
  const { product, quantity } = item;

  return (
    <div className={styles.item}>
      <Link to={`/product/${product.id}`} className={styles.imageLink}>
        <img src={product.thumbnail} alt={product.title} className={styles.image} />
      </Link>

      <div className={styles.info}>
        <Link to={`/product/${product.id}`} className={styles.title}>
          {product.title}
        </Link>
        <span className={styles.price}>{formatPrice(product.price)}</span>
      </div>

      <div className={styles.quantity}>
        <button
          type="button"
          className={styles.qtyBtn}
          onClick={() => dispatch(decreaseQuantity(product.id))}
        >
          -
        </button>
        <span className={styles.qtyValue}>{quantity}</span>
        <button
          type="button"
          className={styles.qtyBtn}
          onClick={() => dispatch(increaseQuantity(product.id))}
        >
          +
        </button>
      </div>

      <div className={styles.total}>{formatPrice(product.price * quantity)}</div>

      <button
        type="button"
        className={styles.remove}
        onClick={() => dispatch(removeFromCart(product.id))}
      >
        ×
      </button>
    </div>
  );
}

export default CartItem;
