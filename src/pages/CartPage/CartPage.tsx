import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  clearCart,
  selectCartCount,
  selectCartItems,
  selectCartTotal,
} from '../../features/cart/cartSlice';
import { formatPrice } from '../../utils/format';
import EmptyState from '../../components/EmptyState/EmptyState';
import CartItem from './CartItem';
import styles from './CartPage.module.scss';

function CartPage() {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectCartItems);
  const count = useAppSelector(selectCartCount);
  const total = useAppSelector(selectCartTotal);

  if (items.length === 0) {
    return (
      <EmptyState
        title="Корзина пуста"
        text="Добавьте что-нибудь из каталога"
        action={
          <Link to="/" className={styles.link}>
            Перейти в каталог
          </Link>
        }
      />
    );
  }

  const handleCheckout = () => {
    // оплаты по тз нет, просто имитируем
    alert('Заказ оформлен! (это демо, деньги не списались)');
    dispatch(clearCart());
  };

  return (
    <div>
      <div className={styles.top}>
        <h1 className={styles.heading}>Корзина</h1>
        <button type="button" className={styles.clearBtn} onClick={() => dispatch(clearCart())}>
          Очистить корзину
        </button>
      </div>

      <div className={styles.layout}>
        <div className={styles.list}>
          {items.map((item) => (
            <CartItem key={item.product.id} item={item} />
          ))}
        </div>

        <aside className={styles.summary}>
          <div className={styles.row}>
            <span>Товаров</span>
            <span>{count}</span>
          </div>
          <div className={styles.row}>
            <span>Итого</span>
            <span className={styles.totalPrice}>{formatPrice(total)}</span>
          </div>
          <button type="button" className={styles.checkout} onClick={handleCheckout}>
            Оформить заказ
          </button>
        </aside>
      </div>
    </div>
  );
}

export default CartPage;
