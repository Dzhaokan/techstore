import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  clearCart,
  selectCartCount,
  selectCartItems,
  selectCartTotal,
} from '../../features/cart/cartSlice';
import { formatPrice } from '../../utils/format';
import EmptyState from '../../components/EmptyState/EmptyState';
import Button from '../../components/Button/Button';
import CartItem from './CartItem';
import styles from './CartPage.module.scss';

function CartPage() {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectCartItems);
  const count = useAppSelector(selectCartCount);
  const total = useAppSelector(selectCartTotal);

  if (!items.length) {
    return (
      <EmptyState
        title="Корзина пуста"
        text="Добавьте что-нибудь из каталога"
        action={
          <Link to="/">
            <Button>Перейти в каталог</Button>
          </Link>
        }
      />
    );
  }

  const handleCheckout = () => {
    toast.success('Заказ оформлен!');
    dispatch(clearCart());
  };

  return (
    <div>
      <div className={styles.top}>
        <h1 className={styles.heading}>Корзина</h1>
        <Button variant="danger" size="sm" onClick={() => dispatch(clearCart())}>
          Очистить корзину
        </Button>
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
          <Button className={styles.checkout} onClick={handleCheckout}>
            Оформить заказ
          </Button>
        </aside>
      </div>
    </div>
  );
}

export default CartPage;
